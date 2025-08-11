
// === Fondo dinámico que sigue el ratón ===
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100 + '%';
  const y = (e.clientY / window.innerHeight) * 100 + '%';
  document.documentElement.style.setProperty('--mx', x);
  document.documentElement.style.setProperty('--my', y);
});

// === Crear partículas flotantes ===
const particlesContainer = document.getElementById('particles');
for(let i = 0; i < 20; i++){
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 20 + 's';
  particle.style.animationDuration = (15 + Math.random() * 10) + 's';
  particlesContainer.appendChild(particle);
}

// === Utilidades ===
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
function el(tag, cls){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  return e;
}


// === Carga y render de proyectos ===
async function loadProjects(){
    try {
        const res = await fetch('./projects.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) PROJECTS = data;
    } catch (e) {
        console.error('projects.json error:', e);
    } finally {
        renderProjects(PROJECTS);
    }
}



function renderProjects(items){
  const grid = document.getElementById('project-grid');
  grid.innerHTML = '';

  items.forEach((p, idx) => {
    const card = el('article', 'card');
    card.dataset.index = idx;
    card.style.animationDelay = `${idx * 0.1}s`;

    const h3 = el('h3');
    h3.textContent = p.title;
    card.appendChild(h3);

    const desc = el('p');
    desc.textContent = p.summary || '';
    card.appendChild(desc);

    if(Array.isArray(p.images) && p.images.length){
      const car = el('div', 'carousel');
      p.images.forEach((src, i) => {
        const img = new Image();
        img.src = src;
        img.alt = p.title + ' — image ' + (i + 1);
        img.loading = 'lazy';
        img.decoding = 'async';
        img.addEventListener('click', () => openLightbox(p.images, i, p.title));
        car.appendChild(img);
      });
      card.appendChild(car);
    }

    if(Array.isArray(p.tech)){
      const wrap = el('div');
      p.tech.forEach(t => {
        const tag = el('span', 'tag');
        tag.textContent = t;
        wrap.appendChild(tag);
      });
      card.appendChild(wrap);
    }

    if(Array.isArray(p.kpis)){
      const kpis = el('div', 'kpis');
      p.kpis.forEach(k => {
        const b = el('span', 'kpi');
        b.textContent = k;
        kpis.appendChild(b);
      });
      card.appendChild(kpis);
    }

    const links = p.links || {};
    const anyLink = links.android || links.ios || links.demo || links.repo;
    if(anyLink){
      const actions = el('div', 'actions');
      actions.style.marginTop = '1rem';

      if(links.android){
        const a = el('a', 'btn primary');
        a.href = links.android;
        a.target = '_blank';
        a.rel = 'noreferrer';
        a.textContent = 'GOOGLE PLAY';
        actions.appendChild(a);
      }
      if(links.ios){
        const a = el('a', 'btn');
        a.href = links.ios;
        a.target = '_blank';
        a.rel = 'noreferrer';
        a.textContent = 'APP STORE';
        actions.appendChild(a);
      }
      if(links.demo){
        const a = el('a', 'btn');
        a.href = links.demo;
        a.target = '_blank';
        a.rel = 'noreferrer';
        a.textContent = 'LIVE DEMO';
        actions.appendChild(a);
      }
      if(links.repo){
        const a = el('a', 'btn');
        a.href = links.repo;
        a.target = '_blank';
        a.rel = 'noreferrer';
        a.textContent = 'REPO';
        actions.appendChild(a);
      }
      card.appendChild(actions);
    }

    grid.appendChild(card);
  });
}

// === Búsqueda y filtros ===
const searchInput = document.getElementById('search');
searchInput?.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  const filtered = PROJECTS.filter(p =>
    (p.title || '').toLowerCase().includes(q) ||
    (p.tech || []).join(' ').toLowerCase().includes(q)
  );
  renderProjects(filtered);
});

$$('.chip').forEach(btn => btn.addEventListener('click', () => {

  $$('.chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const key = btn.dataset.filter;
  if(key === 'all') return renderProjects(PROJECTS);
  const filtered = PROJECTS.filter(p => (p.category || '').toLowerCase().includes(key));
  renderProjects(filtered);
}));

// === Lightbox ===
const lb = $('#lightbox');
const lbImg = $('#lb-img');
const lbPrev = $('#lb-prev');
const lbNext = $('#lb-next');
const lbClose = $('#lb-close');
const lbCounter = $('#lb-counter');
let album = [];
let index = 0;
let albumTitle = '';

function openLightbox(images, startIndex = 0, title = ''){
  album = images;
  index = startIndex;
  albumTitle = title || '';
  updateLightbox();
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateLightbox(){
  if(!album.length) return;
  lbImg.src = album[index];
  lbImg.alt = albumTitle + ' — image ' + (index + 1);
  lbCounter.textContent = (index + 1) + '/' + album.length;
}

function closeLightbox(){
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

lbPrev?.addEventListener('click', () => {
  index = (index - 1 + album.length) % album.length;
  updateLightbox();
});

lbNext?.addEventListener('click', () => {
  index = (index + 1) % album.length;
  updateLightbox();
});

lbClose?.addEventListener('click', closeLightbox);

lb?.addEventListener('click', (e) => {
  if(e.target === lb) closeLightbox();
});

window.addEventListener('keydown', (e) => {
  if(!lb.classList.contains('open')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowRight') {
    index = (index + 1) % album.length;
    updateLightbox();
  }
  if(e.key === 'ArrowLeft') {
    index = (index - 1 + album.length) % album.length;
    updateLightbox();
  }
});

// === Copiar email con efecto ===
$('#email-btn')?.addEventListener('click', (e) => {
  const toCopy = e.currentTarget.getAttribute('data-copy');
  if(navigator.clipboard && toCopy){
    e.preventDefault();
    navigator.clipboard.writeText(toCopy).then(() => {
      const old = e.currentTarget.textContent;
      e.currentTarget.textContent = 'COPIED ✓';
      e.currentTarget.style.background = 'var(--primary)';
      e.currentTarget.style.color = 'var(--bg)';
      setTimeout(() => {
        e.currentTarget.textContent = old;
        e.currentTarget.style.background = '';
        e.currentTarget.style.color = '';
      }, 1500);
      // Abrir cliente de correo tras copiar
      setTimeout(() => {
        window.location.href = 'mailto:' + toCopy;
      }, 500);
    });
  }
});

// === Efecto de typing en el título ===
const titleText = "Pablo Fernandez";
const h1 = document.getElementById('main-title');
if(h1){
  let charIndex = 0;
  const typeWriter = () => {
    if(charIndex < titleText.length){
      h1.textContent += titleText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    }
  };
  setTimeout(typeWriter, 500);
}

// === Año actual ===
document.getElementById('year').textContent = new Date().getFullYear();

// === Efecto parallax en scroll ===
let ticking = false;
function updateParallax(){
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.scan-lines');
  if(parallax){
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if(!ticking){
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// === Cargar proyectos ===
loadProjects();
