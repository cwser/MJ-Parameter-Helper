    // --- 参数管理器 (PARAM MANAGER) ---
    const ParamManager = {
        getDefaultParams: () => ({
            prompt: '', ar: '1:1', stylize: 100, weird: 0, chaos: 0, mode: 'standard',
            version: 'v7', speed: 'relax', draft: false, noPrompt: '',
            iw: 1, sw: 100, cw: 100, ow: 100, tile: false, seed: '',
            quality: 1, stop: 100, visibility: '', personalParams: '', r: 1,
            exp: 0,
            includeImagine: false,
            cref: [], sref: [], oref: [], directImages: [],
        }),
        init: () => {
            appState.params = ParamManager.getDefaultParams();
        },
        reset: () => {
            ParamManager.init();
            UIManager.updateAllUIElements();
            ParamManager.generateAndDisplayPrompt();
            Utils.showToast('所有参数已重置为默认值');
        },
        update: (key, value) => {
            appState.params[key] = value;
            ParamManager.generateAndDisplayPrompt();
        },
        updateRefCollection: (paramKey, collection) => {
            appState.params[paramKey] = collection;
            ParamManager.generateAndDisplayPrompt();
        },
        addRefItem: (paramKey, urlValue, weightValue = '') => {
            let itemUrl = urlValue.trim();
            let itemWeight = weightValue.trim();

            if (paramKey === 'directImages' && itemWeight !== '' && !/^\d*\.?\d*$/.test(itemWeight)) {
                Utils.showToast('图片独立权重必须是数字 (例如 0.5, 1, 2) 或留空'); return;
            }

            const isSrefCode = paramKey === 'sref' && (/^\d+$/.test(itemUrl) || itemUrl.toLowerCase() === 'random');

            // --- MODIFICATION START for URL validation ---
            // New validation logic:
            // 1. If it's a specific sref code, itemUrl must have a value to match the regex, so it passes this check.
            // 2. If it's not a specific sref code, it must be a regular URL.
            //    a. First, check if itemUrl is empty.
            //    b. Then, check if it starts with http:// or https://.
            if (isSrefCode) {
                // If it's a valid sref code (e.g., 'random' or a number), allow it.
                // itemUrl is necessarily not empty at this point.
            } else {
                // Not an sref code, validate as a regular URL
                if (!itemUrl) { // Check if URL is empty
                    Utils.showToast('请输入URL');
                    return;
                }
                if (!itemUrl.toLowerCase().startsWith('http://') && !itemUrl.toLowerCase().startsWith('https://')) {
                    Utils.showToast('URL必须以 http:// 或 https:// 开头');
                    return;
                }
            }
            // --- MODIFICATION END for URL validation ---

            const targetArray = appState.params[paramKey];
            if (!Array.isArray(targetArray)) return;

            // For sref codes, convert 'random' to lowercase for comparison and storage, other URLs remain as is.
            const checkUrl = (paramKey === 'sref' && isSrefCode && itemUrl.toLowerCase() === 'random') ? 'random' : itemUrl;

            if (!targetArray.some(item => item.url === checkUrl && item.weight === itemWeight)) {
                const newItem = { url: checkUrl, weight: itemWeight, enabled: true };
                targetArray.push(newItem); // Add to the end by default
                UIManager.addRefPreviewItem(paramKey, newItem);

                const container = Utils.qs(`#${paramKey}-preview`, UIManager.panelElement);
                if (container) {
                    container.classList.add('mj-ref-has-items');
                }

                ParamManager.generateAndDisplayPrompt();
                Utils.showToast(`已添加 ${CONFIG.REF_TYPE_DISPLAY_NAMES[paramKey] || paramKey}`);
            } else {
                Utils.showToast(`该${CONFIG.REF_TYPE_DISPLAY_NAMES[paramKey] || paramKey}已添加`);
            }
        },
        generatePromptString: () => {
            const p = appState.params;

            const directImageUrlsArr = p.directImages.filter(item => item.enabled).map(item => Utils.formatImageWithWeight(item.url, item.weight));
            let directImageSection = directImageUrlsArr.join(' ');

            const enabledCrefs = p.cref.filter(item => item.enabled);
            let crefSection = '';
            if (enabledCrefs.length > 0) {
                crefSection = `--cref ${enabledCrefs.map(item => Utils.formatImageWithWeight(item.url, item.weight)).join(' ')}`;
                if (p.cw !== 100) crefSection += ` --cw ${p.cw}`;
            }

            const enabledSrefs = p.sref.filter(item => item.enabled);
            let srefSection = '';
            if (enabledSrefs.length > 0) {
                srefSection = `--sref ${enabledSrefs.map(item => Utils.formatImageWithWeight(item.url, item.weight)).join(' ')}`;
                if (p.sw !== 100) srefSection += ` --sw ${p.sw}`;
            }

            const enabledOrefs = p.oref.filter(item => item.enabled);
            let orefSection = '';
            if (enabledOrefs.length > 0) {
                orefSection = `--oref ${enabledOrefs.map(item => Utils.formatImageWithWeight(item.url, item.weight)).join(' ')}`;
                if (p.ow !== 100) {
                    orefSection += ` --ow ${p.ow}`;
                }
            }

            const otherParts = [
                p.ar ? `--ar ${p.ar}` : '',
                (p.stylize !== undefined ? `--s ${p.stylize}` : ''),
                p.weird !== 0 ? `--w ${p.weird}` : '',
                p.chaos !== 0 ? `--c ${p.chaos}` : '',
                p.exp !== 0 ? `--exp ${p.exp}` : '',
                p.mode !== 'standard' ? `--${p.mode}` : '',
                p.draft ? '--draft' : '',
                p.noPrompt ? `--no ${p.noPrompt}` : '',
                p.version.startsWith('niji') ? `--niji ${p.version.replace('niji', '')}` : `--v ${p.version.replace('v', '')}`,
                p.speed ? `--${p.speed}` : '',
                p.tile ? '--tile' : '',
                p.seed ? `--seed ${p.seed}` : '',
                p.quality !== 1 ? `--q ${p.quality}` : '',
                p.stop !== 100 ? `--stop ${p.stop}` : '',
                p.visibility ? `--${p.visibility}` : '',
                p.personalParams ? `--p ${p.personalParams}` : '',
                p.r > 1 ? `--r ${p.r}` : ''
            ].filter(Boolean);

            const mainPromptPart = p.prompt.trim();
            const iwPart = (p.iw !== 1 && typeof p.iw !== 'undefined' && directImageUrlsArr.length > 0) ? `--iw ${p.iw}` : '';

            let finalPromptString = [directImageSection, mainPromptPart, iwPart, crefSection, srefSection, orefSection, ...otherParts]
                .filter(Boolean).join(' ').trim().replace(/\s+/g, ' ');

            if (p.includeImagine && finalPromptString) {
                finalPromptString = `/imagine prompt: ${finalPromptString}`;
            }
            return finalPromptString;
        },
        generateAndDisplayPrompt: () => {
            const promptStr = ParamManager.generatePromptString();
            UIManager.updateGeneratedPromptDisplay(promptStr);
        },
        parseCommand: (command) => {
            if (!command) {
                Utils.showToast("请输入Midjourney指令进行解析");
                return;
            }
            const newParams = JSON.parse(JSON.stringify(ParamManager.getDefaultParams()));
            let remainingCommand = command.replace(/^\/(imagine|i)\s*(prompt:)?\s*/i, '').trim();

            const extractParamWithValue = (regex, processor, isFlag = false) => {
                const match = remainingCommand.match(regex);
                if (match) {
                    if (isFlag) processor(true, newParams);
                    else processor(match, newParams);
                    remainingCommand = remainingCommand.replace(regex, '').trim();
                    return true;
                } else if (isFlag) processor(false, newParams);
                return false;
            };

            extractParamWithValue(/--iw\s+(\d*\.?\d+)/i, (m, p) => p.iw = parseFloat(m[1]));
            extractParamWithValue(/--sw\s+(\d+)/i, (m, p) => p.sw = Math.min(parseInt(m[1], 10), 1000));
            extractParamWithValue(/--cw\s+(\d+)/i, (m, p) => p.cw = parseInt(m[1], 10));
            extractParamWithValue(/--ow\s+(\d+)/i, (m, p) => p.ow = parseInt(m[1], 10));

            extractParamWithValue(/--ar\s+([\d:]+)/i, (m, p) => p.ar = m[1]);
            extractParamWithValue(/--(v|version)\s+([a-zA-Z0-9.]+)/i, (m, p) => p.version = 'v' + m[2].replace(/^v/i, ''));
            extractParamWithValue(/--niji\s+([a-zA-Z0-9.]+)/i, (m, p) => p.version = 'niji' + m[1].replace(/^niji/i, ''));
            extractParamWithValue(/--s\s+(\d+)/i, (m, p) => p.stylize = parseInt(m[1], 10));
            extractParamWithValue(/--w\s+(\d+)/i, (m, p) => p.weird = parseInt(m[1], 10));
            extractParamWithValue(/--c\s+(\d+)/i, (m, p) => p.chaos = parseInt(m[1], 10));
            extractParamWithValue(/--exp\s+(\d+)/i, (m, p) => p.exp = parseInt(m[1], 10));
            extractParamWithValue(/--q\s+(\d*\.?\d+)/i, (m, p) => {
                const val = parseFloat(m[1]); if (CONFIG.QUALITY_MAP.includes(val)) p.quality = val;
            });
            extractParamWithValue(/--seed\s+(\d+)/i, (m, p) => p.seed = m[1]);
            extractParamWithValue(/--stop\s+(\d+)/i, (m, p) => p.stop = parseInt(m[1], 10));
            extractParamWithValue(/--p\s+((?:[^\s"-][^\s-]*|[^\s-]*[^\s"-])[^\s-]*(?:\s+(?:[^\s"-][^\s-]*|[^\s-]*[^\s"-])[^\s-]*)*)/i, (m, p) => p.personalParams = m[1].trim());
            extractParamWithValue(/--r\s+(\d+)/i, (m, p) => p.r = parseInt(m[1], 10));

            const noMatch = remainingCommand.match(/--no\s+((?:(?!--(?:ar|v|version|s|w|c|q|seed|stop|tile|draft|iw|sw|cw|ow|cref|sref|oref|p|r|niji|fast|turbo|relax|raw|public|stealth|exp)\b)[\s\S])+)/i);
            if (noMatch) {
                newParams.noPrompt = noMatch[1].trim();
                remainingCommand = remainingCommand.replace(noMatch[0], '').trim();
            }

            extractParamWithValue(/--tile\b/i, (val, p) => p.tile = val, true);
            extractParamWithValue(/--draft\b/i, (val, p) => p.draft = val, true);

            if (extractParamWithValue(/--raw\b/i, (val, p) => { if(val) p.mode = 'raw'; }, true)) {} else { newParams.mode = 'standard'; }
            if (extractParamWithValue(/--fast\b/i, (val, p) => { if(val) p.speed = 'fast';}, true)) {}
            else if (extractParamWithValue(/--turbo\b/i, (val, p) => {if(val) p.speed = 'turbo';}, true)) {}
            else if (extractParamWithValue(/--relax\b/i, (val, p) => {if(val) p.speed = 'relax';}, true)) {}
            else { newParams.speed = 'relax'; }

            if (extractParamWithValue(/--public\b/i, (val, p) => {if(val) p.visibility = 'public';}, true)) {}
            else if (extractParamWithValue(/--stealth\b/i, (val, p) => {if(val) p.visibility = 'stealth';}, true)) {}
            else { newParams.visibility = '';}

            const crefMatch = remainingCommand.match(/--cref\s+((?:(?!--(?:cw|sw|ow|ar|v|version|s|w|c|q|seed|stop|tile|draft|iw|p|r|niji|fast|turbo|relax|raw|public|stealth|no|sref|oref|exp)\b)[\s\S])+)/i);
            if (crefMatch) {
                newParams.cref = Utils.parseRefUrlsWithWeights(crefMatch[1].trim());
                remainingCommand = remainingCommand.replace(crefMatch[0], '').trim();
            }
            const srefMatch = remainingCommand.match(/--sref\s+((?:(?!--(?:cw|sw|ow|ar|v|version|s|w|c|q|seed|stop|tile|draft|iw|p|r|niji|fast|turbo|relax|raw|public|stealth|no|cref|oref|exp)\b)[\s\S])+)/i);
            if (srefMatch) {
                newParams.sref = Utils.parseRefUrlsWithWeights(srefMatch[1].trim());
                remainingCommand = remainingCommand.replace(srefMatch[0], '').trim();
            }
            const orefMatch = remainingCommand.match(/--oref\s+((?:(?!--(?:cw|sw|ow|ar|v|version|s|w|c|q|seed|stop|tile|draft|iw|p|r|niji|fast|turbo|relax|raw|public|stealth|no|cref|sref|exp)\b)[\s\S])+)/i);
            if (orefMatch) {
                newParams.oref = Utils.parseRefUrlsWithWeights(orefMatch[1].trim());
                remainingCommand = remainingCommand.replace(orefMatch[0], '').trim();
            }

            remainingCommand = remainingCommand.replace(/\s+/g, ' ').trim();
            const promptParts = remainingCommand.split(' ');
            newParams.directImages = [];
            let currentPromptPartIndex = 0;
            while(currentPromptPartIndex < promptParts.length) {
                const currentPartString = promptParts[currentPromptPartIndex];
                let imageUrl = '', imageWeight = '', partsConsumed = 0;
                if (currentPartString.toLowerCase().startsWith('http://') || currentPartString.toLowerCase().startsWith('https://')) {
                    if (currentPartString.includes('::')) {
                        const splitToken = currentPartString.split('::');
                        if ((splitToken[0].toLowerCase().startsWith('http://') || splitToken[0].toLowerCase().startsWith('https://')) && splitToken.length === 2 && (/^\d*\.?\d*$/.test(splitToken[1]) || splitToken[1] === '')) {
                            imageUrl = splitToken[0]; imageWeight = splitToken[1].trim(); partsConsumed = 1;
                        } else { imageUrl = currentPartString; partsConsumed = 1; }
                    } else if (currentPromptPartIndex + 1 < promptParts.length && promptParts[currentPromptPartIndex + 1].startsWith('::')) {
                        const combinedWeightPart = promptParts[currentPromptPartIndex + 1].substring(2);
                        if (/^\d*\.?\d*$/.test(combinedWeightPart) || combinedWeightPart === '') {
                            imageUrl = currentPartString; imageWeight = combinedWeightPart.trim(); partsConsumed = 2;
                        } else { imageUrl = currentPartString; partsConsumed = 1; }
                    } else if (currentPromptPartIndex + 2 < promptParts.length && promptParts[currentPromptPartIndex + 1] === '::' && (/^\d*\.?\d*$/.test(promptParts[currentPromptPartIndex + 2]) || promptParts[currentPromptPartIndex + 2] === '')) {
                        imageUrl = currentPartString; imageWeight = promptParts[currentPromptPartIndex + 2].trim(); partsConsumed = 3;
                    } else { imageUrl = currentPartString; partsConsumed = 1; }

                    if (imageUrl && partsConsumed > 0) {
                        newParams.directImages.push({ url: imageUrl, weight: imageWeight, enabled: true });
                        currentPromptPartIndex += partsConsumed;
                    } else break;
                } else break;
            }
            newParams.prompt = promptParts.slice(currentPromptPartIndex).join(' ').trim();

            Object.assign(appState.params, newParams);
            UIManager.updateAllUIElements();
            ParamManager.generateAndDisplayPrompt();
            Utils.showToast("指令解析完成并已填充参数！");
        },
    };
