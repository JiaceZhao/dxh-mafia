(() => {
  'use strict';
  const key = 'dxh-public-language';
  function changeLanguage(language, persist) {
    const lang = language === 'en' ? 'en' : 'zh';
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = document.body.dataset.page === 'people' ? (lang === 'zh' ? '成员 — DXH Mafia' : 'People — DXH Mafia') : (lang === 'zh' ? 'DXH Mafia — 稻香湖 Fellowship' : 'DXH Mafia — Stay close. Go far.');
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
      element.textContent = element.getAttribute('data-' + lang).replace(/\\n/g, '\n');
    });
    document.querySelectorAll('[data-locale]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.locale === lang)));
    if (persist) { try { localStorage.setItem(key, lang); } catch {} }
  }
  document.querySelectorAll('.profile-trigger').forEach(trigger => {
    const dialog = document.getElementById(trigger.getAttribute('aria-controls'));
    trigger.addEventListener('click', () => {
      dialog.showModal();
      document.body.classList.add('profile-open');
    });
    dialog.querySelector('.profile-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('profile-open');
      trigger.focus({preventScroll: true});
    });
  });
  let saved = 'zh';
  try { saved = localStorage.getItem(key) || 'zh'; } catch {}
  changeLanguage(saved, false);
  document.querySelectorAll('[data-locale]').forEach(button => button.addEventListener('click', () => changeLanguage(button.dataset.locale, true)));
})();
