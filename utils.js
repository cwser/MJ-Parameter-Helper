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

