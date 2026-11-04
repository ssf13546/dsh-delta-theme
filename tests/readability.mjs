import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');
let definition, tokens;
vm.runInNewContext(source, { window: { __ModuleLoader__: { load: value => definition = value } } });
definition.factory(() => ({ memo: fn => fn })).apply({
  effect: fn => fn(), theme: { overrideTokens: (_, value) => tokens = value },
  locale: { register() {}, bind: () => key => key }, slots: { inject() {} },
});
const luminance = hex => {
  const rgb = hex.replace('#', '').match(/../g).map(n => parseInt(n,16) / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
};
const ratio = (fg,bg) => {const a=luminance(fg),b=luminance(bg); return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
const pairs = [
  ['message', 'label-primary', 'specific-bubble'],
  ['file name', 'label-primary', 'specific-input-major'],
  ['file metadata', 'label-tertiary', 'specific-input-major'],
  ['file remove', 'label-primary-inverted', 'button-contrast-fill'],
  ['dialog', 'label-primary', 'bg-overlay'],
  ['menu secondary', 'label-secondary', 'specific-menu'],
  ['disabled button', 'label-dimmed', 'specific-bubble'],
  ['primary button', 'label-primary-inverted', 'brand-primary'],
  ['primary hover', 'label-primary-inverted', 'button-primary-hover'],
  ['inline code', 'label-primary', 'markdown-inline-code'],
  ['code banner', 'label-secondary', 'markdown-code-block-banner'],
  ['added file diff', 'label-primary', 'file-diff-added-bg'],
  ['deleted file diff', 'label-primary', 'file-diff-deleted-bg'],
  ['warning', 'state-warn-label', 'state-warn-tertiary'],
  ['success', 'state-success-secondary', 'state-success-tertiary'],
];
const key = suffix => '--dsw-' + (suffix.startsWith('specific-') ? '' : 'alias-') + suffix;
let min=Infinity;
for(const mode of ['light','dark']) for(const [name,fg,bg] of pairs) {
  const contrast=ratio(tokens[key(fg)][mode],tokens[key(bg)][mode]);
  assert.ok(contrast >= 4.5, `${mode} ${name}: ${contrast.toFixed(2)}:1`); min=Math.min(min,contrast);
}
const syntax=[...source.matchAll(/--shiki-token-[\w-]+:(#[0-9a-f]{6})/g)];
assert.equal(syntax.length,9);
for(const [,fg] of syntax) assert.ok(ratio(fg,'#10171b') >= 4.5, `Syntax ${fg}`);
assert.ok(ratio('#291619','#ff7976') >= 4.5);
console.log(`PASS: ${pairs.length * 2} token pairs across both appearances; minimum ${min.toFixed(2)}:1. Nine syntax colors and failed-file remove icon pass 4.5:1.`);
