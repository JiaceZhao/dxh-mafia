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
    document.querySelectorAll('.pact-intro, .support-copy, .support-art, .circle-note, .invitation, .builders-collage, .editorial-photo, .editorial-thought, .mission-grid > *, .section-heading, .pact-grid article, .pact-footer, .directory-heading, .directory-person, .closing-row').forEach(element => {
      element.classList.add('reveal', 'is-pending');
      observer.observe(element);
    });
  }
  const application = document.getElementById('application-dialog');
  const form = document.getElementById('application-form');
  const status = document.getElementById('application-status');
  const draftKey = 'dxh-application-draft-v1';
  let opener;
  function report(zh, en) {
    status.dataset.zh = zh;
    status.dataset.en = en;
    status.textContent = document.documentElement.lang === 'en' ? en : zh;
  }
  try {
    const draft = JSON.parse(localStorage.getItem(draftKey) || 'null');
    if (draft && typeof draft === 'object') {
      Array.from(form.elements).forEach(field => {
        if (field.name && typeof draft[field.name] === 'string') field.value = draft[field.name];
      });
      report('已恢复本机草稿，尚未提交。', 'Draft restored from this device. Not submitted.');
    }
  } catch {}
  document.querySelectorAll('[data-apply]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    application.showModal();
    application.scrollTop = 0;
    document.body.classList.add('application-open');
  }));
  application.querySelector('.application-close').addEventListener('click', () => application.close());
  application.addEventListener('close', () => {
    document.body.classList.remove('application-open');
    if (opener) opener.focus({preventScroll: true});
  });
  document.getElementById('save-draft').addEventListener('click', () => {
    try {
      localStorage.setItem(draftKey, JSON.stringify(Object.fromEntries(new FormData(form))));
      report('草稿已保存在这台设备，尚未提交。', 'Draft saved on this device. Not submitted.');
    } catch {
      report('无法保存到本机。请导出申请文件保留内容。', 'Unable to save here. Export your application to keep a copy.');
    }
  });
  document.getElementById('clear-draft').addEventListener('click', () => {
    form.reset();
    try { localStorage.removeItem(draftKey); } catch {}
    report('已清空表单及本机草稿。', 'Form and saved draft cleared.');
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = Array.from(form.querySelectorAll('input, textarea'));
    if (!fields.filter(field => field.required).every(field => field.value.trim())) {
      report('请填写所有必填问题。', 'Please complete all required questions.');
      return;
    }
    const text = ['DXH Mafia — Application / 申请', 'Prepared locally. Not submitted. / 本地填写，尚未提交。', '', ...fields.map(field => field.closest('label').querySelector('span').textContent + '\n' + (field.value.trim() || '—') + '\n')].join('\n');
    const url = URL.createObjectURL(new Blob([text], {type: 'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'DXH-Mafia-Application.txt';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    report('申请文件已生成。尚未提交；请将文件通过你已有的联系方式发给 Jiace。', 'Application file generated. Not submitted; send it to Jiace through your existing contact.');
  });
  let saved = 'zh';
  try { saved = localStorage.getItem(key) || 'zh'; } catch {}
  changeLanguage(saved, false);
  document.querySelectorAll('[data-locale]').forEach(button => button.addEventListener('click', () => changeLanguage(button.dataset.locale, true)));
})();
