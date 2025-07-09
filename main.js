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
    }
})();