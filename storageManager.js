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
