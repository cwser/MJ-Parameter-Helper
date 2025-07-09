(function() {
    'use strict';

    // --- 配置 (CONFIG) ---
    const CONFIG = {
        STORAGE_KEYS: {
            THEME: 'mjPanelThemePreference_v3',
            PRESETS: 'mjPanelPresets_v1',
            HISTORY: 'mjPanelHistory_v1',
        },
        MAX_HISTORY_ITEMS: 20,
        DEFAULT_THEME: 'discord',
        THEME_MODES: ['light', 'dark', 'discord', 'system'],
        THEME_TEXT_MAP: { 'light': '浅色模式', 'dark': '深色模式', 'discord': '跟随Discord', 'system': '跟随系统' },
        ICONS: {
            sun: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 12zm-6.39.261a.5.5 0 0 1 .707.707L3.732 11.26a.5.5 0 0 1-.707-.707L1.61 11.968zM12 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zM4.732 4.739a.5.5 0 0 1-.707-.707L5.439 2.61a.5.5 0 1 1 .707.707L4.732 4.739zM2.61 5.439a.5.5 0 0 1 .707.707L1.61 7.854a.5.5 0 1 1-.707-.707L2.61 5.439zM12 4a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zM4.032 1.61a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 1 1-.707.707L4.032 1.61zM11.26 1.61a.5.5 0 0 1 .707.707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0z"/></svg>`,
            moon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>`,
            discord: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.488c-1.54-.83-3.263-1.463-5.086-1.854a.934.934 0 00-1.003.693c-.21 1.207-.662 2.343-1.204 3.392-2.816-.087-4.804-1.53-4.804-1.53s-.103.2-.186.377C7.659 7.992 7.136 9.31 7.136 9.31s-1.482-.532-2.884-1.318c0 0-1.19 3.204 2.42 6.03 0 0-1.806 1.27-3.68 1.744a17.56 17.56 0 003.032 1.22c1.45.463 2.938.717 4.465.717 1.526 0 3.016-.254 4.465-.717.046-.016.09-.03.135-.046l.004-.002c.03-.01.06-.018.09-.027.08-.026.157-.05.237-.078.068-.025.136-.05.203-.076.085-.034.17-.066.253-.1.07-.03.14-.06.208-.09.087-.04.173-.078.26-.118.062-.03.124-.06.185-.09.09-.046.18-.09.268-.14.06-.034.12-.07.178-.1.092-.05.183-.1.273-.156.053-.033.106-.065.158-.1.088-.055.175-.11.26-.17.046-.03.092-.06.137-.093.082-.06.163-.12.242-.185.04-.03.08-.06.118-.09.075-.062.148-.124.22-.188.035-.03.068-.06.103-.09.067-.06.132-.12.196-.183.026-.025.05-.05.076-.075.168-.16.33-.322.488-.488.093-.1.184-.2.27-.3.027-.03.053-.06.078-.09.13-.15.255-.3.375-.456.023-.03.046-.06.067-.09.102-.14.2-.28.293-.42.018-.028.036-.055.052-.083.078-.13.15-.26.218-.39.01-.02.02-.04.03-.06.06-.11.112-.22.162-.33.005-.01.01-.02.015-.03.044-.1.082-.19.118-.29.002-.006.004-.01.005-.016.03-.08.056-.16.08-.24.022-.07.04-.14.056-.21.015-.06.027-.12.038-.18.01-.05.018-.09.025-.14.006-.04.01-.08.014-.12.003-.03.005-.06.006-.09.002-.04.002-.07 0-.11s0-.03-.002-.045c-.06-1.597-.27-3.143-.62-4.618zm-4.603 7.06c-1.232 0-2.232-1.022-2.232-2.282s.998-2.282 2.232-2.282c1.232 0 2.232 1.022 2.232 2.282s-1.002 2.282-2.232-2.282zm-5.94-2.282c0 1.26.998 2.282 2.232 2.282s2.232-1.022 2.232-2.282S10.94 7.026 9.707 7.026c-1.232 0-2.232 1.022-2.232 2.282z"/></svg>`,
            system: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5zm-.5 7.5A.5.5 0 0 1 4 11V5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5-.5H4.5z"/><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zM1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9z"/></svg>`,
            upload: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/></svg>`,
            edit: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>`,
            info_question: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/></svg>`,
            arrow_down: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M7.247 11.14 4.047 7.14a.5.5 0 0 1 .353-.853h7.198a.5.5 0 0 1 .353.853l-4.001 4a.5.5 0 0 1-.707 0z"/></svg>`
        },
        VERSIONS: [
            { value: "v7", text: "v7" }, { value: "v6.1", text: "v6.1" }, { value: "v6", text: "v6" },
            { value: "v5.2", text: "v5.2" }, { value: "v5.1", text: "v5.1" }, { value: "v5", text: "v5" },
            { value: "v4", text: "v4" }, { value: "v3", text: "v3" }, { value: "v2", text: "v2" },
            { value: "v1", text: "v1" }, { value: "niji6", text: "Niji 6" }, { value: "niji5", text: "Niji 5" },
            { value: "niji4", text: "Niji 4" }
        ],
        AR_SIZE_MAP: ['1:2', '9:16', '2:3', '3:4', '5:6', '1:1', '6:5', '4:3', '3:2', '16:9', '2:1'],
        AR_PRESETS: { '1:2':{w:50,h:100}, '9:16':{w:56.25,h:100}, '2:3':{w:66.67,h:100}, '3:4':{w:75,h:100}, '5:6':{w:83.33,h:100}, '1:1':{w:100,h:100}, '6:5':{w:100,h:83.33}, '4:3':{w:100,h:75}, '3:2':{w:100,h:66.67}, '16:9':{w:100,h:56.25}, '2:1':{w:100,h:50} },
        QUALITY_MAP: [0.25, 0.5, 1, 2, 4],
        REF_TYPE_DISPLAY_NAMES: { 'directImages': '图片提示', 'cref': '角色参考', 'sref': '风格参考', 'oref': '全方位参考' },
    };

    CONFIG.THEME_ICONS = {
        'light': CONFIG.ICONS.sun, 'dark': CONFIG.ICONS.moon,
        'discord': CONFIG.ICONS.discord, 'system': CONFIG.ICONS.system
    };

    // --- 应用状态 (APP STATE) ---
    let appState = {
        params: {},
        currentTheme: CONFIG.DEFAULT_THEME,
        systemThemeMediaQuery: null,
        discordThemeObserver: null,
        isPanelVisible: false,
    };

    // --- 工具函数 (UTILS) ---
    const Utils = {
        qs: (selector, parent = document) => parent.querySelector(selector),
        qsa: (selector, parent = document) => parent.querySelectorAll(selector),
        showToast: (message) => {
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.className = 'mj-toast';
            document.body.appendChild(toast);
            setTimeout(() => { toast.classList.add('show'); }, 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => { if (document.body.contains(toast)) document.body.removeChild(toast); }, 300);
            }, 2500);
        },
        formatImageWithWeight: (url, weightValue) => {
            const weightStr = (typeof weightValue === 'string' || typeof weightValue === 'number') ? String(weightValue).trim() : '';
            if (weightStr === '') return url;
            return `${url}::${weightStr}`;
        },
        parseRefUrlsWithWeights: (valueString) => { // 此函数保持宽松的URL判断
            const items = [];
            const normalizedValueString = valueString.replace(/\s*::\s*/g, '::');
            const tokens = normalizedValueString.split(/\s+/).filter(t => t.trim() !== '');
            tokens.forEach(token => {
                const parts = token.split('::');
                const urlOrCode = parts[0].trim();
                let weight = (parts.length > 1 && parts[1].trim() !== '') ? parts[1].trim() : '';
                if (urlOrCode) {
                    const isSrefSpecific = (urlOrCode.toLowerCase() === 'random' || /^\d+$/.test(urlOrCode));
                    // 宽松判断：只要是sref代码，或者看起来像URL (以http(s)://开头或包含.)
                    const looksLikeUrl = urlOrCode.match(/^https?:\/\//i) || urlOrCode.includes('.');
                    if (isSrefSpecific || looksLikeUrl) {
                        items.push({ url: urlOrCode, weight: weight, enabled: true });
                    }
                }
            });
            return items;
        },
    };

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

    // --- 主题管理器 (THEME MANAGER) ---
    const ThemeManager = {
        init: () => {
            const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
            appState.currentTheme = (savedTheme && CONFIG.THEME_MODES.includes(savedTheme)) ? savedTheme : CONFIG.DEFAULT_THEME;
            ThemeManager.apply();
        },
        getEffectiveDarkModeState: () => {
            switch (appState.currentTheme) {
                case 'light': return false;
                case 'dark': return true;
                case 'discord': return document.documentElement.classList.contains('theme-dark');
                case 'system': return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                default: return document.documentElement.classList.contains('theme-dark');
            }
        },
        apply: () => {
            const panel = UIManager.panelElement;
            if (!panel) return;

            const effectiveDarkMode = ThemeManager.getEffectiveDarkModeState();
            panel.classList.toggle('dark-mode', effectiveDarkMode);

            localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, appState.currentTheme);

            const themeTriggerIcon = Utils.qs('#theme-trigger-icon', panel);
            const themeTriggerText = Utils.qs('#theme-trigger-text', panel);
            if (themeTriggerIcon) {
                let iconToShow = CONFIG.THEME_ICONS[appState.currentTheme] || CONFIG.ICONS.sun;
                if (appState.currentTheme === 'discord' || appState.currentTheme === 'system') {
                    iconToShow = effectiveDarkMode ? CONFIG.ICONS.moon : CONFIG.ICONS.sun;
                }
                themeTriggerIcon.innerHTML = iconToShow;
            }
            if (themeTriggerText) themeTriggerText.textContent = CONFIG.THEME_TEXT_MAP[appState.currentTheme] || '未知主题';

            const themeOptionsMenu = Utils.qs('#theme-options-menu', panel);
            if (themeOptionsMenu) {
                Utils.qsa('.theme-option-button', themeOptionsMenu).forEach(opt => {
                    opt.classList.toggle('active', opt.dataset.theme === appState.currentTheme);
                });
            }
            ThemeManager.setupDynamicListeners();
        },
        change: (newTheme) => {
            appState.currentTheme = newTheme;
            ThemeManager.apply();
            const menu = Utils.qs('#theme-options-menu', UIManager.panelElement);
            if (menu) menu.style.display = 'none';
        },
        handleSystemThemeChange: () => { if (appState.currentTheme === 'system') ThemeManager.apply(); },
        handleDiscordThemeChange: (mutationsList) => {
            if (appState.currentTheme === 'discord') {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        ThemeManager.apply(); break;
                    }
                }
            }
        },
        setupDynamicListeners: () => {
            if (appState.systemThemeMediaQuery) {
                appState.systemThemeMediaQuery.removeEventListener ? appState.systemThemeMediaQuery.removeEventListener('change', ThemeManager.handleSystemThemeChange) : appState.systemThemeMediaQuery.removeListener(ThemeManager.handleSystemThemeChange);
                appState.systemThemeMediaQuery = null;
            }
            if (appState.discordThemeObserver) {
                appState.discordThemeObserver.disconnect();
                appState.discordThemeObserver = null;
            }

            if (appState.currentTheme === 'system' && window.matchMedia) {
                appState.systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                appState.systemThemeMediaQuery.addEventListener ? appState.systemThemeMediaQuery.addEventListener('change', ThemeManager.handleSystemThemeChange) : appState.systemThemeMediaQuery.addListener(ThemeManager.handleSystemThemeChange);
            } else if (appState.currentTheme === 'discord' && typeof MutationObserver !== "undefined") {
                appState.discordThemeObserver = new MutationObserver(ThemeManager.handleDiscordThemeChange);
                appState.discordThemeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
            }
        }
    };

    // --- 工具提示内容定义 (TOOLTIP DEFINITIONS FOR ICONS) ---
    const TOOLTIP_ICON_TARGETS = [
        { attachToSelector: 'label[for="main-prompt"]', tooltipKey: 'mainPrompt',
            zh: "主要提示词：描述你想要生成的图像内容、风格、构图等。例如：'a cat wearing a hat' (一只戴帽子的猫)。" },
        { attachToSelector: 'label[for="no-prompt"]', tooltipKey: 'noPrompt',
            zh: "排除词 (--no)：指定不希望出现在图像中的元素。例如输入 'trees' (树木)，最终指令会包含 '--no trees'。" },
        { attachToSelector: '.form-group.span-2#ar-section > label', tooltipKey: 'aspectRatio',
            zh: "图片尺寸 (--ar)：设置图像的宽高比。例如 16:9 (宽屏), 1:1 (方形), 2:3 (竖向)。不同模型版本支持的宽高比范围可能不同。" },
        { attachToSelector: 'label[for="stylize"]', tooltipKey: 'stylize',
            zh: "风格化 (--s)：影响Midjourney默认美学风格的应用强度。范围0-1000，默认100。值越高图像越具艺术性，但可能偏离提示词。" },
        { attachToSelector: 'label[for="chaos"]', tooltipKey: 'chaos',
            zh: "多样性 (--c)：控制生成结果的随机性和差异性。范围0-100，默认0。值越高，结果越出乎意料、更多样。" },
        { attachToSelector: 'label[for="weird"]', tooltipKey: 'weird',
            zh: "奇特化 (--w)：探索非主流、古怪的美学风格，使图像更奇特。范围0-3000，默认0。" },
        { attachToSelector: 'label[for="exp-slider"]', tooltipKey: 'experimental',
            zh: "探索性 (--exp)：用于启用或调整某些模型版本的实验性功能。范围0-100，默认0。具体效果依模型版本而定。" },
        { attachToSelector: 'label[for="version-dropdown-trigger"]', tooltipKey: 'version',
            zh: "版本 (--v, --niji)：选择Midjourney模型 (如v7, v6) 或Niji模型 (动漫风格)。不同版本有不同特性和风格。" },
        { attachToSelector: 'div[data-type="directImages"] .ref-module-header h4', tooltipKey: 'directImagesRef',
            zh: "图片提示 (Image Prompts)：直接在主要提示词区域粘贴图片URL。--iw 参数 (范围0-3, V6默认1) 调整图片提示相对于文本提示的权重。点击预览图可放大。" },
        { attachToSelector: 'div[data-type="cref"] .ref-module-header h4', tooltipKey: 'crefRef',
            zh: "角色参考 (--cref URL --cw N)：使用图片URL生成相似角色。--cw (0-100, 默认100) 调整参考强度。0仅关注面部，100关注面部、头发和衣服。点击预览图可放大。" },
        { attachToSelector: 'div[data-type="sref"] .ref-module-header h4', tooltipKey: 'srefRef',
            zh: "风格参考 (--sref URL --sw N)：使用图片URL迁移美学风格。--sw (0-1000, 默认100) 调整风格化强度。可使用 'random' 或数字风格码。点击预览图可放大。" },
        { attachToSelector: 'div[data-type="oref"] .ref-module-header h4', tooltipKey: 'orefRef',
            zh: "全方位参考 (--oref URL --ow N)：只支持一张图片，且仅能在 V7 版本中使用，允许同时使用图片和风格参考效果。--ow (0-100, 默认100) 调整整体参考强度。点击预览图可放大。" },
        { attachToSelector: '.form-group:has(.speed-btn-group) > label', tooltipKey: 'speedMode',
            zh: "速度 (--relax, --fast, --turbo)：选择生成模式。Relax模式不消耗Fast Credit，Turbo模式最快但消耗更多。Fast为默认速度。" },
        { attachToSelector: '.form-group:has(.mode-btn-group) > label', tooltipKey: 'renderMode',
            zh: "模式 (--raw)：标准模式或原始模式。原始模式 (--raw) 会减少Midjourney的默认风格应用，更贴近提示词。V6以上版本效果更明显。" },
        { attachToSelector: '.form-group:has(.visibility-btn-group) > label', tooltipKey: 'visibilityMode',
            zh: "可见性 (--public, --stealth)：控制图像是否公开。默认公开。隐身模式 (--stealth) 仅限Pro Plan订阅者。" },
        { attachToSelector: 'label[for="seed-input"]', tooltipKey: 'seed',
            zh: "种子 (--seed)：指定一个数字 (0-4294967295) 以生成视觉上更一致的图像。留空则随机。" },
        { attachToSelector: 'label[for="quality-slider"]', tooltipKey: 'quality',
            zh: "质量 (--q)：调整渲染所花费的时间和细节。脚本内可选值: 0.25, 0.5, 1, 2, 4。默认1。不同模型实际支持的值可能不同，请参考官方文档。" },
        { attachToSelector: 'label[for="stop-slider"]', tooltipKey: 'stop',
            zh: "停止 (--stop)：在图像生成过程中提前停止 (10-100)。值越小，图像越模糊、细节越少。默认100 (不停止)。" },
        { attachToSelector: 'label[for="r-slider"]', tooltipKey: 'repeat',
            zh: "批量任务 (--r)：重复运行作业多次，以便快速生成多个变体。通常为2-10次。在Relax模式下不可用，需开启fast模式。" },
        { attachToSelector: 'label[for="personal-params"]', tooltipKey: 'personalParams',
            zh: "个性化 (--p)：应用您之前保存的个性化代码，以便快速应用一组常用的参数或风格影响。需提前在Midjourney网站设置。" },
        { attachToSelector: 'label[for="tile-toggle-switch"]', tooltipKey: 'tile',
            zh: "重复图案 (--tile)：生成可作为无缝重复纹理或图案的图像。" },
        { attachToSelector: 'label[for="draft-toggle-switch"]', tooltipKey: 'draft',
            zh: "草稿模式 (--draft)：生成图像速度更快且成本更低，但细节较少，适合快速迭代想法。" }
    ];

    // --- 工具提示管理器 (TOOLTIP MANAGER) ---
    const TooltipManager = {
        tooltipElement: null,
        MOUSE_OFFSET: 10,

        init: () => {
            if (TooltipManager.tooltipElement) return;
            TooltipManager.tooltipElement = document.createElement('div');
            TooltipManager.tooltipElement.className = 'mj-enhanced-tooltip';
            document.body.appendChild(TooltipManager.tooltipElement);
        },
        show: (event, zhText) => {
            if (!TooltipManager.tooltipElement) TooltipManager.init();
            TooltipManager.tooltipElement.innerHTML = `<span class="tooltip-zh">${zhText}</span>`;

            TooltipManager.tooltipElement.classList.remove('visible');
            TooltipManager.tooltipElement.style.visibility = 'hidden';
            TooltipManager.tooltipElement.style.display = 'block';

            const tooltipRect = TooltipManager.tooltipElement.getBoundingClientRect();

            TooltipManager.tooltipElement.style.display = '';
            TooltipManager.tooltipElement.style.visibility = '';

            let x = event.pageX + TooltipManager.MOUSE_OFFSET;
            let y = event.pageY + TooltipManager.MOUSE_OFFSET;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (x + tooltipRect.width > viewportWidth - TooltipManager.MOUSE_OFFSET) {
                x = event.pageX - tooltipRect.width - TooltipManager.MOUSE_OFFSET;
            }
            if (y + tooltipRect.height > viewportHeight - TooltipManager.MOUSE_OFFSET) {
                y = event.pageY - tooltipRect.height - TooltipManager.MOUSE_OFFSET;
            }
            if (x < TooltipManager.MOUSE_OFFSET) x = TooltipManager.MOUSE_OFFSET;
            if (y < TooltipManager.MOUSE_OFFSET) y = TooltipManager.MOUSE_OFFSET;

            TooltipManager.tooltipElement.style.left = `${x}px`;
            TooltipManager.tooltipElement.style.top = `${y}px`;
            TooltipManager.tooltipElement.classList.add('visible');
        },
        hide: () => {
            if (TooltipManager.tooltipElement) {
                TooltipManager.tooltipElement.classList.remove('visible');
            }
        },
        attachTooltips: (panelElementContext, definitions) => {
            if (!TooltipManager.tooltipElement) TooltipManager.init();

            definitions.forEach(def => {
                const targetElements = Utils.qsa(def.attachToSelector, panelElementContext);
                targetElements.forEach(attachElement => {
                    let icon = attachElement.querySelector(`.mj-tooltip-trigger-icon[data-tooltip-key="${def.tooltipKey}"]`);
                    if (icon) return;

                    icon = document.createElement('span');
                    icon.className = 'mj-tooltip-trigger-icon';
                    icon.innerHTML = CONFIG.ICONS.info_question || '?';
                    icon.dataset.tooltipKey = def.tooltipKey;
                    icon.setAttribute('role', 'button');
                    icon.setAttribute('aria-label', '查看帮助');
                    icon.setAttribute('tabindex', '0');

                    attachElement.appendChild(document.createTextNode(' '));
                    attachElement.appendChild(icon);

                    const showTooltip = (e) => {
                        let baseEvent = e;
                        if (e.type === 'focus' || (e.type === 'keydown' && (e.key === 'Enter' || e.key === ' '))) {
                            const iconRect = icon.getBoundingClientRect();
                            baseEvent = {
                                pageX: iconRect.left + window.scrollX + (iconRect.width / 2) + TooltipManager.MOUSE_OFFSET + 5,
                                pageY: iconRect.top + window.scrollY + (iconRect.height / 2)
                            };
                        }
                        TooltipManager.show(baseEvent, def.zh);
                    };

                    icon.addEventListener('mouseenter', showTooltip);
                    icon.addEventListener('mouseleave', TooltipManager.hide);
                    icon.addEventListener('focus', showTooltip);
                    icon.addEventListener('blur', TooltipManager.hide);
                    icon.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            showTooltip(e);
                        } else if (e.key === 'Escape') {
                            TooltipManager.hide();
                        }
                    });
                });
            });
        }
    };

    // --- UI 管理器 (UI MANAGER) ---
    const UIManager = {
        panelElement: null,
        promptDisplayElement: null,
        lightboxElement: null,
        lightboxImageElement: null,

        buildPanelHTML: () => {
            const versionOptionsHTML = CONFIG.VERSIONS.map(v =>
                `<button class="mj-custom-select-option" data-value="${v.value}" role="option">${v.text}</button>`
            ).join('');
            const initialVersion = ParamManager.getDefaultParams().version;
            const initialVersionText = CONFIG.VERSIONS.find(v => v.value === initialVersion)?.text || initialVersion;

            return `
            <div class="panel-header">
                <h3 class="panel-title">Midjourney 参数设置</h3>
                <div class="panel-header-actions">
                    <div style="position:relative;">
                        <button id="theme-dropdown-trigger" title="切换主题模式" class="theme-trigger-btn" aria-haspopup="listbox" aria-expanded="false">
                            <span id="theme-trigger-icon"></span><span id="theme-trigger-text"></span>
                        </button>
                        <div id="theme-options-menu" class="theme-options-menu" role="listbox" style="display:none;">
                            <button data-theme="light" class="theme-option-button" role="option">${CONFIG.ICONS.sun} ${CONFIG.THEME_TEXT_MAP.light}</button>
                            <button data-theme="dark" class="theme-option-button" role="option">${CONFIG.ICONS.moon} ${CONFIG.THEME_TEXT_MAP.dark}</button>
                            <button data-theme="discord" class="theme-option-button" role="option">${CONFIG.ICONS.discord} ${CONFIG.THEME_TEXT_MAP.discord}</button>
                            <button data-theme="system" class="theme-option-button" role="option">${CONFIG.ICONS.system} ${CONFIG.THEME_TEXT_MAP.system}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel-main-content">
                <nav class="panel-tabs">
                    <button class="tab-link active" data-tab="tab-main">主要参数</button>
                    <button class="tab-link" data-tab="tab-references">图像参考</button>
                    <button class="tab-link" data-tab="tab-advanced">高级设置</button>
                    <button class="tab-link" data-tab="tab-presets">预设模板</button>
                    <button class="tab-link" data-tab="tab-history">历史记录</button>
                </nav>
                <div id="tab-main" class="tab-content active">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="main-prompt">主要提示词</label>
                            <textarea id="main-prompt" placeholder="输入主要提示词..."></textarea>
                        </div>
                         <div class="form-group">
                            <label for="no-prompt">排除词 (--no)</label>
                            <textarea id="no-prompt" placeholder="输入需要排除的元素..."></textarea>
                        </div>
                        <div class="form-group span-2" id="ar-section">
                            <label>图片尺寸 (--ar)</label>
                            <div class="ar-controls">
                                <div class="ar-preview-container">
                                    <div id="ratio-preview-bg"></div>
                                    <div id="ratio-preview"><div id="ratio-box">1:1</div></div>
                                </div>
                                <div class="ar-slider-group">
                                    <div id="size-buttons" class="btn-group"></div>
                                    <input type="range" id="ratio-slider" min="0" max="${CONFIG.AR_SIZE_MAP.length - 1}" value="${Math.floor(CONFIG.AR_SIZE_MAP.length / 2)}">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="stylize">风格化 (--s)</label>
                            <div class="slider-control"><input type="range" id="stylize" min="0" max="1000" value="100" step="50"><span id="stylize-value">100</span></div>
                        </div>
                        <div class="form-group">
                            <label for="chaos">多样性 (--c)</label>
                            <div class="slider-control"><input type="range" id="chaos" min="0" max="100" value="0" step="5"><span id="chaos-value">0</span></div>
                        </div>
                        <div class="form-group">
                            <label for="weird">奇特化 (--w)</label>
                                <div class="slider-control"><input type="range" id="weird" min="0" max="3000" value="0" step="100"><span id="weird-value">0</span></div>
                        </div>
                        <div class="form-group">
                            <label for="exp-slider">探索性 (--exp)</label>
                            <div class="slider-control"><input type="range" id="exp-slider" min="0" max="100" value="0" step="5"><span id="exp-value">0</span></div>
                        </div>
                        <div class="form-group">
                            <label for="version-dropdown-trigger">版本 (--v, --niji)</label>
                            <div class="mj-custom-select-container">
                                <button id="version-dropdown-trigger" class="mj-custom-select-trigger" aria-haspopup="listbox" aria-expanded="false">
                                    <span id="version-selected-text">${initialVersionText}</span>
                                    <span class="mj-custom-select-arrow">${CONFIG.ICONS.arrow_down || '▼'}</span>
                                </button>
                                <div id="version-options-menu" class="mj-custom-select-options" role="listbox" style="display:none;">
                                    ${versionOptionsHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="tab-references" class="tab-content">
                    <div class="ref-grid-main">
                        ${Object.keys(CONFIG.REF_TYPE_DISPLAY_NAMES).map(typeKey => `
                        <div class="ref-module" data-type="${typeKey}">
                            <div class="ref-module-header">
                                <h4>${CONFIG.REF_TYPE_DISPLAY_NAMES[typeKey]} (--${typeKey === 'directImages' ? 'iw' : (typeKey === 'cref' ? 'cw' : (typeKey === 'sref' ? 'sw' : 'ow'))})</h4>
                                <div class="global-weight-control">
                                    <label for="${typeKey}-global-weight-slider">整体权重</label>
                                    <div class="weight-slider-mini">
                                        <input type="range" id="${typeKey}-global-weight-slider"
                                               min="${typeKey === 'directImages' ? 0 : (typeKey === 'cref' ? 0 : 0)}"
                                               max="${typeKey === 'directImages' ? 3 : (typeKey === 'cref' ? 100 : (typeKey === 'sref' || typeKey === 'oref' ? 1000 : 100))}"
                                               value="${typeKey === 'directImages' ? 1 : (typeKey === 'cref' ? 100 : (typeKey === 'sref' ? 100 : 100))}"
                                               step="${typeKey === 'directImages' ? 0.1 : (typeKey === 'cref' ? 5 : (typeKey === 'sref' || typeKey === 'oref' ? 50 : 10))}">
                                        <span id="${typeKey}-global-weight-value">${typeKey === 'directImages' ? 1 : (typeKey === 'cref' ? 100 : (typeKey === 'sref' ? 100 : 100))}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ref-input-section">
                                <input type="text" placeholder="${typeKey === 'sref' ? 'URL、random或数字码' : '图片URL'}" class="ref-url-input">
                                <input type="text" placeholder="多权重" class="ref-weight-input">
                                <button class="ref-add-btn">添加</button>
                            </div>
                            <div class="ref-container-large" id="${typeKey}-preview"></div>
                        </div>
                        `).join('')}
                    </div>
                </div>
                <div id="tab-advanced" class="tab-content">
                   <div class="form-grid">
                        <div class="form-group">
                            <label>速度</label>
                            <div class="btn-group speed-btn-group">
                                <button data-value="relax" class="speed-btn active">标准</button><button data-value="fast" class="speed-btn">快速</button><button data-value="turbo" class="speed-btn">极速</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>模式</label>
                            <div class="btn-group mode-btn-group">
                                <button data-value="standard" class="mode-btn active">标准</button><button data-value="raw" class="mode-btn">原始</button>
                            </div>
                        </div>
                         <div class="form-group">
                            <label>可见性</label>
                            <div class="btn-group visibility-btn-group">
                                <button data-value="" class="visibility-btn active">默认</button><button data-value="public" class="visibility-btn">公开</button><button data-value="stealth" class="visibility-btn">隐身</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="seed-input">种子 (--seed)</label>
                            <input type="number" id="seed-input" placeholder="0-4294967295" min="0" max="4294967295">
                        </div>
                        <div class="form-group">
                            <label for="quality-slider">质量 (--q)</label>
                            <div class="slider-control"><input type="range" id="quality-slider" min="0" max="${CONFIG.QUALITY_MAP.length - 1}" step="1" value="2"><span id="quality-value">1</span></div>
                        </div>
                        <div class="form-group">
                            <label for="stop-slider">停止 (--stop)</label>
                            <div class="slider-control"><input type="range" id="stop-slider" min="10" max="100" step="1" value="100"><span id="stop-value">100</span></div>
                        </div>
                        <div class="form-group">
                            <label for="r-slider">批量任务 (--r)</label>
                            <div class="slider-control"><input type="range" id="r-slider" min="1" max="10" value="1"><span id="r-value">1</span></div>
                        </div>
                         <div class="form-group">
                            <label for="personal-params">个性化 (--p)</label>
                            <input type="text" id="personal-params" placeholder="输入个性化参数">
                        </div>
                        <div class="form-group toggle-group">
                            <label for="tile-toggle-switch">重复图案 (--tile)</label>
                            <div class="toggle-switch" id="tile-toggle-switch"><div class="toggle-dot"></div></div>
                        </div>
                         <div class="form-group toggle-group">
                            <label for="draft-toggle-switch">草稿模式 (--draft)</label>
                            <div class="toggle-switch" id="draft-toggle-switch"><div class="toggle-dot"></div></div>
                        </div>
                   </div>
                </div>
                <div id="tab-presets" class="tab-content">
                    <div class="presets-controls">
                        <input type="text" id="preset-name-input" placeholder="输入预设名称..." class="preset-input-name form-group input">
                        <button id="save-preset-btn" class="action-button-primary preset-save-button">保存当前为预设</button>
                    </div>
                    <h4 class="settings-subheader">已保存的预设:</h4>
                    <ul id="presets-list-display" class="settings-list"></ul>
                </div>
                <div id="tab-history" class="tab-content">
                    <div class="history-controls">
                        <h4 class="settings-subheader">最近 <span id="history-limit-display">${CONFIG.MAX_HISTORY_ITEMS}</span> 条生成历史:</h4>
                        <button id="clear-history-btn" class="action-button-secondary history-clear-button">清空历史记录</button>
                    </div>
                    <ul id="history-list-display" class="settings-list"></ul>
                </div>
            </div>
            <div class="panel-footer">
                <textarea id="prompt-params" placeholder="在此处粘贴Midjourney指令后点击“解析”，或查看最终生成的参数..."></textarea>
                <div class="footer-actions">
                    <div class="toggle-group imagine-toggle">
                        <label for="imagine-toggle-switch">添加 /imagine</label>
                        <div class="toggle-switch" id="imagine-toggle-switch"><div class="toggle-dot"></div></div>
                    </div>
                    <div class="footer-buttons">
                         <button id="parse-btn" class="action-button-secondary">解析</button>
                         <button id="clear-btn" class="action-button-secondary">清空</button>
                         <button id="copy-btn" class="action-button-primary">拷贝</button>
                    </div>
                </div>
            </div>
            `;
        },
        createFloatingButton: () => {
            const button = document.createElement('button');
            button.textContent = 'MJ参数';
            button.id = 'mj-floating-settings-button';
            document.body.appendChild(button);
            return button;
        },
        createPanel: () => {
            const panel = document.createElement('div');
            panel.id = 'mj-control-panel';
            panel.innerHTML = UIManager.buildPanelHTML();
            document.body.appendChild(panel);
            UIManager.panelElement = panel;
            UIManager.promptDisplayElement = Utils.qs('#prompt-params', panel);

            // Update placeholder text for ref-url-input to reflect the new validation
            Utils.qsa('.ref-module', panel).forEach(module => {
                const typeKey = module.dataset.type;
                const urlInput = Utils.qs('.ref-url-input', module);
                if (urlInput) {
                    if (typeKey === 'sref') {
                        urlInput.placeholder = 'URL、random或数字码';
                    } else {
                        urlInput.placeholder = '图片URL';
                    }
                }
            });
            return panel;
        },
        initLightbox: () => {
            if (UIManager.lightboxElement) return;

            const lightboxHTML = `
                <div class="mj-lightbox-content">
                    <span class="mj-lightbox-close" title="关闭">&times;</span>
                    <img src="" alt="放大预览" class="mj-lightbox-image">
                </div>`;
            const lightbox = document.createElement('div');
            lightbox.id = 'mj-image-lightbox';
            lightbox.className = 'mj-lightbox-overlay';
            lightbox.innerHTML = lightboxHTML;
            document.body.appendChild(lightbox);

            UIManager.lightboxElement = lightbox;
            UIManager.lightboxImageElement = Utils.qs('.mj-lightbox-image', lightbox);
        },

        showLightbox: (imageUrl) => {
            if (!UIManager.lightboxElement || !UIManager.lightboxImageElement) return;
            UIManager.lightboxImageElement.src = imageUrl;
            UIManager.lightboxElement.classList.add('visible');
            document.body.classList.add('mj-lightbox-no-scroll');
        },

        hideLightbox: () => {
            if (!UIManager.lightboxElement) return;
            UIManager.lightboxElement.classList.remove('visible');
            document.body.classList.remove('mj-lightbox-no-scroll');
            if (UIManager.lightboxImageElement) UIManager.lightboxImageElement.src = '';
        },
        togglePanel: () => {
            appState.isPanelVisible = !appState.isPanelVisible;
            if (UIManager.panelElement) {
                UIManager.panelElement.classList.toggle('visible', appState.isPanelVisible);
                if (!appState.isPanelVisible) { // Panel is closing
                    // Close all dropdowns when panel closes
                    const dropdownsToClose = [
                        { menu: Utils.qs('#theme-options-menu', UIManager.panelElement), trigger: Utils.qs('#theme-dropdown-trigger', UIManager.panelElement) },
                        { menu: Utils.qs('#version-options-menu', UIManager.panelElement), trigger: Utils.qs('#version-dropdown-trigger', UIManager.panelElement) }
                    ];
                    dropdownsToClose.forEach(dd => {
                        if (dd.menu) dd.menu.style.display = 'none';
                        if (dd.trigger) dd.trigger.setAttribute('aria-expanded', 'false');
                    });
                    TooltipManager.hide();
                }
            }
        },
        updateGeneratedPromptDisplay: (promptStr) => {
            if (UIManager.promptDisplayElement) UIManager.promptDisplayElement.value = promptStr;
        },
        updateAllUIElements: () => {
            const p = appState.params;
            const $id = (id) => Utils.qs(`#${id}`, UIManager.panelElement);

            if ($id('main-prompt')) $id('main-prompt').value = p.prompt;
            if ($id('no-prompt')) $id('no-prompt').value = p.noPrompt;

            ['stylize', 'weird', 'chaos', 'stop', 'r', 'exp'].forEach(key => {
                const slider = $id(key) || $id(`${key}-slider`);
                const display = $id(`${key}-value`);
                if (slider && p[key] !== undefined) slider.value = p[key];
                if (display && p[key] !== undefined) display.textContent = p[key];
            });

            Object.keys(CONFIG.REF_TYPE_DISPLAY_NAMES).forEach(refKey => {
                const globalWeightKey = refKey === 'directImages' ? 'iw' : (refKey === 'cref' ? 'cw' : (refKey === 'sref' ? 'sw' : 'ow'));
                const slider = $id(`${refKey}-global-weight-slider`);
                const display = $id(`${refKey}-global-weight-value`);
                if (slider && p[globalWeightKey] !== undefined) slider.value = p[globalWeightKey];
                if (display && p[globalWeightKey] !== undefined) display.textContent = p[globalWeightKey];
            });

            const qualitySlider = $id('quality-slider'); const qualityValueDisplay = $id('quality-value');
            if (qualitySlider && qualityValueDisplay && p.quality !== undefined) {
                const idx = CONFIG.QUALITY_MAP.indexOf(parseFloat(p.quality));
                qualitySlider.value = idx !== -1 ? idx : CONFIG.QUALITY_MAP.indexOf(1);
                qualityValueDisplay.textContent = CONFIG.QUALITY_MAP[parseInt(qualitySlider.value, 10)];
            }

            const versionSelectedText = $id('version-selected-text');
            if (versionSelectedText && p.version !== undefined) {
                 const versionObj = CONFIG.VERSIONS.find(v => v.value === p.version);
                 versionSelectedText.textContent = versionObj ? versionObj.text : p.version;
            }
            const versionOptionsMenu = $id('version-options-menu');
            if (versionOptionsMenu) {
                Utils.qsa('.mj-custom-select-option', versionOptionsMenu).forEach(opt => {
                    opt.classList.toggle('active', opt.dataset.value === p.version);
                    opt.setAttribute('aria-selected', String(opt.dataset.value === p.version));
                });
            }

            if ($id('seed-input') && p.seed !== undefined) $id('seed-input').value = p.seed;
            if ($id('personal-params') && p.personalParams !== undefined) $id('personal-params').value = p.personalParams;
            if (p.ar !== undefined) UIManager.updateAspectRatioUI(p.ar);
            ['speed', 'mode', 'visibility'].forEach(key => {
                if (p[key] !== undefined) Utils.qsa(`.${key}-btn`, UIManager.panelElement).forEach(btn => btn.classList.toggle('active', btn.dataset.value === p[key]));
            });
            ['tile', 'draft', 'includeImagine'].forEach(key => {
                const toggleSwitch = $id(`${key === 'includeImagine' ? 'imagine' : key}-toggle-switch`);
                if (toggleSwitch && p[key] !== undefined) toggleSwitch.classList.toggle('active', !!p[key]);
            });
            UIManager.refreshRefPreviews();
        },
        updateAspectRatioUI: (arValue) => {
            const ratioSlider = Utils.qs('#ratio-slider', UIManager.panelElement);
            const ratioBox = Utils.qs('#ratio-box', UIManager.panelElement);
            if (!ratioSlider || !ratioBox) return;

            const ratioIndex = CONFIG.AR_SIZE_MAP.indexOf(arValue);
            ratioSlider.value = ratioIndex !== -1 ? ratioIndex : CONFIG.AR_SIZE_MAP.indexOf('1:1');

            const preset = CONFIG.AR_PRESETS[arValue];
            if (preset) {
                const containerSize = 100; let displayW = preset.w; let displayH = preset.h;
                if (displayW > containerSize || displayH > containerSize) {
                    if (displayW/displayH > 1) { displayH = containerSize * (displayH / displayW); displayW = containerSize; }
                    else { displayW = containerSize * (displayW / displayH); displayH = containerSize; }
                }
                ratioBox.style.width = `${displayW-4}px`; ratioBox.style.height = `${displayH-4}px`;
                ratioBox.textContent = arValue;
            }
            Utils.qsa('#size-buttons button', UIManager.panelElement).forEach(btn => btn.classList.toggle('active', btn.dataset.value === arValue));
        },
        setupARSizeButtons: () => {
            const sizeButtonGroup = Utils.qs('#size-buttons', UIManager.panelElement);
            if (sizeButtonGroup) {
                sizeButtonGroup.innerHTML = '';
                const presetMap = { '纵向': '2:3', '正方形': '1:1', '横向': '3:2' };
                Object.entries(presetMap).forEach(([label, ratio]) => {
                    const btn = document.createElement('button'); btn.textContent = label; btn.dataset.value = ratio;
                    btn.onclick = () => {
                        ParamManager.update('ar', ratio);
                        UIManager.updateAspectRatioUI(ratio);
                    };
                    sizeButtonGroup.appendChild(btn);
                });
            }
        },
        addRefPreviewItem: (paramKey, item) => {
            const container = Utils.qs(`#${paramKey}-preview`, UIManager.panelElement);
            if (!container) return;
            const isSrefCode = paramKey === 'sref' && (item.url.toLowerCase() === 'random' || /^\d+$/.test(item.url));
            const previewItem = document.createElement('div');
            previewItem.className = `ref-item-large ${isSrefCode ? 'code-item' : 'image-item'} ${item.enabled ? '' : 'disabled'}`;

            let contentHtml = '';
            if (isSrefCode) {
                contentHtml = `<div class="ref-code-large">${item.url}</div>`;
            } else {
                contentHtml = `<img src="${item.url}" class="ref-image-large mj-lightbox-thumb" alt="参考图预览" onerror="this.parentElement.classList.add('load-error'); this.parentElement.innerHTML='<div class=\\'ref-error-large\\'>加载失败</div>';">`;
            }

            let weightTextForDisplay = (item.weight && item.weight.trim() !== '') ? `::${item.weight.trim()}` : '';
            const weightDisplaySpan = `<span class="weight-large" style="${weightTextForDisplay ? '' : 'display:none;'}">${weightTextForDisplay}</span>`;

            previewItem.innerHTML = `${contentHtml}${weightDisplaySpan}
                <button class="ref-edit-large" title="编辑权重">${CONFIG.ICONS.edit}</button>
                <button class="ref-toggle-large ${item.enabled ? 'active' : ''}" title="启用/禁用">●</button>
                <button class="ref-delete-large" title="删除">×</button>`;
            container.appendChild(previewItem); // 新项添加到末尾

            if (!isSrefCode) {
                const imgThumb = Utils.qs('.mj-lightbox-thumb', previewItem);
                if (imgThumb) {
                    imgThumb.style.cursor = 'zoom-in';
                    imgThumb.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (!previewItem.classList.contains('load-error')) {
                             UIManager.showLightbox(item.url);
                        }
                    });
                }
            }

            const targetArray = appState.params[paramKey];
            const itemIndex = targetArray.findIndex(i => i.url === item.url && i.weight === item.weight);

            Utils.qs('.ref-edit-large', previewItem).onclick = (e) => { e.stopPropagation(); if (previewItem.classList.contains('load-error')) return; UIManager.showWeightEditDialog(item, paramKey, previewItem); };
            Utils.qs('.ref-toggle-large', previewItem).onclick = (e) => {
                e.stopPropagation(); if (previewItem.classList.contains('load-error')) return;
                item.enabled = !item.enabled;
                previewItem.classList.toggle('disabled', !item.enabled);
                Utils.qs('.ref-toggle-large', previewItem).classList.toggle('active', item.enabled);
                if(itemIndex > -1 && targetArray[itemIndex]) targetArray[itemIndex].enabled = item.enabled;
                ParamManager.generateAndDisplayPrompt();
            };
            Utils.qs('.ref-delete-large', previewItem).onclick = (e) => {
                e.stopPropagation();
                const currentItemIndex = targetArray.findIndex(i => i.url === item.url && i.weight === item.weight && i.enabled === item.enabled);

                if (currentItemIndex > -1) {
                    targetArray.splice(currentItemIndex, 1);
                }
                previewItem.remove();
                ParamManager.generateAndDisplayPrompt();
                if (targetArray.length === 0) {
                    container.classList.remove('mj-ref-has-items');
                } else {
                    container.classList.add('mj-ref-has-items');
                }
            };
        },
        refreshRefPreviews: () => {
            Object.keys(CONFIG.REF_TYPE_DISPLAY_NAMES).forEach(paramKey => {
                const container = Utils.qs(`#${paramKey}-preview`, UIManager.panelElement);
                if (container) {
                    container.innerHTML = ''; // 清空

                    if (paramKey === 'directImages' || paramKey === 'cref' || paramKey === 'sref' || paramKey === 'oref') {
                        const dropOverlay = document.createElement('div');
                        dropOverlay.className = 'drop-overlay';
                        dropOverlay.innerHTML = `<div class="drop-overlay-content"><div class="drop-icon">${CONFIG.ICONS.upload}</div><div class="drop-text">松开即可添加</div></div>`;
                        dropOverlay.style.display = 'none';
                        container.appendChild(dropOverlay);
                    }

                    const items = appState.params[paramKey];
                    if (items && Array.isArray(items) && items.filter(item => item).length > 0) {
                        container.classList.add('mj-ref-has-items');
                        items.forEach(itemData => { // 保持原有遍历顺序
                            if (itemData) {
                                if (typeof itemData.enabled === 'undefined') itemData.enabled = true;
                                UIManager.addRefPreviewItem(paramKey, itemData); // addRefPreviewItem 内部是 appendChild
                            }
                        });
                    } else {
                        container.classList.remove('mj-ref-has-items');
                    }
                }
            });
        },
        showWeightEditDialog: (item, paramKey, previewItem) => {
            const dialog = document.createElement('div');
            dialog.className = 'weight-edit-dialog';
            const currentWeight = item.weight || '';
            dialog.innerHTML = `
                <div class="weight-edit-content">
                    <h4>编辑权重</h4>
                    <div class="weight-edit-input-group">
                        <label>权重值：</label>
                        <input type="text" class="weight-edit-input" value="${currentWeight}" placeholder="留空为默认权重">
                    </div>
                    <div class="weight-edit-buttons">
                        <button class="weight-edit-cancel">取消</button>
                        <button class="weight-edit-save">保存</button>
                    </div>
                </div>
                <div class="weight-edit-overlay"></div>`;
            document.body.appendChild(dialog);
            const input = Utils.qs('.weight-edit-input', dialog);
            const saveBtn = Utils.qs('.weight-edit-save', dialog);
            const cancelBtn = Utils.qs('.weight-edit-cancel', dialog);
            const overlay = Utils.qs('.weight-edit-overlay', dialog);
            input.focus(); input.select();
            const closeDialog = () => {
                 if (document.body.contains(dialog)) document.body.removeChild(dialog);
                 document.removeEventListener('keydown', escListenerDialog);
            };
            const escListenerDialog = (e) => { if (e.key === 'Escape') closeDialog(); };

            saveBtn.onclick = () => {
                const newWeight = input.value.trim();
                if (newWeight !== '' && !/^\d*\.?\d*$/.test(newWeight) && paramKey === 'directImages') {
                    Utils.showToast('图片独立权重必须是数字 (例如 0.5, 1, 2) 或留空'); return;
                }
                item.weight = newWeight;
                UIManager.updateRefPreviewItemWeightDisplay(previewItem, item.weight);
                ParamManager.generateAndDisplayPrompt(); closeDialog(); Utils.showToast('权重已更新');
            };
            cancelBtn.onclick = closeDialog;
            overlay.onclick = closeDialog;
            input.addEventListener('keypress', (e) => { if (e.key === 'Enter') saveBtn.click(); });
            document.addEventListener('keydown', escListenerDialog);
        },
        updateRefPreviewItemWeightDisplay: (previewItem, newWeight) => {
            const weightDisplay = Utils.qs('.weight-large', previewItem);
            if (weightDisplay) {
                if (newWeight && newWeight.trim() !== '') {
                    weightDisplay.textContent = `::${newWeight}`;
                    weightDisplay.style.display = 'block';
                } else {
                    weightDisplay.style.display = 'none';
                }
            }
        },
        setActiveTab: (tabId) => {
            Utils.qsa('.tab-link', UIManager.panelElement).forEach(btn => btn.classList.remove('active'));
            Utils.qs(`.tab-link[data-tab="${tabId}"]`, UIManager.panelElement).classList.add('active');
            Utils.qsa('.tab-content', UIManager.panelElement).forEach(content => content.classList.remove('active'));
            Utils.qs(`#${tabId}`, UIManager.panelElement).classList.add('active');
        },
        injectStyles: () => {
            // Styles moved to style.css
        }
    };

    // --- 存储管理器 (STORAGE MANAGERS - Presets & History) ---
    const PresetManager = {
        get: () => JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.PRESETS)) || [],
        save: () => {
            const nameInput = Utils.qs('#preset-name-input', UIManager.panelElement);
            const presetName = nameInput.value.trim();
            if (!presetName) { Utils.showToast('请输入预设名称'); return; }
            let presets = PresetManager.get();
            const existingIdx = presets.findIndex(p => p.name === presetName);
            const presetData = { name: presetName, params: JSON.parse(JSON.stringify(appState.params)) };
            if (existingIdx > -1) presets[existingIdx] = presetData; else presets.push(presetData);
            localStorage.setItem(CONFIG.STORAGE_KEYS.PRESETS, JSON.stringify(presets));
            nameInput.value = ''; PresetManager.renderList();
            Utils.showToast(existingIdx > -1 ? `预设 "${presetName}" 已更新` : `预设 "${presetName}" 已保存`);
        },
        load: (presetName) => {
            const preset = PresetManager.get().find(p => p.name === presetName);
            if (preset) {
                appState.params = JSON.parse(JSON.stringify(preset.params));
                UIManager.updateAllUIElements();
                ParamManager.generateAndDisplayPrompt();
                Utils.showToast(`预设 "${presetName}" 已加载`);
            } else Utils.showToast(`未找到预设 "${presetName}"`);
        },
        delete: (presetName) => {
            UIManager.showCustomConfirm(`确定要删除预设 "${presetName}" 吗？`, () => {
                let presets = PresetManager.get().filter(p => p.name !== presetName);
                localStorage.setItem(CONFIG.STORAGE_KEYS.PRESETS, JSON.stringify(presets));
                PresetManager.renderList(); Utils.showToast(`预设 "${presetName}" 已删除`);
            });
        },
        renderList: () => {
            const listEl = Utils.qs('#presets-list-display', UIManager.panelElement);
            if (!listEl) return;
            listEl.innerHTML = ''; const presets = PresetManager.get();
            if (presets.length === 0) { listEl.innerHTML = '<li class="settings-list-empty">暂无预设模板。</li>'; return; }
            presets.forEach(p => {
                const item = document.createElement('li'); item.className = 'settings-list-item';
                item.innerHTML = `<span class="item-name">${p.name}</span>
                                <div class="item-actions">
                                    <button class="action-button-secondary item-action-btn load-preset">加载</button>
                                    <button class="action-button-danger item-action-btn delete-preset">删除</button>
                                </div>`;
                Utils.qs('.load-preset', item).onclick = () => PresetManager.load(p.name);
                Utils.qs('.delete-preset', item).onclick = () => PresetManager.delete(p.name);
                listEl.appendChild(item);
            });
        }
    };
    UIManager.showCustomConfirm = (message, onConfirm) => {
        const confirmDialogId = 'mj-custom-confirm-dialog';
        if (Utils.qs(`#${confirmDialogId}`)) return;

        const dialog = document.createElement('div');
        dialog.id = confirmDialogId;
        dialog.className = 'weight-edit-dialog'; 
        dialog.style.zIndex = '10004'; 

        dialog.innerHTML = `
            <div class="weight-edit-content" style="min-width: 320px;">
                <h4 style="margin-bottom: 12px; font-size: 15px;">确认操作</h4>
                <p style="font-size: 14px; margin-bottom: 20px; color: ${UIManager.panelElement && UIManager.panelElement.classList.contains('dark-mode') ? '#c7c7c7' : '#333'};">${message}</p>
                <div class="weight-edit-buttons">
                    <button class="weight-edit-cancel">取消</button>
                    <button class="weight-edit-save">确定</button>
                </div>
            </div>
            <div class="weight-edit-overlay" style="z-index: -1;"></div>`; 

        document.body.appendChild(dialog);

        const confirmBtn = Utils.qs('.weight-edit-save', dialog);
        const cancelBtn = Utils.qs('.weight-edit-cancel', dialog);
        const overlay = Utils.qs('.weight-edit-overlay', dialog);

        const closeDialog = () => {
            if (document.body.contains(dialog)) {
                document.body.removeChild(dialog);
            }
            document.removeEventListener('keydown', escListenerConfirm);
        };
        
        const escListenerConfirm = (e) => {
            if (e.key === 'Escape') {
                closeDialog();
            }
        };

        confirmBtn.onclick = () => {
            closeDialog();
            if (onConfirm && typeof onConfirm === 'function') {
                onConfirm();
            }
        };
        cancelBtn.onclick = closeDialog;
        overlay.onclick = closeDialog;
        document.addEventListener('keydown', escListenerConfirm);
    };


    const HistoryManager = {
        get: () => JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.HISTORY)) || [],
        addCurrentPrompt: () => {
            const promptStr = UIManager.promptDisplayElement ? UIManager.promptDisplayElement.value : '';
            if (!promptStr || !promptStr.trim()) return;
            let history = HistoryManager.get();
            if (history.length > 0 && history[0] === promptStr) return;
            history.unshift(promptStr);
            if (history.length > CONFIG.MAX_HISTORY_ITEMS) history = history.slice(0, CONFIG.MAX_HISTORY_ITEMS);
            localStorage.setItem(CONFIG.STORAGE_KEYS.HISTORY, JSON.stringify(history));
            HistoryManager.renderList();
        },
        loadItem: (promptStr) => {
            if (UIManager.promptDisplayElement) UIManager.promptDisplayElement.value = promptStr;
            ParamManager.parseCommand(promptStr);
            Utils.showToast('历史记录已加载到面板');
        },
        copyItem: (promptStr) => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(promptStr).then(() => Utils.showToast('历史记录已复制!')).catch(() => Utils.showToast('复制失败!'));
            } else {
                const textarea = document.createElement('textarea'); textarea.value = promptStr; document.body.appendChild(textarea);
                textarea.select(); try { document.execCommand('copy'); Utils.showToast('历史记录已复制 (兼容模式)!'); } catch (err) { Utils.showToast('复制失败!'); }
                document.body.removeChild(textarea);
            }
        },
        clearAll: () => {
             UIManager.showCustomConfirm('确定要清空所有历史记录吗？', () => {
                localStorage.removeItem(CONFIG.STORAGE_KEYS.HISTORY);
                HistoryManager.renderList(); Utils.showToast('历史记录已清空');
            });
        },
        renderList: () => {
            const listEl = Utils.qs('#history-list-display', UIManager.panelElement);
            if (!listEl) return;
            listEl.innerHTML = ''; const history = HistoryManager.get();
            if (history.length === 0) { listEl.innerHTML = '<li class="settings-list-empty">暂无历史记录。</li>'; return; }
            const limitDisplay = Utils.qs('#history-limit-display', UIManager.panelElement);
            if (limitDisplay) limitDisplay.textContent = CONFIG.MAX_HISTORY_ITEMS;
            history.forEach(promptStr => {
                const item = document.createElement('li'); item.className = 'settings-list-item history-item';
                const displayText = promptStr.length > 80 ? promptStr.substring(0, 77) + '...' : promptStr;
                item.innerHTML = `<span class="item-name history-prompt-text" title="${promptStr}">${displayText}</span>
                                <div class="item-actions">
                                    <button class="action-button-secondary item-action-btn load-history">加载</button>
                                    <button class="action-button-secondary item-action-btn copy-history">复制</button>
                                </div>`;
                Utils.qs('.load-history', item).onclick = () => HistoryManager.loadItem(promptStr);
                Utils.qs('.copy-history', item).onclick = () => HistoryManager.copyItem(promptStr);
                listEl.appendChild(item);
            });
        }
    };

    // --- 事件绑定器 (EVENT BINDER) ---
    const EventBinder = {
        init: () => {
            const panel = UIManager.panelElement;
            if (!panel) return;

            Utils.qs('#mj-floating-settings-button').addEventListener('click', UIManager.togglePanel);
            Utils.qsa('.tab-link', panel).forEach(btn => btn.addEventListener('click', (e) => UIManager.setActiveTab(e.target.dataset.tab)));
            
            const managedDropdowns = [];
            const initDropdown = (triggerId, menuId, optionsSelector, actionCallback, dataAttribute = 'value') => {
                const trigger = Utils.qs(`#${triggerId}`, panel);
                const menu = Utils.qs(`#${menuId}`, panel);
                if (trigger && menu) {
                    managedDropdowns.push({ trigger, menu });
                    trigger.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const isVisible = menu.style.display === 'block';
                        managedDropdowns.forEach(dd => {
                            if (dd.menu !== menu && dd.menu.style.display === 'block') {
                                dd.menu.style.display = 'none';
                                dd.trigger.setAttribute('aria-expanded', 'false');
                            }
                        });
                        menu.style.display = isVisible ? 'none' : 'block';
                        trigger.setAttribute('aria-expanded', String(!isVisible));
                    });
                    Utils.qsa(optionsSelector, menu).forEach(optionBtn => {
                        optionBtn.addEventListener('click', (e) => {
                            actionCallback(e.currentTarget.dataset[dataAttribute]);
                            menu.style.display = 'none';
                            trigger.setAttribute('aria-expanded', 'false');
                            if (trigger.focus) trigger.focus();
                        });
                    });
                }
            };

            initDropdown('theme-dropdown-trigger', 'theme-options-menu', '.theme-option-button', ThemeManager.change, 'theme');
            initDropdown('version-dropdown-trigger', 'version-options-menu', '.mj-custom-select-option', (value) => {
                ParamManager.update('version', value);
                const versionSelectedText = Utils.qs('#version-selected-text', panel);
                if (versionSelectedText) {
                    const versionObj = CONFIG.VERSIONS.find(v => v.value === value);
                    versionSelectedText.textContent = versionObj ? versionObj.text : value;
                }
                Utils.qsa('.mj-custom-select-option', Utils.qs('#version-options-menu', panel)).forEach(opt => {
                    opt.classList.toggle('active', opt.dataset.value === value);
                    opt.setAttribute('aria-selected', String(opt.dataset.value === value));
                });
            });
            
            document.addEventListener('click', (e) => {
                managedDropdowns.forEach(dd => {
                    if (dd.menu.style.display === 'block' && !dd.menu.contains(e.target) && !dd.trigger.contains(e.target)) {
                        dd.menu.style.display = 'none';
                        dd.trigger.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            Utils.qs('#main-prompt', panel).oninput = e => ParamManager.update('prompt', e.target.value);
            Utils.qs('#no-prompt', panel).oninput = e => ParamManager.update('noPrompt', e.target.value.trim());
            const seedInput = Utils.qs('#seed-input', panel);
            if (seedInput) {
                seedInput.oninput = e => {
                    const value = e.target.value.trim();
                    const seedVal = (/^\d*$/.test(value) && (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 4294967295))) ? value : appState.params.seed;
                    e.target.value = seedVal; 
                    ParamManager.update('seed', seedVal);
                };
            }
            const personalParamsInput = Utils.qs('#personal-params', panel);
            if (personalParamsInput) personalParamsInput.oninput = e => ParamManager.update('personalParams', e.target.value.trim());


            const bindSlider = (paramKey, sliderId, valueId, valueParser = (v) => parseInt(v, 10), displayFormatter = (v) => v) => {
                const slider = Utils.qs(`#${sliderId}`, panel);
                const display = Utils.qs(`#${valueId}`, panel);
                if (slider && display) { 
                    slider.oninput = e => {
                        const rawValue = e.target.value;
                        const parsedValue = valueParser(rawValue);
                        ParamManager.update(paramKey, parsedValue);
                        display.textContent = displayFormatter(parsedValue, rawValue); 
                    };
                }
            };

            bindSlider('stylize', 'stylize', 'stylize-value');
            bindSlider('weird', 'weird', 'weird-value');
            bindSlider('chaos', 'chaos', 'chaos-value');
            bindSlider('stop', 'stop-slider', 'stop-value');
            bindSlider('r', 'r-slider', 'r-value');
            bindSlider('exp', 'exp-slider', 'exp-value');
            bindSlider('quality', 'quality-slider', 'quality-value',
                (val) => CONFIG.QUALITY_MAP[parseInt(val, 10)],
                (parsedVal) => parsedVal 
            );
            bindSlider('ar', 'ratio-slider', 'ratio-box', 
                (val) => CONFIG.AR_SIZE_MAP[parseInt(val, 10)] || '1:1',
                (parsedVal) => { 
                    UIManager.updateAspectRatioUI(parsedVal); 
                    return parsedVal; 
                }
            );
            if (Utils.qs('#ratio-slider', panel)) {
                 const initialArVal = CONFIG.AR_SIZE_MAP[parseInt(Utils.qs('#ratio-slider', panel).value, 10)] || '1:1';
                 UIManager.updateAspectRatioUI(initialArVal);
            }


            const bindButtonGroup = (paramKey) => {
                const buttonClass = `${paramKey}-btn`; 
                Utils.qsa(`.${buttonClass}`, panel).forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        Utils.qsa(`.${buttonClass}`, panel).forEach(b => b.classList.remove('active'));
                        e.currentTarget.classList.add('active');
                        ParamManager.update(paramKey, e.currentTarget.dataset.value);
                    });
                });
            };
            bindButtonGroup('speed');
            bindButtonGroup('mode');
            bindButtonGroup('visibility');

            const bindToggleSwitch = (paramKey, toggleIdSuffix = '-toggle-switch') => {
                const toggleElement = Utils.qs(`#${paramKey.startsWith('include') ? 'imagine' : paramKey}${toggleIdSuffix}`, panel);
                if (toggleElement) {
                    toggleElement.onclick = (e) => {
                        const currentVal = appState.params[paramKey];
                        const newVal = !currentVal;
                        ParamManager.update(paramKey, newVal);
                        e.currentTarget.classList.toggle('active', newVal);
                    };
                }
            };
            bindToggleSwitch('tile');
            bindToggleSwitch('draft');
            bindToggleSwitch('includeImagine'); 

            Utils.qsa('.ref-module', panel).forEach(module => {
                const paramKey = module.dataset.type;
                const globalWeightKey = paramKey === 'directImages' ? 'iw' : (paramKey === 'cref' ? 'cw' : (paramKey === 'sref' ? 'sw' : 'ow'));
                
                bindSlider(globalWeightKey, `${paramKey}-global-weight-slider`, `${paramKey}-global-weight-value`,
                   (v) => (paramKey === 'directImages' ? parseFloat(v) : parseInt(v,10))
                );

                const addBtn = Utils.qs('.ref-add-btn', module);
                if (addBtn) {
                    addBtn.onclick = () => {
                        const urlInput = Utils.qs('.ref-url-input', module);
                        const weightInput = Utils.qs('.ref-weight-input', module);
                        ParamManager.addRefItem(paramKey, urlInput.value, weightInput.value);
                        urlInput.value = ''; weightInput.value = '';
                    };
                }
                const container = Utils.qs('.ref-container-large', module);
                if (container && (paramKey === 'directImages' || paramKey === 'cref' || paramKey === 'sref' || paramKey === 'oref')) {
                    const overlay = Utils.qs('.drop-overlay', container);
                    if (overlay) overlay.style.display = 'none';

                    container.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); container.classList.add('drag-over'); if(Utils.qs('.drop-overlay', container)) Utils.qs('.drop-overlay', container).style.display = 'flex'; });
                    container.addEventListener('dragleave', (e) => { e.preventDefault(); e.stopPropagation(); if (!container.contains(e.relatedTarget)) { container.classList.remove('drag-over'); if(Utils.qs('.drop-overlay', container)) Utils.qs('.drop-overlay', container).style.display = 'none'; }});
                    container.addEventListener('drop', (e) => {
                        e.preventDefault(); e.stopPropagation(); container.classList.remove('drag-over'); if(Utils.qs('.drop-overlay', container)) Utils.qs('.drop-overlay', container).style.display = 'none';
                        const url = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
                        if (url) ParamManager.addRefItem(paramKey, url, ''); else Utils.showToast('无法获取拖拽内容的URL');
                    });
                }
            });

            Utils.qs('#parse-btn', panel).onclick = () => ParamManager.parseCommand(Utils.qs('#prompt-params', panel).value);
            Utils.qs('#clear-btn', panel).onclick = ParamManager.reset;
            Utils.qs('#copy-btn', panel).onclick = () => {
                const textarea = UIManager.promptDisplayElement;
                if (!textarea || !textarea.value) { Utils.showToast('没有参数可以拷贝'); return; }
                const promptToCopy = textarea.value;
                textarea.select(); textarea.setSelectionRange(0, 99999);
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(promptToCopy).then(() => { Utils.showToast('参数已复制!'); HistoryManager.addCurrentPrompt(); })
                                                 .catch(() => { try { document.execCommand('copy'); Utils.showToast('参数已复制 (兼容模式)!'); HistoryManager.addCurrentPrompt(); } catch (err) { Utils.showToast('复制失败!'); }});
                } else { try { document.execCommand('copy'); Utils.showToast('参数已复制 (兼容模式)!'); HistoryManager.addCurrentPrompt(); } catch (err) { Utils.showToast('复制失败!'); }}
            };
            Utils.qs('#save-preset-btn', panel).onclick = PresetManager.save;
            Utils.qs('#clear-history-btn', panel).onclick = HistoryManager.clearAll;

            TooltipManager.attachTooltips(panel, TOOLTIP_ICON_TARGETS);

            if (UIManager.lightboxElement) {
                const closeButton = Utils.qs('.mj-lightbox-close', UIManager.lightboxElement);
                if (closeButton) {
                    closeButton.addEventListener('click', UIManager.hideLightbox);
                }
                UIManager.lightboxElement.addEventListener('click', (e) => {
                    if (e.target === UIManager.lightboxElement) {
                        UIManager.hideLightbox();
                    }
                });
            }
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && UIManager.lightboxElement && UIManager.lightboxElement.classList.contains('visible')) {
                    UIManager.hideLightbox();
                }
            });
        }
    };

    // --- 初始化 (MAIN INITIALIZATION) ---
    function main() {
        ParamManager.init();

        UIManager.createFloatingButton();
        UIManager.createPanel(); // createPanel now also updates placeholders
        UIManager.initLightbox();

        TooltipManager.init();
        ThemeManager.init();
        EventBinder.init(); 

        UIManager.setupARSizeButtons(); 
        UIManager.updateAllUIElements(); 

        PresetManager.renderList();
        HistoryManager.renderList();
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(main, 500);
    } else {
        window.addEventListener('DOMContentLoaded', () => setTimeout(main, 500), { once: true });
    }})();