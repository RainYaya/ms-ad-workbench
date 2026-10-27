
// Injected into every mock screen in the static snapshot. Read-only: clicks
// select, they never submit.
(function () {
  const SEL = 'input, select, textarea, button, a';
  let current = null;
  function selectorOf(el) {
    if (el.id && !el.id.includes('${')) return '#' + el.id;
    const name = el.getAttribute('name');
    if (name && !name.includes('${')) return '[name="' + name + '"]';
    const parts = [];
    let n = el;
    while (n && n.nodeType === 1 && parts.length < 6) {
      let p = n.tagName.toLowerCase();
      if (n.id && !n.id.includes('${')) { parts.unshift('#' + n.id); break; }
      const sib = n.parentElement ? [...n.parentElement.children].filter((c) => c.tagName === n.tagName) : [];
      if (sib.length > 1) p += ':nth-of-type(' + (sib.indexOf(n) + 1) + ')';
      parts.unshift(p);
      n = n.parentElement;
    }
    return parts.join(' > ');
  }
  function labelOf(el) {
    const cell = el.closest('div');
    let prev = cell && cell.previousElementSibling;
    while (prev && !/field_title/.test(prev.className || '')) prev = prev.previousElementSibling;
    if (prev) return (prev.textContent || '').replace(/\s+/g, ' ').trim();
    const next = el.nextElementSibling;
    if (next && next.tagName === 'LABEL') return (next.textContent || '').trim();
    if (el.value && /^(submit|button|reset)$/i.test(el.type || '')) return el.value.trim();
    return (el.getAttribute('title') || '').trim();
  }
  function info(el) {
    return { selector: selectorOf(el), id: el.id || null, name: el.getAttribute('name'),
      kind: (el.tagName === 'INPUT' ? (el.type || 'text') : el.tagName.toLowerCase()),
      label: labelOf(el), text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60) };
  }
  function mark(el) {
    if (current === el) return;
    if (current) { current.style.outline = current.dataset.rpaOutline || ''; current.style.outlineOffset = current.dataset.rpaOffset || ''; }
    current = el;
    if (!el) return;
    if (el.dataset.rpaOutline === undefined) {
      el.dataset.rpaOutline = el.style.outline || '';
      el.dataset.rpaOffset = el.style.outlineOffset || '';
    }
    el.style.outline = '2px solid #46b8a8';
    el.style.outlineOffset = '1px';
  }
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest?.(SEL);
    if (el) { mark(el); parent.postMessage({ source: 'rpa-picker', type: 'hover', ...info(el) }, '*'); }
  }, true);
  document.addEventListener('click', (e) => {
    const el = e.target.closest?.(SEL);
    if (!el) return;
    e.preventDefault(); e.stopPropagation();
    mark(el);
    parent.postMessage({ source: 'rpa-picker', type: 'pick', ...info(el) }, '*');
  }, true);
  document.addEventListener('submit', (e) => e.preventDefault(), true);
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.source !== 'rpa-studio') return;
    if (d.type === 'highlight') {
      let el = null;
      try { el = d.selector ? document.querySelector(d.selector) : null; } catch { el = null; }
      mark(el || null);
      if (el && el.scrollIntoView) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    if (d.type === 'clear') mark(null);
  });
})();
