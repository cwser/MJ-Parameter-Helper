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
