/** Delta lobby skin; tokens, CSS and timers are owned by the Client run. */
window.__ModuleLoader__.load({
  id: '@local/delta-force-ui',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect, useState, useRef } = React;
    const PACKAGE_ID = '@local/delta-force-ui';
    const NS = 'deltaTactical';
    const DICT = {
      zh: { link: '暮线终端', kit: 'DUSKLINE / 界面主题', time: '本地时间', mark: '暮线徽记', settings: '背景设置', choose: '选择本地壁纸', blur: '虚化程度', shade: '遮罩深度', reset: '恢复原创背景', local: '图片仅保存在本机浏览器，不上传。', invalid: '请选择 20MB 以内的 PNG、JPEG 或 WebP 图片。', failed: '图片读取或本地保存失败，请换一张较小的图片。', saved: '已保存到本机', loading: '正在处理图片…' },
      en: { link: 'Duskline', kit: 'DUSKLINE / INTERFACE', time: 'Local time', mark: 'Duskline emblem', settings: 'Background', choose: 'Choose local wallpaper', blur: 'Blur', shade: 'Shade', reset: 'Restore original background', local: 'Images stay in this browser. No upload.', invalid: 'Choose a PNG, JPEG or WebP image under 20MB.', failed: 'Image loading or local saving failed. Try a smaller image.', saved: 'Saved locally', loading: 'Processing image…' },
    };
    const STORAGE_KEY = 'duskline.wallpaper.v1';
    const SETTINGS_EVENT = 'duskline:wallpaper';
    const DEFAULTS = { image: '', blur: 12, shade: 75 };
    function normalizeSettings(value) {
      return { image: typeof value?.image === 'string' && value.image.length < 3000000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(value.image) ? value.image : '',
        blur: Number.isFinite(value?.blur) ? Math.max(0, Math.min(30, value.blur)) : 12,
        shade: Number.isFinite(value?.shade) ? Math.max(55, Math.min(95, value.shade)) : 75 };
    }
    function readSettings() {
      try {
        const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return normalizeSettings(value);
      } catch { return { ...DEFAULTS }; }
    }
    function useWallpaper() {
      const [settings, setSettings] = useState(readSettings);
      useEffect(() => {
        const sync = event => {
          if (event.type === 'storage' && event.key !== STORAGE_KEY && event.key !== null) return;
          setSettings(event.type === SETTINGS_EVENT ? normalizeSettings(event.detail) : readSettings());
        };
        window.addEventListener(SETTINGS_EVENT, sync);
        window.addEventListener('storage', sync);
        return () => { window.removeEventListener(SETTINGS_EVENT, sync); window.removeEventListener('storage', sync); };
      }, []);
      function save(next) {
        if (next.image && normalizeSettings(next).image !== next.image) throw new Error('Image exceeds storage limit');
        next = normalizeSettings(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setSettings(next);
        window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: next }));
      }
      return [settings, save, setSettings];
    }
    // Dark lobby in both host modes, without changing the saved host preference.
    const palette = {
      '--dsw-alias-bg-base': '#111619',
      '--dsw-alias-bg-layer-1': '#191F23',
      '--dsw-alias-bg-layer-2': '#222A2F',
      '--dsw-alias-bg-overlay': '#1C2428',
      '--dsw-alias-border-l1': '#303A40',
      '--dsw-alias-border-l2': '#526068',
      '--dsw-alias-brand-primary': '#00E5A0',
      '--dsw-alias-label-primary': '#E8EEEF',
      '--dsw-alias-label-secondary': '#A3AFB5',
      '--dsw-alias-state-error-primary': '#FF7976',
      '--dsw-alias-state-idle-primary': '#89969D',
      '--dsw-alias-state-success-primary': '#00E5A0',
      '--dsw-alias-state-warn-primary': '#F0C46B',
      '--dsw-specific-sidebar-fill': '#0D1215',
      '--dsw-specific-bubble': '#26343B',
      '--dsw-specific-bubble-highlight': '#35564D',
      '--dsw-specific-input-major': '#191F23',
      '--dsw-specific-login-input': '#191F23',
      '--dsw-specific-selector': '#222A2F',
      '--dsw-specific-tip': '#222A2F',
      '--dsw-specific-menu': '#1C2428',
      '--dsw-menu-surface-fill': '#1C2428',
      '--dsw-specific-sidebar-nav-item-active': '#26343B',
      '--dsw-specific-sidebar-nav-item-active-accent': '#193E33',
      '--dsw-specific-sidebar-nav-item-hover': '#202A2E',
      '--dsw-alias-bg-layer-3': '#2A343B',
      '--dsw-alias-label-tertiary': '#A3AFB5',
      '--dsw-alias-label-caption': '#A3AFB5',
      '--dsw-alias-label-primary-dimmed': '#CFDADD',
      '--dsw-alias-label-primary-bluish': '#CFDADD',
      '--dsw-alias-label-primary-inverted': '#06291F',
      '--dsw-alias-label-primary-foreground': '#06291F',
      '--dsw-alias-link': '#69EDC5',
      '--dsw-alias-markdown-inline-code': '#26343B',
      '--dsw-alias-markdown-code-block': '#10171B',
      '--dsw-alias-markdown-code-block-banner': '#222A2F',
      '--dsw-alias-markdown-code-segment-selected': '#26343B',
      '--dsw-alias-markdown-code-segment-unselected': '#191F23',
      '--dsw-alias-markdown-citation': '#26343B',
      '--dsw-alias-markdown-placeholder': '#222A2F',
      '--dsw-alias-markdown-tag': '#26343B',
      '--dsw-alias-button-elevated-fill': '#222A2F',
      '--dsw-alias-button-floating-fill': '#222A2F',
      '--dsw-alias-button-floating-hover': '#303E46',
      '--dsw-alias-button-primary-dimmed': '#303D43',
      '--dsw-alias-button-primary-hover': '#55EDBA',
      '--dsw-alias-interactive-bg-hover-solid': '#26343B',
      '--dsw-alias-menu-group-header-fill': '#222A2F',
      '--dsw-alias-menu-icon': '#CFDADD',
      '--dsw-alias-border-l2-darkmode-thin': '#526068',
      '--dsw-alias-border-l3': '#526068',
      '--dsw-alias-border-l4': '#71838D',
      '--dsw-alias-bg-module-platform': '#191F23',
      '--dsw-alias-bg-multi-select': '#26343B',
      '--dsw-alias-bg-mask-drop': '#111619E6',
      '--dsw-alias-bg-document-preview': '#191F23',
      '--dsw-alias-label-document-preview': '#E8EEEF',
      '--dsw-alias-label-dimmed': '#A3AFB5',
      '--dsw-alias-brand-primary-invert': '#06291F',
      '--dsw-alias-brand-text': '#69EDC5',
      '--dsw-alias-brand-primary-new-colorprimary-new-color': '#00E5A0',
      '--dsw-alias-button-contrast-fill': '#CFDADD',
      '--dsw-alias-button-ghost-active-border': '#71838D',
      '--dsw-alias-button-ghost-active-fill': '#26343B',
      '--dsw-alias-button-ghost-active-hover': '#303E46',
      '--dsw-alias-button-info-fill': '#00E5A0',
      '--dsw-alias-button-info-hover': '#55EDBA',
      '--dsw-alias-interactive-bg-hover': '#26343B',
      '--dsw-alias-interactive-bg-hover-accent': '#30453F',
      '--dsw-alias-interactive-bg-active': '#30453F',
      '--dsw-alias-interactive-bg-hover-danger': '#492B30',
      '--dsw-alias-fill-tertiary': '#526068',
      '--dsw-alias-state-business-primary': '#69EDC5',
      '--dsw-alias-state-business-tertiary': '#193E33',
      '--dsw-alias-state-success-secondary': '#69EDC5',
      '--dsw-alias-state-success-tertiary': '#193E33',
      '--dsw-alias-state-error-secondary': '#FFAAA6',
      '--dsw-alias-state-warn-label': '#F0C46B',
      '--dsw-alias-state-warn-secondary': '#F0C46B',
      '--dsw-alias-state-warn-tertiary': '#40351F',
      '--dsw-alias-file-diff-added-bg': '#19352B',
      '--dsw-alias-file-diff-added-gutter': '#19352B',
      '--dsw-alias-file-diff-added-marker': '#69EDC5',
      '--dsw-alias-file-diff-deleted-bg': '#42272C',
      '--dsw-alias-file-diff-deleted-gutter': '#42272C',
      '--dsw-alias-file-diff-deleted-marker': '#FFAAA6',
      '--dsw-alias-code-diff-added': '#19352B',
      '--dsw-alias-code-diff-deleted': '#42272C',
      '--dsw-alias-tooltip-bg': '#26343B',
      '--dsw-alias-tooltip-key-bg': '#303E46',
      '--dsw-alias-toast-bg': '#26343B',
      '--dsw-alias-toast-label': '#E8EEEF',
      '--dsw-alias-scrollbar-bg-l1': '#71838D',
      '--dsw-alias-scrollbar-bg-l2': '#71838D',
      '--dsw-alias-scrollbar-hover-l1': '#A3AFB5',
      '--dsw-alias-scrollbar-hover-l2': '#A3AFB5',
    };
    const TOKENS = Object.fromEntries(Object.entries(palette).map(([key, value]) =>
      [key, { light: value, dark: value }],
    ));

    // Semantic host selectors only. :has binds them to our overlay's lifetime.
    // Host layouts lacking these semantics still receive the supported tokens.
    const SHELL_CSS = `
      :root:has(.dfu-frame) { color-scheme:dark; --dfu-accent:#00e5a0; --dfu-text:#e8eeef; --dfu-panel:#191f23; --dfu-line:#303a40; }
      :root:has(.dfu-frame) body { background:#111619; color:var(--dfu-text); }
      /* Shiki defines its light/dark variables on body separately from DSH's
         token service; override both appearances at that same element. */
      :root:has(.dfu-frame) body {
        --shiki-foreground:#e8eeef; --shiki-background:#10171b;
        --shiki-token-constant:#8ecbff; --shiki-token-string:#91e6ac;
        --shiki-token-comment:#aabac4; --shiki-token-keyword:#ffb0cf;
        --shiki-token-parameter:#ffd099; --shiki-token-function:#cbb8ff;
        --shiki-token-string-expression:#91e6ac; --shiki-token-punctuation:#cfdadd;
        --shiki-token-link:#8ecbff;
      }
      /* Verified against the installed ConversationRoot CSS module. Fail closed
         on a host class change instead of hiding unrelated headings. */
      :root:has(.dfu-frame) .an3WzG_crumbs { display:none; }
      :root:has(.dfu-frame) :where(.SNx2jG_frame,.SNx2jG_scroller,.SNx2jG_marks,.SNx2jG_mark) {
        background:transparent !important; box-shadow:none !important;
      }
      :root:has(.dfu-frame) .an3WzG_root { isolation:isolate; background:#111619; }
      :root:has(.dfu-frame) .an3WzG_root::before {
        content:""; position:absolute; inset:0; z-index:-1; pointer-events:none;
        background-image:linear-gradient(rgba(17,22,25,var(--dusk-shade,.75)),rgba(17,22,25,var(--dusk-shade,.75))),var(--dusk-image,linear-gradient(135deg,#193a3e,transparent 55%),repeating-linear-gradient(120deg,#182328 0 1px,#111619 1px 90px));
        background-size:cover; background-position:center; filter:blur(var(--dusk-blur,12px));
      }
      :root:has(.dfu-frame) ::selection { background:#00e5a04a; color:#fff; }
      /* The host's light appearance retains light code fills even when alias
         tokens are dark. Override foreground and surface together. */
      :root:has(.dfu-frame) code:not(pre code) {
        background:#26343b !important; color:#e8eeef !important;
        border:1px solid #526068; border-radius:3px; text-shadow:none;
      }
      :root:has(.dfu-frame) code:not(pre code) :where(span,a) {
        color:inherit !important; background:transparent !important;
      }
      :root:has(.dfu-frame) :where(a[href^="https://"],a[href^="http://"]) {
        color:#69edc5; text-decoration-color:#69edc580;
      }
      :root:has(.dfu-frame) pre {
        background:#10171b !important; color:#e8eeef !important; border-color:#303a40;
      }
      :root:has(.dfu-frame) pre code {
        background:transparent !important; color:#e8eeef !important;
      }
      :root:has(.dfu-frame) :where(button,a,input,textarea,[role="textbox"]):focus-visible { outline:2px solid var(--dfu-accent); outline-offset:3px; }
      :root:has(.dfu-frame) :where(aside,nav,[role="navigation"]) { background-color:#0d1215; border-color:var(--dfu-line); }
      :root:has(.dfu-frame) :where(aside,nav,[role="navigation"]) :where(button,a,[role="button"]) { border-radius:3px !important; transition:background-color .15s; }
      :root:has(.dfu-frame) :where(aside,nav,[role="navigation"]) :where(a,button,[role="button"]):hover { background-color:#202a2e; }
      :root:has(.dfu-frame) :where(aside,nav,[role="navigation"]) :where([aria-current="page"],[aria-selected="true"]) { background:#00e5a012 !important; color:var(--dfu-accent) !important; box-shadow:inset 3px 0 0 var(--dfu-accent); border-radius:2px !important; }
      :root:has(.dfu-frame) [role="tablist"] { border-color:var(--dfu-line); }
      :root:has(.dfu-frame) [role="tab"] { border-radius:0 !important; }
      :root:has(.dfu-frame) [role="tab"][aria-selected="true"] { color:var(--dfu-accent) !important; border-color:var(--dfu-accent) !important; box-shadow:inset 0 -2px 0 var(--dfu-accent); background:#00e5a009; }
      :root:has(.dfu-frame) form:has(:where(textarea,[contenteditable="true"][role="textbox"])) { background:var(--dfu-panel) !important; color:var(--dfu-text); border:1px solid #526068 !important; border-radius:4px !important; box-shadow:0 12px 36px #0003 !important; transition:border-color .18s; }
      :root:has(.dfu-frame) form:has(:where(textarea,[contenteditable="true"][role="textbox"])):focus-within { border-color:var(--dfu-accent) !important; }
      :root:has(.dfu-frame) :where(textarea,[contenteditable="true"][role="textbox"]) { color:var(--dfu-text) !important; caret-color:var(--dfu-accent); background-color:transparent !important; }
      :root:has(.dfu-frame) textarea::placeholder { color:#97a5ad !important; opacity:1; }
      :root:has(.dfu-frame) form:has(:where(textarea,[contenteditable="true"][role="textbox"])) button[type="submit"] { border-radius:3px !important; }
      :root:has(.dfu-frame) form:has(:where(textarea,[contenteditable="true"][role="textbox"])) button[type="submit"]:not(:disabled):not([aria-disabled="true"]) { background:var(--dfu-accent) !important; color:#06291f !important; border-color:var(--dfu-accent) !important; }
      :root:has(.dfu-frame) form:has(:where(textarea,[contenteditable="true"][role="textbox"])) button[type="submit"]:disabled { background:#26343b !important; color:#a3afb5 !important; opacity:1 !important; }
      :root:has(.dfu-frame) :where([role="dialog"],[role="menu"]) { background-color:#1c2428; color:var(--dfu-text); border-color:#526068; }
      :root:has(.dfu-frame) :where(button:disabled,button[aria-disabled="true"],[role="button"][aria-disabled="true"]) {
        color:#a3afb5 !important; background:#26343b !important;
        border-color:#526068 !important; opacity:1 !important; cursor:not-allowed;
      }
      :root:has(.dfu-frame) :where(button:disabled,button[aria-disabled="true"],[role="button"][aria-disabled="true"]) :where(span,svg) { color:inherit !important; }
      /* A white icon on the host's coral error badge has low contrast. */
      :root:has(.dfu-frame) .EEnIVa_removeFailed { color:#291619 !important; }
      /* Deliverables and plans use static light fills independently of theme tokens. */
      :root:has(.dfu-frame) .K5rwea_root {
        --deliverable-fill:#1c2428; --deliverable-hover:#26343b;
      }
      :root:has(.dfu-frame) .lLdGaq_card {
        --plan-card-fill:#1c2428; --plan-card-hover:#26343b;
      }
      :root:has(.dfu-frame) :is(.K5rwea_file,.lLdGaq_card) {
        color:#e8eeef; border-color:#526068;
      }
      :root:has(.dfu-frame) :is(.K5rwea_fileIcon,.lLdGaq_cardIcon) {
        background:#26343b; border-color:#526068;
      }
      :root:has(.dfu-frame) :is(.K5rwea_description,.lLdGaq_cardDescription) {
        color:#b9c9ce; font-size:12px; line-height:18px;
      }
      :root:has(.dfu-frame) .K5rwea_description[data-error=true] { color:#ffaaa6; }
      @media(prefers-reduced-motion:reduce) { :root:has(.dfu-frame) :where(button,a,form) { transition:none !important; } }
      .dfu-frame { position:fixed; inset:0; pointer-events:none; z-index:2; }
      .dfu-frame__top { position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#00e5a0 0 72px,#00e5a026 72px,transparent 65%); }
      .dfu-frame__corner { position:absolute; bottom:8px; width:12px; height:3px; background:#b9c9ce; opacity:.35; }
      .dfu-frame__corner--left { left:8px; } .dfu-frame__corner--right { right:8px; }
      @media(max-width:560px) { .dfu-frame__corner { display:none; } }
    `;
    const STRIP_CSS = `
      .dfu-settings { color:#e8eeef; font:12px/1.5 "Segoe UI","Microsoft YaHei",sans-serif; margin:0; flex-shrink:0; min-width:max-content; }
      .dfu-settings summary { cursor:pointer; width:max-content; white-space:nowrap; padding:5px 8px; color:#b7c9cf; }
      .dfu-settings__panel { position:absolute; bottom:calc(100% + 8px); left:0; z-index:10; width:min(560px,calc(100vw - 32px)); max-width:100%; box-sizing:border-box; max-height: min(360px,60vh); overflow-y:auto; display:flex; flex-wrap:wrap; align-items:center; gap:12px; padding:12px; background:#191f23; border:1px solid #526068; border-radius:4px; box-shadow:0 8px 28px #0005; }
      .dfu-settings:not([open]) > .dfu-settings__panel { display:none; }
      .dfu-settings button { background:#26343b; color:#e8eeef; border:1px solid #526068; border-radius:3px; padding:6px 10px; cursor:pointer; font:inherit; }
      .dfu-settings button:disabled { opacity:.6; cursor:wait; }
      .dfu-settings label { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
      .dfu-settings input[type=range] { width:110px; accent-color:#00e5a0; }
      .dfu-settings small { flex-basis:100%; color:#b7c9cf; }
      .dfu-settings output { font-variant-numeric:tabular-nums; min-width:34px; }
      .dfu-strip { position:relative; display:flex; align-items:center; gap:12px; width:100%; min-width:0; box-sizing:border-box; align-self:stretch; margin:8px 0 0; padding:0 12px; height:32px; user-select:none; background:#151c20; border:1px solid #303a40; border-left:2px solid #00e5a0; color:#a3afb5; font:11px/1.2 "Bahnschrift","Segoe UI","Microsoft YaHei",sans-serif; letter-spacing:.06em; }
      .dfu-strip__spacer { flex:1; }
      .dfu-strip__time-label { white-space:nowrap; color:#a3afb5; }
      .dfu-strip__clock { white-space:nowrap; font-variant-numeric:tabular-nums; color:#e8eeef; font-family:"Bahnschrift",ui-monospace,monospace; letter-spacing:.08em; }
      .dfu-strip__end { width:20px; height:10px; flex:0 0 auto; opacity:.45; background:repeating-linear-gradient(120deg,transparent 0 3px,#85989f 3px 4px,transparent 4px 7px); }
      @media(max-width:640px) { .dfu-strip__end { display:none; } }
      @media(max-width:360px) { .dfu-strip { gap:8px; padding:0 8px; } .dfu-strip__time-label { display:none; } }
    `;
    const MARK_CSS = `
      .dfu-mark { display:flex; align-items:center; justify-content:center; color:#00e5a0; }
      .dfu-mark>svg { display:block; width:100%; height:100%; }
      @media(prefers-reduced-motion:no-preference) { .dfu-mark { animation:dfu-arrive .3s ease-out both; } }
      @keyframes dfu-arrive { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
    `;
    const Style = React.memo(function Style({ css }) { return h('style', { dangerouslySetInnerHTML:{ __html:css } }); });
    function Emblem({ className }) {
      return h('svg', { className, viewBox:'0 0 64 64', fill:'none', focusable:'false', 'aria-hidden':'true' },
        h('path', { d:'M10 18h21l23 28H33z', stroke:'currentColor', strokeWidth:3 }),
        h('path', { d:'M10 46h15M39 18h15M7 55h50', stroke:'currentColor', strokeWidth:2 }),
      );
    }
    function HudFrame() {
      const [settings] = useWallpaper();
      const imageCSS = React.useMemo(() => ':root:has(.dfu-frame) { --dusk-image:' + (settings.image ? 'url("' + settings.image + '")' : 'linear-gradient(135deg,#193a3e,transparent 55%),repeating-linear-gradient(120deg,#182328 0 1px,#111619 1px 90px)') + '; }', [settings.image]);
      const parameterCSS = ':root:has(.dfu-frame) { --dusk-blur:' + settings.blur + 'px; --dusk-shade:' + settings.shade / 100 + '; }';
      return h(React.Fragment, null, h(Style, { css:SHELL_CSS }), h(Style, { css:imageCSS }), h(Style, { css:parameterCSS }),
        h('div', { className:'dfu-frame', 'aria-hidden':'true' },
          h('span', { className:'dfu-frame__top' }),
          h('span', { className:'dfu-frame__corner dfu-frame__corner--left' }),
          h('span', { className:'dfu-frame__corner dfu-frame__corner--right' }),
        ),
      );
    }
    function WallpaperSettings({ t }) {
      const [settings, save, setDraft] = useWallpaper();
      const [message, setMessage] = useState('');
      const [busy, setBusy] = useState(false);
      const input = useRef(null);
      const details = useRef(null);
      const generation = useRef(0);
      const pending = useRef(null);
      const frame = useRef(null);
      useEffect(() => {
        const outside = event => {
          if (details.current?.open && !details.current.contains(event.target)) {
            commit();
            details.current.open = false;
          }
        };
        const escape = event => {
          if (event.key === 'Escape' && details.current?.open) {
            commit();
            details.current.open = false;
            details.current.querySelector('summary')?.focus();
          }
        };
        document.addEventListener('pointerdown', outside, true);
        document.addEventListener('keydown', escape);
        return () => {
          document.removeEventListener('pointerdown', outside, true);
          document.removeEventListener('keydown', escape);
        };
      }, []);
      useEffect(() => () => { generation.current++; if (frame.current !== null) cancelAnimationFrame(frame.current); }, []);
      function update(next) {
        try { save(next); setMessage(t('saved')); }
        catch {
          const previous = readSettings();
          setDraft(previous);
          window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: previous }));
          setMessage(t('failed'));
        }
      }
      function preview(key, value) {
        const next = { ...(pending.current || settings), [key]: Number(value) };
        pending.current = next;
        setDraft(next);
        setMessage('');
        // At most one background repaint per frame; no storage I/O while dragging.
        if (frame.current === null) frame.current = requestAnimationFrame(() => {
          frame.current = null;
          if (pending.current) window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: pending.current }));
        });
      }
      function commit() {
        if (!pending.current) return;
        if (frame.current !== null) { cancelAnimationFrame(frame.current); frame.current = null; }
        const next = pending.current;
        pending.current = null;
        update(next);
      }
      async function choose(event) {
        const file = event.target.files?.[0]; event.target.value = '';
        if (!file) return;
        if (!['image/png','image/jpeg','image/webp'].includes(file.type) || file.size > 20 * 1024 * 1024) { setMessage(t('invalid')); return; }
        const current = ++generation.current;
        setBusy(true); setMessage(t('loading'));
        let url;
        try {
          url = URL.createObjectURL(file);
          const img = new Image(); img.src = url; await img.decode();
          const scale = Math.min(1,1600 / Math.max(img.naturalWidth,img.naturalHeight));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1,Math.round(img.naturalWidth * scale)); canvas.height = Math.max(1,Math.round(img.naturalHeight * scale));
          const context = canvas.getContext('2d');
          if (!context) throw new Error('Canvas unavailable');
          context.fillStyle = '#111619'; context.fillRect(0,0,canvas.width,canvas.height); context.drawImage(img,0,0,canvas.width,canvas.height);
          if (current === generation.current) update({ ...readSettings(), image:canvas.toDataURL('image/jpeg',.82) });
        } catch { if (current === generation.current) setMessage(t('failed')); }
        finally { if (url) URL.revokeObjectURL(url); if (current === generation.current) setBusy(false); }
      }
      return h('details', { className:'dfu-settings', ref:details },
        h('summary', null, t('settings')),
        h('div', { className:'dfu-settings__panel' },
          h('input', { ref:input, type:'file', accept:'image/png,image/jpeg,image/webp', hidden:true, onChange:choose }),
          h('button', { type:'button', disabled:busy, onClick:() => input.current?.click() }, t('choose')),
          ...[['blur',0,30,'px'],['shade',55,95,'%']].map(([key,min,max,unit]) => h('label', { key }, t(key),
            h('input', { type:'range', min,max,step:1,value:settings[key], onPointerDown:event => event.currentTarget.setPointerCapture(event.pointerId), onChange:event => preview(key,event.target.value), onPointerUp:commit, onPointerCancel:commit, onLostPointerCapture:commit, onKeyUp:commit, onBlur:commit }),
            h('output', null, settings[key] + unit))),
          h('button', { type:'button', disabled:busy, onClick:() => update({ ...DEFAULTS }) }, t('reset')),
          h('small', null, t('local')),
          h('small', { role:'status' }, message),
        ),
      );
    }
    function ComposerStrip({ t }) {
      const [now, setNow] = useState(() => new Date());
      useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
      }, []);
      const clock = [now.getHours(),now.getMinutes(),now.getSeconds()].map(n => String(n).padStart(2,'0')).join(':');
      return h(React.Fragment, null, h(Style, { css:STRIP_CSS }),
        h('div', { className:'dfu-strip' },
          h(WallpaperSettings, { t }),
          h('span', { className:'dfu-strip__spacer', 'aria-hidden':'true' }),
          h('span', { className:'dfu-strip__time-label' }, t('time')),
          h('time', { className:'dfu-strip__clock', dateTime:now.toISOString(), 'aria-live':'off' }, clock),
          h('span', { className:'dfu-strip__end', 'aria-hidden':'true' }),
        ),
      );
    }
    function HeroMark({ size, className, t }) {
      const edge = typeof size === 'number' && Number.isFinite(size) && size > 0 ? size : 64;
      return h('div', { className:['dfu-mark',className].filter(Boolean).join(' '),
        style:{ width:edge, height:edge }, role:'img', 'aria-label':t('mark') },
        h(Style, { css:MARK_CSS }), h(Emblem, {}),
      );
    }
    function apply(ctx) {
      ctx.effect(() => ctx.theme.overrideTokens(PACKAGE_ID,TOKENS), 'delta-force-ui: palette layer');
      ctx.effect(() => ctx.locale.register(NS,DICT), 'delta-force-ui: dictionary');
      const t = ctx.locale.bind(NS);
      ctx.slots.inject('shell.overlay', () => ctx.slots.register(
        { name:'shell.overlay', id:'delta-force-ui.frame', order:0 }, HudFrame,
      ));
      ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register(
        { name:'conversation.composer.dock', id:'delta-force-ui.console', order:-10 },
        function DeltaConsole() { return h(ComposerStrip, { t }); },
      ));
      ctx.slots.inject('conversation.hero.brand.mark', () => ctx.slots.register(
        { name:'conversation.hero.brand.mark' },
        function DeltaHeroMark(props) { return h(HeroMark,Object.assign({},props,{ t })); },
      ));
    }
    return { inject:['slots','theme','locale'], apply };
  },
});
