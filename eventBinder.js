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
