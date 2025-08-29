// ==========================
// CONFIGURACIÓN GLOBAL
// ==========================
const SITE = {
  name: 'Assa AppHub Premium',
  youtubePrincipal: 'https://www.youtube.com/@AssaAR10',
  youtubeSecundario: 'https://www.youtube.com/@AssaApps',
  downloadEndpoint: null,
  unlockSeconds: 20,
};

document.addEventListener("DOMContentLoaded", () => {
  const yt = document.getElementById('ytLinkTop');
  if (yt) yt.href = SITE.youtubePrincipal;
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

/* ============================================================
   ⭐ Destacados del mes — Carrusel estilo card (drop-in)
   - Enlaces: siempre al detalle "#/app/slug" para UX consistente
   - Autoplay con pausa inteligente (hover/touch/focus/visibility)
   ============================================================ */

// 1) Slugs destacados (del catálogo APPS)
const FEATURED_SLUGS = [
  'after-effects-2025',
  'windows-x-lite-11',
  'tele-latino-tv',
  'spotify-mod-9-0-72-967',
  'dark-play-1-0',
  'minecraft-1-21-100-6'
];

// 2) Autoplay
const FEATURED_AUTOPLAY_MS = 4500;
let __featTimer = null;

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function stopFeaturedAutoplay() {
  if (__featTimer) { clearInterval(__featTimer); __featTimer = null; }
}
function startFeaturedAutoplay(wrap = document) {
  stopFeaturedAutoplay();
  const slider = wrap.querySelector('#featured .slider');
  if (!slider) return;
  if (slider.children.length < 2 || prefersReducedMotion()) return;
  __featTimer = setInterval(() => { wrap.__featNext?.(); }, FEATURED_AUTOPLAY_MS);
}
function restartFeaturedAutoplay(wrap = document) {
  stopFeaturedAutoplay();
  setTimeout(() => startFeaturedAutoplay(wrap), 600);
}

// 3) Utilidades carrusel
function isExternal(href) { return /^https?:\/\//i.test(href); }

// 4) Fuente de datos del carrusel
function featuredItemsFrom(APPS) {
  if (!Array.isArray(APPS)) return [];
  const set = new Set(FEATURED_SLUGS);
  return APPS.filter(a => a && set.has(a.slug));
}

// 5) Render carrusel (siempre linkea al detalle)
function renderFeaturedInto(root = document) {
  try {
    const doc = root.getElementById ? root : document;
    const slider = doc.querySelector('#featured .slider');
    if (!slider) return;

    const items = featuredItemsFrom(window.APPS || []);
    slider.innerHTML = items.map(app => {
      const href = `#/app/${app.slug}`;
      const cover = app.cover || app.image || '';
      const parts = [];
      if (app.platform) parts.push(app.platform);
      if (app.version)  parts.push(`v${app.version}`);
      if (app.size)     parts.push(app.size);

      return `
        <li class="item" style="background-image:url('${cover}')">
          <a class="item-link" href="${href}" target="_self" aria-label="${app.title}"></a>
          <div class="content">
            <h3 class="title">${app.title || ''}</h3>
            <p class="description">${parts.join(' · ')}</p>
            <span class="cta" aria-hidden="true">Ver detalles →</span>
          </div>
        </li>
      `.trim();
    }).join('');

    bindFeaturedControls(doc);
    bindFeaturedKeys(doc);
    const sliderEl = doc.querySelector('#featured .slider');
    if (sliderEl) {
      bindFeaturedSwipe(sliderEl, doc);

      // Fallback: click en cualquier parte del item abre su <a>
      sliderEl.addEventListener('click', (e) => {
        const aClicked = e.target.closest('a');
        if (aClicked) return;
        const item = e.target.closest('#featured .item');
        if (!item) return;
        const a = item.querySelector('a.item-link');
        if (!a) return;
        if (a.target === '_blank') window.open(a.href, '_blank', 'noopener');
        else window.location.href = a.href;
      });
    }

    // Autoplay + pausas
    startFeaturedAutoplay(doc);
    const featuredWrap = doc.querySelector('#featured');
    if (featuredWrap) {
      featuredWrap.addEventListener('mouseenter', () => stopFeaturedAutoplay());
      featuredWrap.addEventListener('mouseleave', () => startFeaturedAutoplay(doc));
      featuredWrap.addEventListener('focusin',   () => stopFeaturedAutoplay());
      featuredWrap.addEventListener('focusout',  () => startFeaturedAutoplay(doc));
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopFeaturedAutoplay();
      else startFeaturedAutoplay(doc);
    });
  } catch (err) { console.error('renderFeaturedInto error:', err); }
}

// 6) Controles (flechas)
function bindFeaturedControls(doc = document) {
  const slider = doc.querySelector('#featured .slider');
  const prev = doc.querySelector('#featured .nav .prev');
  const next = doc.querySelector('#featured .nav .next');
  if (!slider) return;

  const goNext = () => {
    if (slider.children.length > 0) {
      slider.appendChild(slider.firstElementChild);
      restartFeaturedAutoplay(doc);
    }
  };
  const goPrev = () => {
    if (slider.children.length > 0) {
      slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
      restartFeaturedAutoplay(doc);
    }
  };

  prev?.addEventListener('click', goPrev);
  next?.addEventListener('click', goNext);

  // Exponer para teclado / swipe / autoplay
  doc.__featPrev = goPrev;
  doc.__featNext = goNext;
}

// 7) Teclado
function bindFeaturedKeys(doc = document) {
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { doc.__featNext?.(); }
    else if (e.key === 'ArrowLeft') { doc.__featPrev?.(); }
  };
  document.addEventListener('keydown', onKey);
}

// 8) Swipe / Drag
function bindFeaturedSwipe(slider, doc = document) {
  let startX = 0, dx = 0, touching = false;
  const start = (e) => { touching = true; stopFeaturedAutoplay(); startX = (e.touches ? e.touches[0].clientX : e.clientX); dx = 0; };
  const move  = (e) => { if (!touching) return; const x = (e.touches ? e.touches[0].clientX : e.clientX); dx = x - startX; };
  const end   = () => {
    if (!touching) return; touching = false;
    if (Math.abs(dx) > 40) { dx > 0 ? doc.__featPrev?.() : doc.__featNext?.(); }
    restartFeaturedAutoplay(doc);
  };
  slider.addEventListener('touchstart', start, { passive: true });
  slider.addEventListener('touchmove',  move,  { passive: true });
  slider.addEventListener('touchend',   end);
  slider.addEventListener('mousedown',  start);
  window.addEventListener('mousemove',  move);
  window.addEventListener('mouseup',    end);
}

// ==========================
// UTILIDADES
// ==========================
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

const bySlug = (slug) => APPS.find(a => a.slug === slug);
const getDownloadUrl = (app) => SITE.downloadEndpoint ? `${SITE.downloadEndpoint}${encodeURIComponent(app.slug)}` : app.download;

const fmtTags = (tags=[]) => tags.map(t => `<span class="text-xs rounded-full border border-slate-700 px-2 py-0.5">${t}</span>`).join('');

// Categoría automática para el filtro
function deriveCategory(app) {
  const tags = (app.tags || []).map(t => t.toLowerCase());
  const title = (app.title || '').toLowerCase();
  const platform = (app.platform || '').toLowerCase();

  const gameHints = ['juego','juegos','arcade','runner','acción','mundo abierto','estrategia','tower defense'];
  if (tags.some(t => gameHints.includes(t))) return 'juegos';

  if (platform.startsWith('windows')) {
    const isOS =
      tags.includes('lite') ||
      tags.includes('bajo-recursos') ||
      title.includes('tiny') ||
      title.includes('x lite') ||
      title.includes('versión lite');
    return isOS ? 'sistemas' : 'programas';
  }
  return 'aplicaciones';
}

// ==========================
// VISTAS
// ==========================
function AppView(slug) {
  const app = bySlug(slug);
  if (!app) return NotFoundView();

  // 🔒 siempre bloqueado hasta que haga el proceso
  const unlocked = false;

  return `
  <article class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 space-y-4">
      <div class="rounded-2xl overflow-hidden border border-slate-800">
        <img src="${app.cover}" alt="${app.title}" class="w-full h-auto" />
      </div>
      <section class="space-y-3">
        <h1 class="text-2xl md:text-3xl font-bold">${app.title}</h1>
        <p class="text-sm text-slate-400">${app.platform} · v${app.version} · ${app.size ?? ''}</p>
        <div class="flex gap-2 flex-wrap">${fmtTags(app.tags)}</div>
        <p class="text-slate-200 leading-relaxed">${app.description}</p>
      </section>
    </div>

    <aside class="lg:col-span-1 space-y-4">
      <div class="rounded-2xl border border-slate-800 p-4 bg-slate-900/50">
        <h2 class="font-semibold mb-2">Cómo desbloquear la descarga</h2>
        <ol class="list-decimal list-inside text-sm text-slate-300 space-y-1">
          <li>Suscríbete al <strong>Canal Principal</strong>.</li>
          <li>Suscríbete al <strong>Canal Secundario</strong>.</li>
          <li>Espera <span class="font-semibold">${SITE.unlockSeconds}s</span> y el botón se habilitará.</li>
        </ol>
        <div class="mt-4 flex flex-col gap-2">
          <a id="btnSubPrincipal" href="${SITE.youtubePrincipal}" target="_blank" class="rounded-xl px-4 py-2 bg-red-600/90 hover:bg-red-600 text-center font-semibold">Canal Principal</a>
          <a id="btnSubSecundario" href="${SITE.youtubeSecundario}" target="_blank" class="rounded-xl px-4 py-2 bg-red-600/90 hover:bg-red-600 text-center font-semibold">Canal Secundario</a>
        </div>
        <div id="timerWrap" class="mt-3 hidden">
          <div class="text-xs text-slate-400 mb-1">Desbloqueando en <span id="timerNum">${SITE.unlockSeconds}</span>s…</div>
          <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div id="progress" class="h-full bg-sky-500" style="width:0%"></div>
          </div>
        </div>
        <a id="btnDownload" href="#" target="_blank" class="mt-4 block rounded-xl px-4 py-2 font-semibold text-center bg-slate-800 text-slate-400 cursor-not-allowed" aria-disabled="true">
          Descarga bloqueada
        </a>
      </div>

      <div class="rounded-2xl border border-slate-800 p-4">
        <h3 class="font-semibold mb-2">Detalles</h3>
        <ul class="text-sm text-slate-300 space-y-1">
          <li><span class="text-slate-400">Plataforma:</span> ${app.platform}</li>
          <li><span class="text-slate-400">Versión:</span> ${app.version}</li>
          ${app.size ? `<li><span class="text-slate-400">Tamaño:</span> ${app.size}</li>` : ''}
        </ul>
      </div>

      <div class="rounded-2xl border border-slate-800 p-4 bg-slate-900/40">
        <h3 class="font-semibold mb-2">Enlaces espejo</h3>
        ${app.mirrors?.length ? app.mirrors.map((m,i)=>`<a class='block text-sm text-sky-400 underline' target='_blank' href='${m}'>Mirror ${i+1}</a>`).join('') : '<p class="text-sm text-slate-400">Pronto…</p>'}
      </div>
    </aside>
  </article>`;
}

// ==========================
// BINDINGS (APP)
// ==========================
function bindApp(slug){
  const app = bySlug(slug);
  if (!app) return;

  const btnDownload = document.getElementById('btnDownload');
  const timerWrap = document.getElementById('timerWrap');
  const timerNum = document.getElementById('timerNum');
  const progress = document.getElementById('progress');

  let clickedPrincipal = false;
  let clickedSecundario = false;
  let countdown = SITE.unlockSeconds;
  let iv = null;

  $('#btnSubPrincipal').addEventListener('click', () => { clickedPrincipal = true; checkReady(); });
  $('#btnSubSecundario').addEventListener('click', () => { clickedSecundario = true; checkReady(); });

  function checkReady() {
    if (clickedPrincipal && clickedSecundario && !iv) {
      timerWrap.classList.remove('hidden');
      timerNum.textContent = countdown;
      progress.style.width = '0%';

      iv = setInterval(() => {
        countdown--;
        timerNum.textContent = countdown;
        const pct = Math.round(((SITE.unlockSeconds - countdown) / SITE.unlockSeconds) * 100);
        progress.style.width = pct + '%';

        if (countdown <= 0) {
          clearInterval(iv);
          btnDownload.href = getDownloadUrl(app);
          btnDownload.classList.remove('bg-slate-800','text-slate-400','cursor-not-allowed');
          btnDownload.classList.add('bg-sky-600','hover:bg-sky-500');
          btnDownload.textContent = 'Descargar ahora';
          btnDownload.removeAttribute('aria-disabled');
        }
      }, 1000);
    }
  }
}

// ==========================
// INIT
// ==========================
function render(){
  const hash = location.hash || '#/';
  const [ , route, param ] = hash.split('/');
  if (route === '' || route === undefined) {
    root.innerHTML = HomeView();
    bindHome();
    renderFeaturedInto(document);
  } else if (route === 'app') {
    root.innerHTML = AppView(param);
    bindApp(param);
  } else {
    root.innerHTML = NotFoundView();
  }
}

const root = document.getElementById('app');
window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
