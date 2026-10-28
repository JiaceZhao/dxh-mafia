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
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    document.querySelectorAll('.editorial-photo, .editorial-thought, .mission-grid > *, .section-heading, .pact-grid article, .pact-footer, .directory-heading, .directory-person, .closing-row').forEach(element => {
      element.classList.add('reveal', 'is-pending');
      observer.observe(element);
    });
  }
  let saved = 'zh';
  try { saved = localStorage.getItem(key) || 'zh'; } catch {}
  changeLanguage(saved, false);
  document.querySelectorAll('[data-locale]').forEach(button => button.addEventListener('click', () => changeLanguage(button.dataset.locale, true)));
})();
