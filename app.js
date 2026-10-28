(() => {
  'use strict';
  const key = 'dxh-public-language';
  function changeLanguage(language, persist) {
    const lang = language === 'en' ? 'en' : 'zh';
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = lang === 'zh' ? 'DXH Mafia — 稻香湖 Fellowship' : 'DXH Mafia — Stay close. Go far.';
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
      element.textContent = element.getAttribute('data-' + lang).replace(/\\n/g, '\n');
    });
    document.querySelectorAll('[data-locale]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.locale === lang)));
    if (persist) { try { localStorage.setItem(key, lang); } catch {} }
  }
  let saved = 'zh';
  try { saved = localStorage.getItem(key) || 'zh'; } catch {}
  changeLanguage(saved, false);
  document.querySelectorAll('[data-locale]').forEach(button => button.addEventListener('click', () => changeLanguage(button.dataset.locale, true)));
})();
