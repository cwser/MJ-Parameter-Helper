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

