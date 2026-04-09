(function () {
  const t = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
})();

document.addEventListener('DOMContentLoaded', function () {

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = `
      <svg id="icon-moon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
      <svg id="icon-sun"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display:none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    `;
    const moon = document.getElementById('icon-moon');
    const sun  = document.getElementById('icon-sun');

    function updateIcon() {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      moon.style.display = dark ? 'none' : 'block';
      sun.style.display  = dark ? 'block' : 'none';
    }
    updateIcon();

    btn.addEventListener('click', () => {
      const cur  = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon();
    });
  }

  /* Active nav link */
  const path = window.location.pathname;
  document.querySelectorAll('.nav-center a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === 'index.html' || href === './') {
      if (path === '/' || path.endsWith('/index.html') || path.endsWith('/')) a.classList.add('active');
    } else if (path.includes(href.replace('.html', ''))) {
      a.classList.add('active');
    }
  });

  /* Portfolio filter */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card[data-cat]');
  if (filterBtns.length) {
    filterBtns.forEach(b => {
      b.addEventListener('click', () => {
        filterBtns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const f = b.dataset.filter;
        cards.forEach(c => {
          c.classList.toggle('hidden', f !== 'all' && !c.dataset.cat.split(' ').includes(f));
        });
      });
    });
  }

});
