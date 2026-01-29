document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const resultsGrid = document.getElementById('results-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (textInput && resultsGrid) {
        const styles = [
            { name: 'Bold Sans', tags: ['Bold'], type: 'bold', map: { a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳', A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙' } },
            { name: 'Italic', tags: ['Fancy'], type: 'fancy', map: { a: '𝑎', b: '𝑏', c: '𝑐', d: '𝑑', e: '𝑒', f: '𝑓', g: '𝑔', h: 'ℎ', i: '𝑖', j: '𝑗', k: '𝑘', l: '𝑙', m: '𝑚', n: '𝑛', o: '𝑜', p: '𝑝', q: '𝑞', r: '𝑟', s: '𝑠', t: '𝑡', u: '𝑢', v: '𝑣', w: '𝑤', x: '𝑥', y: '𝑦', z: '𝑧' } },
            { name: 'Cursive', tags: ['Cursive'], type: 'cursive', map: { a: '𝓪', b: '𝓫', c: '𝓬', d: '𝓭', e: '𝓮', f: '𝓯', g: '𝓰', h: '𝓱', i: '𝓲', j: '𝓳', k: '𝓴', l: '𝓵', m: '𝓶', n: '𝓷', o: '𝓸', p: '𝓹', q: '𝓺', r: '𝓻', s: '𝓼', t: '𝓽', u: '𝓾', v: '𝓿', w: '𝔀', x: '𝔁', y: '𝔂', z: '𝔃' } },
            { name: 'Small Caps', tags: ['Small'], type: 'small', map: { a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ' } },
            { name: 'Glitch', tags: ['Glitch'], type: 'glitch', transform: t => t.split('').map(c => c + ['̷', '̴', '̲', '̾', '͆', '͇'][Math.floor(Math.random()*6)]).join('') },
            { name: 'Boxed', tags: ['Cool'], type: 'cool', map: { a: '🄰', b: '🄱', c: '🄲', d: '🄳', e: '🄴', f: '🄵', g: '🄶', h: '🄷', i: '🄸', j: '🄹', k: '🄺', l: '🄻', m: '🄼', n: '🄽', o: '🄾', p: '🄿', q: '🅀', r: '🅁', s: '🅂', t: '🅃', u: '🅄', v: '🅅', w: '🅆', x: '🅇', y: '🅈', z: '🅉' } },
            { name: 'Circles', tags: ['Cool'], type: 'cool', map: { a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ' } },
            { name: 'Hearts', tags: ['Symbols'], type: 'symbols', transform: t => `♥${t.split('').join('♥')}♥` },
            { name: 'Starry', tags: ['Symbols'], type: 'symbols', transform: t => `★·.·´¯\`·.·★ ${t} ★·.·´¯\`·.·★` },
            { name: 'Emoji Sparkle', tags: ['Emojis'], type: 'emojis', transform: t => `✨ ${t} ✨` },
            { name: 'Smiley', tags: ['Emojis'], type: 'emojis', transform: t => `😊 ${t} 😊` },
            { name: 'Party', tags: ['Emojis'], type: 'emojis', transform: t => `🎉 ${t} 🎉` }
        ];

        let currentFilter = 'all';

        function updateResults() {
            const inputVal = textInput.value.trim() || 'Type something to start';
            resultsGrid.innerHTML = '';
            const filtered = styles.filter(s => currentFilter === 'all' || s.type === currentFilter);
            filtered.forEach(style => {
                let transformed = style.transform ? style.transform(inputVal) : 
                                 inputVal.split('').map(c => (style.map && style.map[c]) || c).join('');
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <div class="result-text">${transformed}</div>
                    <button class="copy-btn">Copy</button>
                `;
                card.querySelector('.copy-btn').onclick = () => {
                    const el = document.createElement('textarea');
                    el.value = transformed;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                    const btn = card.querySelector('.copy-btn');
                    btn.innerText = 'Copied!';
                    setTimeout(() => { btn.innerText = 'Copy'; }, 1000);
                };
                resultsGrid.appendChild(card);
            });
        }

        filterButtons.forEach(btn => {
            btn.onclick = () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                updateResults();
            };
        });

        textInput.addEventListener('input', updateResults);
        updateResults();
    }

    // PFP MAKER FIX (Picsart Style Logic)
    const pfpInput = document.getElementById('pfp-input');
    const pfpPreviewImg = document.getElementById('pfp-preview-img');
    const pfpControls = document.getElementById('pfp-controls');
    const pfpBorderPresets = document.querySelectorAll('#border-presets .color-circle');
    const pfpBgPresets = document.querySelectorAll('#bg-presets .color-circle');
    const pfpBgCustom = document.getElementById('pfp-bg-custom');
    const pfpBorderCustom = document.getElementById('pfp-border-custom');
    const pfpBorderWidth = document.getElementById('pfp-border-width');
    const pfpDownload = document.getElementById('pfp-download');
    
    let currentBorderColor = '#6d28d9';
    let currentBgColor = '#ffffff';

    function updatePfpStyles() {
        const previewCircle = pfpPreviewImg.parentElement;
        if (previewCircle) {
            previewCircle.style.borderColor = currentBorderColor;
            previewCircle.style.backgroundColor = currentBgColor; // FIXED BACKGROUND CHANGE
            previewCircle.style.borderWidth = `${pfpBorderWidth.value}px`;
            previewCircle.style.borderStyle = 'solid';
        }
    }

    if (pfpInput && pfpPreviewImg) {
        pfpInput.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    pfpPreviewImg.src = event.target.result;
                    pfpPreviewImg.classList.remove('hidden');
                    pfpControls.classList.remove('hidden');
                    updatePfpStyles();
                };
                reader.readAsDataURL(file);
            }
        };

        pfpBorderPresets.forEach(btn => {
            btn.onclick = () => {
                pfpBorderPresets.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentBorderColor = btn.dataset.color;
                updatePfpStyles();
            };
        });

        pfpBgPresets.forEach(btn => {
            btn.onclick = () => {
                pfpBgPresets.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentBgColor = btn.dataset.color;
                updatePfpStyles();
            };
        });

        if(pfpBgCustom) pfpBgCustom.oninput = (e) => { currentBgColor = e.target.value; updatePfpStyles(); };
        if(pfpBorderCustom) pfpBorderCustom.oninput = (e) => { currentBorderColor = e.target.value; updatePfpStyles(); };
        if(pfpBorderWidth) pfpBorderWidth.oninput = updatePfpStyles;

        pfpDownload.onclick = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1000;
            canvas.height = 1000;
            
            ctx.beginPath();
            ctx.arc(500, 500, 500, 0, Math.PI * 2);
            ctx.fillStyle = currentBorderColor;
            ctx.fill();
            
            const bw = parseInt(pfpBorderWidth.value) * 3;
            ctx.beginPath();
            ctx.arc(500, 500, 500 - bw, 0, Math.PI * 2);
            ctx.fillStyle = currentBgColor;
            ctx.fill();

            ctx.save();
            ctx.beginPath();
            ctx.arc(500, 500, 500 - bw, 0, Math.PI * 2);
            ctx.clip();
            
            const scale = Math.max(1000 / pfpPreviewImg.naturalWidth, 1000 / pfpPreviewImg.naturalHeight);
            const x = (1000 - pfpPreviewImg.naturalWidth * scale) / 2;
            const y = (1000 - pfpPreviewImg.naturalHeight * scale) / 2;
            ctx.drawImage(pfpPreviewImg, x, y, pfpPreviewImg.naturalWidth * scale, pfpPreviewImg.naturalHeight * scale);
            ctx.restore();

            const link = document.createElement('a');
            link.download = 'picsfont-pfp.png';
            link.href = canvas.toDataURL();
            link.click();
        };
    }
});