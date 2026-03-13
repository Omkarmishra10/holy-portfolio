/* shared.js — injects nav, handles theme toggle, smooth scroll */

(function(){

  /* ── THEME ── */
  const stored = localStorage.getItem('hh-theme') || 'light';
  document.documentElement.setAttribute('data-theme', stored);

  function toggleTheme(){
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('hh-theme', next);
    updateToggleLabel();
  }

  function updateToggleLabel(){
    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    const cur = document.documentElement.getAttribute('data-theme');
    btn.innerHTML = cur === 'dark'
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  /* ── NAV HTML ── */
  function buildNav(activePage){
    const pages = ['Work','About'];
    const links = pages.map(p=>{
      const href = p === 'Work' ? 'work.html' : 'index.html#about';
      const active = activePage === p ? ' nav-active' : '';
      return `<a href="${href}" class="nav-link${active}">${p}</a>`;
    }).join('');

    return `
    <header class="site-header" id="siteHeader">
      <div class="container nav-inner">
        <a href="index.html" class="logo">HOLYHUMANE</a>
        <nav class="nav-links">${links}</nav>
        <div class="nav-right">
          <button id="themeToggle" class="theme-btn" onclick="window.__toggleTheme()"></button>
          <a href="index.html#contact" class="nav-cta">Contact</a>
        </div>
      </div>
    </header>`;
  }

  /* ── INJECT NAV ── */
  window.addEventListener('DOMContentLoaded', ()=>{
    const placeholder = document.getElementById('nav-placeholder');
    if(placeholder){
      const page = placeholder.dataset.page || '';
      placeholder.outerHTML = buildNav(page);
    }

    // wire toggle
    updateToggleLabel();
    window.__toggleTheme = toggleTheme;

    // nav scroll shrink
    const header = document.getElementById('siteHeader');
    if(header){
      window.addEventListener('scroll',()=>{
        header.classList.toggle('shrunk', window.scrollY > 50);
      });
    }

    // smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        const id = a.getAttribute('href');
        if(!id || id==='#') return;
        const t = document.querySelector(id);
        if(!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior:'smooth', block:'start' });
      });
    });
  });

})();
