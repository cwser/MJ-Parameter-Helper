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
