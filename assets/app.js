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
   - Enlaces: si hay app.download -> va directo a la descarga (nueva pestaña)
              si no hay download -> va al detalle "#/app/slug"
   - Autoplay con pausa inteligente (hover/touch/focus/visibility)
   ============================================================ */

// 1) Slugs destacados (del catálogo APPS)
const FEATURED_SLUGS = [
  'after-effects-2025',
  'windows-x-lite-11',
  'tele-latino-tv',
  'spotify-mod-9-0-72-967',
  'dark-play-1-0',
  'hydra-launcher'
  
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

// 5) Render carrusel (con link directo a descarga si existe)
function renderFeaturedInto(root = document) {
  try {
    const doc = root.getElementById ? root : document;
    const slider = doc.querySelector('#featured .slider');
    if (!slider) return;

    const items = featuredItemsFrom(window.APPS || []);
   slider.innerHTML = items.map(app => {
  const href = `#/app/${app.slug}`;   // 👉 siempre al detalle
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

      // Fallback: si clickean en cualquier parte de la tarjeta y no justo en <a>,
      // abrimos el href del anchor overlay manualmente (evita overlays que bloqueen)
      sliderEl.addEventListener('click', (e) => {
        const aClicked = e.target.closest('a');
        if (aClicked) return; // ya funciona el <a>
        const item = e.target.closest('#featured .item');
        if (!item) return;
        const a = item.querySelector('a.item-link');
        if (!a) return;
        // abrir respetando target
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
// CATÁLOGO DE APPS
// ==========================
const APPS = [
  {
    slug: 'minecraft-1-21-100-6',
    title: 'Minecraft 1.21.100.6 (Comprado)',
    platform: 'Android',
    version: '1.21.100.6',
    size: '800 MB',
    cover: 'https://cdn.logojoy.com/wp-content/uploads/20231208133956/11-30-23_Minecraft-Logo-Evolution_HEADER.webp',
    tags: ['juegos', 'premium', 'sandbox'],
    description: `Construye, explora y sobrevive en mundos infinitos. Versión comprada, lista para instalar.`,
    download: 'https://srtslug.biz/8b9Gy',
    mirrors: []
  },
  {
    slug: 'after-effects-2025',
    title: 'Adobe After Effects 2025',
    platform: 'Windows',
    version: '2025',
    size: '2 GB',
    cover: '/assets/img/adobe.png',
    tags: ['edición de video', 'animación', 'adobe', 'premium'],
    description: `Instalá Adobe After Effects 2025 y elegí la versión que más te guste para tus proyectos de video y animación.`,
    download: 'https://srtslug.biz/AffterEffect2025',
    mirrors: []
  },
  {
    slug: 'spotify-mod-9-0-72-967',
    title: 'Spotify v9.0.72.967 [MOD]',
    platform: 'Android',
    version: '9.0.72.967',
    size: '50 MB',
    cover: 'assets/img/spotify.png',
    tags: ['música', 'streaming', 'premium', 'mod'],
    description: `Disfrutá la versión MOD con funciones premium desbloqueadas.`,
    download: 'https://srtslug.biz/sptfy',
    mirrors: []
  },
  {
    slug: 'Whatsapp plus',
    title: 'Whatsapp plus v18.70',
    platform: 'Android',
    version: '18.70',
    size: '112 MB',
    cover: '/assets/img/whatsapp.png',
    tags: ['Aplicaciones', 'premium', 'sandbox'],
    description: `Construye, explora y sobrev…`,
    download: 'https://srtslug.biz/wspls',
    mirrors: []
  },
  {
    slug: 'lightroom-premium',
    title: 'Lightroom Premium – Última versión',
    platform: 'Android',
    version: '2025.x',
    size: '250 MB',
    cover: 'https://images.unsplash.com/photo-1497015289639-54688650d173?q=80&w=1200&auto=format&fit=crop',
    tags: ['fotografía', 'edición', 'premium'],
    description: `Edición profesional en tu móvil con funciones premium activadas.`,
    download: '#',
    mirrors: []
  },
  {
    slug: 'ai-photo-enhancer-3-22-3',
    title: 'AI Photo Enhancer & Upscaler v3.22.3',
    platform: 'Android',
    version: '3.22.3',
    size: '40 MB',
    cover: 'assets/img/aiphoto.webp',
    tags: ['fotos', 'inteligencia-artificial', 'upscale', 'mejorar'],
    description: `Mejorá y aumentá la resolución de tus fotos con IA.`,
    download: 'https://srtslug.biz/8b9DM',
    mirrors: []
  },
  {
    slug: 'amazon-prime-premium-3-0-418-857',
    title: 'Amazon Prime Premium v3.0.418.857 (MOD)',
    platform: 'Android',
    version: '3.0.418.857',
    size: '60 MB',
    cover: 'assets/img/amazonprime.png',
    tags: ['video', 'series', 'películas', 'streaming'],
    description: `Disfrutá la versión MOD con funciones premium desbloqueadas.`,
    download: 'https://srtslug.biz/8b9DT',
    mirrors: []
  },
  {
    slug: 'avast-cleanup-25-15-0',
    title: 'Avast Cleanup v25.15.0 Pro',
    platform: 'Android',
    version: '25.15.0',
    size: '35 MB',
    cover: 'https://i0.wp.com/keyhouse24.com/wp-content/uploads/2023/06/Avast-Cleanup-Boost-Pro-For-Android-1-Device-1-Year-Global.png?fit=616%2C353&ssl=1',
    tags: ['seguridad', 'limpieza', 'rendimiento', 'optimización'],
    description: `Optimiza tu dispositivo eliminando archivos basura.`,
    download: 'https://srtslug.biz/avscln',
    mirrors: []
  },
  {
    slug: 'background-eraser-2-285-87',
    title: 'Background Eraser – Remove BG v2.285.87 Pro',
    platform: 'Android',
    version: '2.285.87',
    size: '25 MB',
    cover: 'assets/img/background.png',
    tags: ['fotos', 'edición', 'fondo', 'diseño'],
    description: `Elimina fácilmente el fondo de tus fotos.`,
    download: 'https://srtslug.biz/8b9Fx',
    mirrors: []
  },
  {
    slug: 'cast-to-tv-2-4-4-1',
    title: 'Cast to TV, Chromecast & Roku v2.4.4.1 PREMIUM',
    platform: 'Android',
    version: '2.4.4.1',
    size: '30 MB',
    cover: 'assets/img/castv.webp',
    tags: ['streaming', 'tv', 'chromecast', 'roku'],
    description: `Transmití tus videos y fotos a la TV.`,
    download: 'https://srtslug.biz/8b9FM',
    mirrors: []
  },
  {
    slug: 'ccleaner-25-15-0',
    title: 'CCleaner v25.15.0 Pro Android',
    platform: 'Android',
    version: '25.15.0',
    size: '40 MB',
    cover: 'https://i.ytimg.com/vi/8wJYuwXs9uw/maxresdefault.jpg',
    tags: ['limpieza', 'rendimiento', 'optimización'],
    description: `Limpia archivos innecesarios y mejora el rendimiento.`,
    download: 'https://srtslug.biz/8b9Fm',
    mirrors: []
  },
  {
    slug: 'ccleaner-pc-pro',
    title: 'CCleaner PRO (PC)',
    platform: 'Windows',
    version: 'Pro',
    size: '50 MB',
    cover: 'assets/img/CCleaner.png',
    tags: ['limpieza', 'rendimiento', 'pc', 'optimización'],
    description: `Optimiza el rendimiento de tu PC.`,
    download: 'https://ranoz.gg/file/BptQQEgg',
    mirrors: []
  },
  {
    slug: 'magis-tv-pro-celular',
    title: 'Magis TV Pro – Versión Celular',
    platform: 'Android',
    version: 'Pro',
    size: '60 MB',
    cover: 'assets/img/magis.png',
    tags: ['iptv', 'tv', 'series', 'películas', 'anime'],
    description: `TV en vivo, series, películas y anime en tu celular.`,
    download: 'https://srtslug.biz/8b9Gp',
    mirrors: []
  },
  {
    slug: 'magis-tv-pro-tv',
    title: 'Magis TV Pro – Versión para TV',
    platform: 'Android/TV',
    version: 'Pro',
    size: '65 MB',
    cover: 'assets/img/magis.png',
    tags: ['iptv', 'tv', 'canales', 'series', 'películas'],
    description: `Más de 1300 canales en vivo, películas y series.`,
    download: 'https://srtslug.biz/8b9Gt',
    mirrors: []
  },
  {
    slug: 'menu-extendido-windows',
    title: 'Menú Extendido de Windows',
    platform: 'Windows',
    version: '1.0',
    size: '150 MB',
    cover: 'assets/img/menu.jpg',
    tags: ['windows', 'optimización', 'herramientas', 'limpieza'],
    description: `Incluye portables, instaladores y optimizadores.`,
    download: 'https://srtslug.biz/8b9GB',
    mirrors: []
  },
  {
    slug: 'office-2013-2025-c2r',
    title: 'Office 2013 - 2025 C2R Install',
    platform: 'Windows',
    version: '2013-2025',
    size: '1.5 GB',
    cover: 'assets/img/office.png',
    tags: ['office', 'productividad', 'word', 'excel', 'powerpoint'],
    description: `Instala la versión de Office que prefieras.`,
    download: 'https://srtslug.biz/offc25',
    mirrors: []
  },
  {
    slug: 'onboard-memory-manager-logitech',
    title: 'OnBoard Memory Manager (Logitech)',
    platform: 'Windows',
    version: 'Oficial',
    size: '80 MB',
    cover: 'assets/img/logitech.png',
    tags: ['logitech', 'drivers', 'teclado', 'mouse'],
    description: `Programa oficial de Logitech para memoria integrada.`,
    download: 'https://ranoz.gg/file/m8Kip40v',
    mirrors: []
  },
  {
    slug: 'pixelcut-0-9-20',
    title: 'PixelCut v0.9.20',
    platform: 'Android',
    version: '0.9.20',
    size: '40 MB',
    cover: 'assets/img/pixelcut.png',
    tags: ['diseño', 'edición', 'fotos', 'creatividad'],
    description: `Diseños y ediciones rápidas y profesionales.`,
    download: 'https://srtslug.biz/pixlct',
    mirrors: []
  },
  {
    slug: 'remini-3-7-1070-2025',
    title: 'Remini v3.7.1070.2025',
    platform: 'Android',
    version: '3.7.1070.2025',
    size: '45 MB',
    cover: 'assets/img/remini.png',
    tags: ['fotos', 'inteligencia-artificial', 'mejorar', 'edición'],
    description: `Mejorá tus fotos con IA.`,
    download: 'https://www.mediafire.com/file/85tpbwhqcdvsb3d/Remini_v3.7.1070.2025.apk/file',
    mirrors: []
  },
  {
    slug: 'dark-play-1-0',
    title: 'Dark Play v1.0',
    platform: 'Android',
    version: '1.0',
    size: '20 MB',
    cover: 'assets/img/darkplay.png',
    tags: ['películas', 'series', 'streaming', 'gratis'],
    description: `DarkPlay es una aplicación pensada para quienes disfrutan del cine y las series desde su dispositivo. Cuenta con una interfaz sencilla, clara y fácil de navegar, donde podés encontrar tus títulos favoritos sin complicaciones. Ofrece películas y series en excelente calidad, incluyendo los últimos estrenos, así como un amplio catálogo para todos los gustos. Todo en un mismo lugar y con la mejor experiencia de reproducción.`,
    download: 'https://srtslug.biz/8b9Gc',
    mirrors: []
  },
  {
    slug: 'windows-tiny11-lite',
    title: 'Windows Tiny11 – Versión Lite de Windows 11',
    platform: 'Windows',
    version: 'Lite',
    size: '3 GB',
    cover: 'https://i.ytimg.com/vi/XsAyJpx4STM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCtGWVDvhuOLmdYzZ7ub3YQdp3Xtg',
    tags: ['windows', 'lite', 'optimización', 'bajo-recursos'],
    description: `Versión ligera que elimina bloatware y reduce requisitos.`,
    download: 'https://shrtlk.click/tn11',
    mirrors: []
  },
  {
    slug: 'windows-x-lite-11',
    title: 'Windows X Lite – Windows 11 Lite',
    platform: 'Windows',
    version: '11 (Lite)',
    size: '3.15 GB',
    cover: 'assets/img/winxlite.png',
    tags: ['windows', 'lite', 'gaming', 'rendimiento', 'optimización', 'bajo-recursos'],
    description: `Edición ultraligera enfocada en rendimiento.`,
    download: 'https://shrtlk.click/winxlite',
    mirrors: []
  },
  {
    slug: 'life360-premium',
    title: 'Life360 Premium (APK)',
    platform: 'Android',
    version: 'Premium',
    size: '15 MB',
    cover: 'assets/img/life360.jpg',
    tags: ['familia', 'seguridad', 'gps', 'rastreo', 'alertas', 'sos'],
    description: `Seguimiento GPS, alertas y seguridad familiar.`,
    download: 'https://stly.link/lf360prem',
    mirrors: []
  },
  {
    slug: 'deezer-mod-8-0-40-4',
    title: 'Deezer v8.0.40.4 [MOD Premium]',
    platform: 'Android',
    version: '8.0.40.4',
    size: '47 MB',
    cover: 'https://apkmody.com/wp-content/uploads/2022/05/Deezer-MOD-APK-cover-APKMODY-COM.jpg',
    tags: ['música', 'streaming', 'premium', 'mod', 'offline'],
    description: `Música sin límites, descargas offline y sin anuncios.`,
    download: 'https://stly.link/dserprem',
    mirrors: []
  },
  {
    slug: 'adguard-premium-4-10-65',
    title: 'AdGuard Premium v4.10.65',
    platform: 'Android',
    version: '4.10.65',
    size: '60 MB',
    cover: 'https://cdn.adtidy.org/blog/2019/03/cover_android3_0.jpg',
    tags: ['bloqueo de anuncios', 'privacidad', 'seguridad', 'DNS', 'HTTPS', 'firewall'],
    description: `Bloquea anuncios, rastreadores y protege tu privacidad.`,
    download: 'https://stly.link/adgrdprem',
    mirrors: []
  },
  {
    slug: 'temp-mail-premium-4-01',
    title: 'Temp Mail Premium v4.01',
    platform: 'Android',
    version: '4.01',
    size: '54 MB',
    cover: 'https://play-lh.googleusercontent.com/bZcnF_cQg7JJfzX9VaQzJqDtqyHVwT5gV4hoUd9u1FiB9Cam4wQMb8QPo58DIuZYuVs',
    tags: ['email temporal', 'privacidad', 'antispam', 'anónimo', 'seguridad'],
    description: `Correos temporales para evitar spam y proteger identidad.`,
    download: 'https://stly.link/tmpmail',
    mirrors: []
  },
  {
    slug: 'movie-plus-10-2',
    title: 'Movie Plus v10.2',
    platform: 'Android',
    version: '10.2',
    size: '36 MB',
    cover: 'https://apkrabi.com/uploads/2023/9/movies-plus-thumbnail.jpg',
    tags: ['películas', 'series', 'streaming', 'hd', 'entretenimiento'],
    description: `Catálogo amplio en HD/Full HD con casting a TV.`,
    download: 'https://stly.link/movieplus',
    mirrors: []
  },
  {
    slug: 'chat-smith-premium-4-0-0',
    title: 'Chat Smith Premium v4.0.0',
    platform: 'Android',
    version: '4.0.0',
    size: '85 MB',
    cover: 'assets/img/chatgpt.jpg',
    tags: ['IA', 'chatbot', 'voz', 'texto', 'asistente', 'gpt'],
    description: `Chat con IA, dictado/lectura y plantillas.`,
    download: 'https://stly.link/chatsm',
    mirrors: []
  },
  {
    slug: 'playhub-plus-1-2-26',
    title: 'PlayHub+ v1.2.26',
    platform: 'Android',
    version: '1.2.26',
    size: '25 MB',
    cover: 'assets/img/play.jpg',
    tags: ['películas', 'series', 'anime', 'streaming', 'hd', 'chromecast'],
    description: `Películas, series y anime en HD con Chromecast.`,
    download: 'https://stly.link/playhb',
    mirrors: []
  },
  {
    slug: 'snaptube-vip-7-41-0-74150210',
    title: 'Snaptube VIP v7.41.0.74150210',
    platform: 'Android',
    version: '7.41.0.74150210',
    size: '26 MB',
    cover: 'assets/img/snap.jpg',
    tags: ['video', 'música', 'descargas', 'youtube', 'facebook', 'android'],
    description: `Descargá videos y música de múltiples plataformas.`,
    download: 'https://stly.link/snapt',
    mirrors: []
  },
  {
    slug: 'photoroom-pro-2025-26-03',
    title: 'PhotoRoom Pro v2025.26.03',
    platform: 'Android',
    version: '2025.26.03',
    size: '74 MB',
    cover: 'assets/img/photo.jpg',
    tags: ['fotos', 'edición', 'remove bg', 'ecommerce', 'diseño'],
    description: `Eliminá el fondo y creá imágenes limpias.`,
    download: 'https://stly.link/photorm',
    mirrors: []
  },
  {
    slug: 'gta-san-andreas-2-11',
    title: 'GTA San Andreas – Última versión v2.11',
    platform: 'Android',
    version: '2.11',
    size: '2.6 GB',
    cover: 'https://gtasanandreasapk.org/wp-content/uploads/2024/09/Gta-san-andreas-mod-apk-download.webp',
    tags: ['juego', 'acción', 'mundo abierto', 'clásico', 'offline'],
    description: `Historia de CJ en mundo abierto, optimizado en móvil.`,
    download: 'https://srtslug.biz/gtasanand',
    mirrors: []
  },
  {
    slug: 'subway-surfers-mod-3-48-3',
    title: 'Subway Surfers v3.48.3 [MOD]',
    platform: 'Android',
    version: '3.48.3',
    size: '153 MB',
    cover: 'https://i.ytimg.com/vi/aEnMi1RM8ZI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCrzflpkVoHCFJhyt5apr2dPxvSog',
    tags: ['juego', 'arcade', 'runner', 'mod', 'offline'],
    description: `Clásico runner con ventajas MOD.`,
    download: 'https://stly.link/subwysurf',
    mirrors: []
  },
  {
    slug: 'youcam-perfect-6-8-0',
    title: 'YouCam Perfect v6.8.0',
    platform: 'Android',
    version: '6.8.0',
    size: '35 MB',
    cover: 'https://media.imgcdn.org/repo/2023/03/youcam-perfect-photo-editor/youcam-perfect-photo-editor-free-download.jpg',
    tags: ['fotos', 'edición', 'selfie', 'filtros', 'retoque', 'belleza'],
    description: `Retoque rápido para selfies y efectos.`,
    download: 'https://stly.link/youcam',
    mirrors: []
  },
  {
    slug: 'proton-vpn-premium-5-12-48-0',
    title: 'Proton VPN v5.12.48.0 [Premium]',
    platform: 'Android',
    version: '5.12.48.0',
    size: '49 MB',
    cover: 'assets/img/proton.jpg',
    tags: ['vpn', 'privacidad', 'seguridad', 'netshield', 'wireguard', 'kill switch', 'streaming'],
    description: `VPN premium con NetShield, split tunneling y más.`,
    download: 'https://srtslug.biz/8bknt',
    mirrors: []
  },
  {
    slug: 'pvz-2-mod-9-9-2',
    title: 'Plants vs. Zombies 2 v9.9.2 [MOD]',
    platform: 'Android',
    version: '9.9.2',
    size: '30 MB',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4-ScHESNYKXuUZ9aJleq1pbAsgGY56EKnZQ&s',
    tags: ['juego', 'tower defense', 'estrategia', 'mod', 'offline', 'clásico'],
    description: `Defendé tu jardín con plantas y poderes.`,
    download: 'https://ranoz.gg/file/6BWd4Q7q',
    mirrors: []
  },
  {
    slug: 'tele-latino-4-11-5',
    title: 'Tele Latino v4.11.5 Movil',
    platform: 'Android',
    version: '4.11.5',
    size: '40 MB',
    cover: 'https://content-hub.wlp.app/vpn/wp-content/uploads/sites/2/2024/06/tela-latino-cuenta-completa-1mes-e1718293663105.jpg',
    tags: ['iptv', 'tv', 'canales', 'series', 'películas', 'latino', 'streaming'],
    description: `IPTV con TV en vivo, películas y series.`,
    download: 'https://stly.link/telelatmobile',
    mirrors: []
  },
  {
    slug: 'tele-latino-tv',
    title: 'Tele Latino – Versión TV',
    platform: 'Android/TV',
    version: 'TV',
    size: '35 MB',
    cover: 'https://akyhay.com/wp-content/uploads/2022/07/tele-latino.jpg',
    tags: ['iptv', 'tv', 'canales', 'series', 'películas', 'latino', 'streaming', 'android tv'],
    description: `Edición optimizada para Android TV y TV Box.`,
    download: 'https://stly.link/telelatTV',
    mirrors: []
  },
  {
    slug: 'capcut-premium-15-2-0',
    title: 'CapCut v15.2.0 [Premium]',
    platform: 'Android',
    version: '15.2.0',
    size: '285 MB',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ_9Zwf08iY6UtBYcEtYPwmzHpmZrLhgNETQ&s',
    tags: ['video', 'edición', 'plantillas', 'transiciones', '4k', 'chroma key', 'captions', 'velocidad'],
    description: `Editor de video con plantillas, efectos y 4K.`,
    download: 'https://stly.link/capcuttt',
    mirrors: []
  },
  {
    slug: 'picsart-premium-28-2-8',
    title: 'Picsart v28.2.8 [Premium]',
    platform: 'Android',
    version: '28.2.8',
    size: '82 MB',
    cover: 'https://shop.aedigi.com/wp-content/uploads/tai-khoan-picsart-pro-scaled.png',
    tags: ['fotos', 'edición', 'filtros', 'efectos', 'collage', 'IA'],
    description: `Editor todo en uno para fotos y videos.`,
    download: 'https://stfly.vip/picpro',
    mirrors: []
  },
  {
    slug: 'ppsspp-gold-1-19-3-premium',
    title: 'PPSSPP Gold v1.19.3 [Premium]',
    platform: 'Android',
    version: '1.19.3',
    size: '31 MB',
    cover: 'https://apkomtk.com/wp-content/uploads/2025/04/PPSSPP-Gold-PSP-emulator-APK.jpg',
    tags: ['emulador', 'psp', 'juegos', '60fps', 'save states', 'gamepad', 'vulkan'],
    description: `Emulador PSP de alto rendimiento.`,
    download: 'https://stfly.vip/ppsspp',
    mirrors: []
  },
  {
    slug: 'logowiz-108-0-premium',
    title: 'LogoWiz v108.0 [Premium Features Unlocked]',
    platform: 'Android',
    version: '108.0',
    size: '42.8 MB',
    cover: 'https://blogger.googleusercontent.com/img/a/AVvXsEjSzalQ9hcqyGyEy46wRtsAuWcOHKBk06Vma2SDz89unwgBy1yKhbqdY2jvG7ly1KvkQ-H8JiALEgrYy8aTwTY4SVKKHcAtcGv3q7rr90pJCwl9-CiY1PUkhjeZwJpj4p5gO2kTWMm_1MYg0Akfe_G6vmkx2fE1inEka1rOKaX6_zEeVSxcGx6wF1DZAX4=s480',
    tags: ['logo maker', 'diseño', 'marca', 'plantillas', 'iconos', 'tipografías', 'png transparente'],
    description: `Creador de logos con miles de plantillas.`,
    download: 'https://stly.link/logwiz',
    mirrors: []
  },
  {
    slug: 'whatsapp-plus-vctm-2-0-0-yesiimods',
    title: 'WhatsApp Plus VCTM v2.0.0 (YesiiMods)',
    platform: 'Android',
    version: '2.0.0',
    size: '153.3 MB',
    cover: 'assets/img/whatyes.jpg',
    tags: ['mensajería', 'whatsapp', 'mod', 'temas', 'personalización', 'privacidad'],
    description: `Más privacidad y personalización que la app oficial.`,
    download: 'https://stly.link/whatyes',
    mirrors: []
  },
  {
    slug: 'magistv-tv-apk',
    title: 'MagisTV – Versión TV',
    platform: 'Android/TV',
    version: 'TV',
    size: '34 MB',
    cover: 'assets/img/magistvtv.png',
    tags: ['iptv', 'tv', 'canales', 'series', 'películas', 'streaming', 'android tv', 'tv box'],
    description: `Optimizada para Android TV y TV Box.`,
    download: 'https://stly.link/mgtvtv',
    mirrors: []
  },
  {
    slug: 'my-talking-tom-mod-7-1-4-2471',
    title: 'My Talking Tom v7.1.4.2471 [MOD]',
    platform: 'Android',
    version: '7.1.4.2471',
    size: '108 MB',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLPwgyochlf4Ozksa4Sg4XG2adNWUr84nKYA&s',
    tags: ['juego', 'mascota virtual', 'simulación', 'minijuegos', 'mod', 'offline'],
    description: `Cuida a Tom, minijuegos y personalización.`,
    download: 'https://stly.link/mytlktom',
    mirrors: []
  },
  {
    slug: 'instagram-246-1-0-16-113',
    title: 'Instagram v246.1.0.16.113',
    platform: 'Android',
    version: '246.1.0.16.113',
    size: '50 MB',
    cover: 'assets/img/insta.png',
    tags: ['social', 'fotos', 'videos', 'reels', 'stories', 'mensajes'],
    description: `Reels, Stories, DM, vivos y edición avanzada.`,
    download: 'https://stly.link/instaprov2',
    mirrors: []
  },
  {
    slug: 'youtube-music-mod-8-34-51',
    title: 'YouTube Music v8.34.51 [MOD]',
    platform: 'Android',
    version: '8.34.51',
    size: '67 MB',
    cover: 'https://indiehoy.com/wp-content/uploads/2020/01/youtubepremium-youtubemusic.png',
    tags: ['música', 'streaming', 'youtube', 'premium', 'mod', 'offline', 'segundo plano'],
    description: `Sin anuncios, segundo plano y descargas offline.`,
    download: 'https://stfly.vip/ytmus',
    mirrors: []
  },
  {
    slug: 'shotcut-pro-2-18-0',
    title: 'ShotCut v2.18.0 [Pro]',
    platform: 'Android',
    version: '2.18.0',
    size: '135.4 MB',
    cover: 'https://i.ytimg.com/vi/2_lQMGwtqf8/hqdefault.jpg',
    tags: ['video', 'edición', 'plantillas', 'transiciones', 'filtros', 'pro'],
    description: `Editor Pro para móvil sin marcas de agua.`,
    download: 'https://stfly.vip/8byPt',
    mirrors: []
  },
  {
    slug: 'youtube-revanced-20-13-41',
    title: 'YouTube ReVanced v20.13.41',
    platform: 'Android',
    version: '20.13.41',
    size: '167 MB',
    cover: 'https://cdn.thinkkers.com/wp-content/uploads/2022/08/Youtube-ReVanced-Apk.jpg',
    tags: ['video', 'youtube', 'mod', 'sin anuncios', 'segundo plano', 'pip', 'sponsorblock'],
    description: `Cliente mod con PiP, background y SponsorBlock.`,
    download: 'https://stfly.vip/ytrevan',
    mirrors: []
  },
  {
    slug: 'ad-blocker-pro-6-5-1-premium',
    title: 'Ad Blocker Pro v6.5.1 [Premium Features Unlocked]',
    platform: 'Android',
    version: '6.5.1',
    size: '15 MB',
    cover: 'https://images.squarespace-cdn.com/content/v1/54e310f0e4b0f4a6ba3ac899/47c70f4f-c5bb-4381-bcbf-90f2b94add5f/Ad-blocker.jpg',
    tags: ['bloqueo de anuncios', 'privacidad', 'rastreo', 'antipopups', 'filtros', 'seguridad'],
    description: `Bloquea anuncios/popups y mejora privacidad.`,
    download: 'https://stfly.vip/8byQy',
    mirrors: []
  },
  {
    slug: 'xy-vpn-4-9-947-premium',
    title: 'XY VPN v4.9.947 [Premium Features Unlocked]',
    platform: 'Android',
    version: '4.9.947',
    size: '30 MB',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERg4etch1ivkT4goyxnPlQYezoOdLAEI17Q&s',
    tags: ['vpn', 'privacidad', 'seguridad', 'servidores globales', 'sin anuncios', 'kill switch'],
    description: `Cifrado, servidores rápidos y datos ilimitados.`,
    download: 'https://stfly.vip/8byR3',
    mirrors: []
  },
  {
    slug: 'windows-11-showos-pro-1-0',
    title: 'Windows 11 ShowOS Pro v1.0 (MediaFire)',
    platform: 'Windows',
    version: '1.0',
    size: '4.04 GB',
    cover: 'https://i.ytimg.com/vi/yDiQ4442vbs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAOEr4M8RLJZGivVjZ5XgUdTgrUNA',
    tags: ['windows', 'custom iso', 'optimización', 'gaming', 'rendimiento', 'debloat', 'bajo-recursos'],
    description: `Edición personalizada enfocada en rendimiento.`,
    download: 'https://srtslug.biz/8byTV',
    mirrors: []
  },
  {
    slug: 'windows-11-showos-pro-1-0',
    title: 'Windows 11 ShowOS Pro v1.0 (Mega)',
    platform: 'Windows',
    version: '1.0',
    size: '4.04 GB',
    cover: 'https://i.ytimg.com/vi/yDiQ4442vbs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAOEr4M8RLJZGivVjZ5XgUdTgrUNA',
    tags: ['windows', 'custom iso', 'optimización', 'gaming', 'rendimiento', 'debloat', 'bajo-recursos'],
    description: `Edición personalizada enfocada en rendimiento.`,
    download: 'https://srtslug.biz/8byVh',
    mirrors: []
  },
  {
    slug: 'winteros-rev14-w11pro-24h2',
    title: 'WinterOS Rev14 – Windows 11 Pro 24H2',
    platform: 'Windows',
    version: 'Rev14 (24H2)',
    size: '4.3 GB',
    cover: 'https://i.ytimg.com/vi/_GXmqTzSs9I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAvtmpgR58xlhb5edIkmVBmndp2Tw',
    tags: ['windows', 'custom iso', 'optimización', 'gaming', 'rendimiento', 'debloat', 'bajo-recursos'],
    description: `Enfocada en rendimiento y baja latencia.`,
    download: 'https://srtslug.biz/8byXr',
    mirrors: []
  },
  {
    slug: 'winteros-w11-24h2pro-rev15',
    title: 'WinterOS W11 v24H2PRO Rev15',
    platform: 'Windows',
    version: 'Rev15 (24H2 Pro)',
    size: '4.5 GB',
    cover: 'https://i.ytimg.com/vi/gc5c3A6wn_o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDRyV2l0y2lYdWtA3p0C-HQYVo_sg',
    tags: ['windows', 'custom iso', 'optimización', 'gaming', 'rendimiento', 'debloat', 'bajo-recursos'],
    description: `24H2 Pro con ajustes de rendimiento.`,
    download: 'https://srtslug.biz/8byZh',
    mirrors: []
  },

  {
  slug: 'hydra-launcher',
  title: 'Hydra Launcher',
  platform: 'Windows',
  version: 'Latest',
  size: '142 MB',
  cover: 'https://cdn2.steamgriddb.com/grid/bdde82b7f35c4b6049ad726b4683b482.png',
  tags: ['launcher', 'juegos', 'biblioteca', 'organizador', 'Windows', 'portadas'],
  description: `Launcher ligero para PC que te permite DESCARGAR, organizar y lanzar tus juegos desde una sola interfaz. Importá tus títulos, añadí accesos directos, gestioná carátulas/arte, categorías y filtros, y mantené tu biblioteca ordenada con búsqueda rápida y vistas personalizadas.`,
  download: 'https://srtslug.biz/hydralan',
  mirrors: []
},



];
window.APPS = APPS;


// ==========================
// UTILIDADES
// ==========================
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

const bySlug = (slug) => APPS.find(a => a.slug === slug);
const getDownloadUrl = (app) => SITE.downloadEndpoint ? `${SITE.downloadEndpoint}${encodeURIComponent(app.slug)}` : app.download;

const fmtTags = (tags=[]) => tags.map(t => `<span class="text-xs rounded-full border border-slate-700 px-2 py-0.5">${t}</span>`).join('');

const saveUnlock = (slug) => localStorage.setItem(`unlock_${slug}`, Date.now());
const isUnlocked = (slug) => !!localStorage.getItem(`unlock_${slug}`);

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
function HomeView() {
  const featuredBlock = `
    <!-- ⭐ Destacados del mes (Carrusel estilo card) -->
    <section id="featured" class="relative mb-8">
      <h2 class="text-xl md:text-2xl font-bold mb-3">⭐ Destacados del mes</h2>
      <ul class="slider" role="list" aria-label="Destacados del mes"></ul>
      <nav class="nav" aria-label="Controles del carrusel">
        <ion-icon class="btn prev" name="arrow-back-outline" aria-label="Anterior"></ion-icon>
        <ion-icon class="btn next" name="arrow-forward-outline" aria-label="Siguiente"></ion-icon>
      </nav>
    </section>
  `;

  const controls = `
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight">Todas las aplicaciones</h1>
        <p class="text-slate-400"><span id="resultCount">${APPS.length}</span> elementos</p>
      </div>

      <div class="flex flex-col gap-3 md:items-end">
        <div class="flex gap-2">
          <button id="btnSortAZ" class="rounded-xl border border-slate-800 px-3 py-2 text-sm hover:bg-slate-900">A–Z</button>
          <button id="btnSortZA" class="rounded-xl border border-slate-800 px-3 py-2 text-sm hover:bg-slate-900">Z–A</button>
        </div>

        <div class="segmented-wrap overflow-x-auto">
          <div class="segmented min-w-max">
            <input type="radio" name="cat" id="f-todos" value="todos" checked>
            <label for="f-todos" title="Mostrar todo">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z"/></svg>
              Todos
            </label>

            <input type="radio" name="cat" id="f-juegos" value="juegos">
            <label for="f-juegos" title="Sólo juegos">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M17 6H7a5 5 0 0 0-5 5v2a5 5 0 0 0 5 5h1l2-2h4l2 2h1a5 5 0 0 0 5-5v-2a5 5 0 0 0-5-5M8.5 13A1.5 1.5 0 1 1 10 11.5A1.5 1.5 0 0 1 8.5 13M15.5 13A1.5 1.5 0 1 1 17 11.5A1.5 1.5 0 0 1 15.5 13Z"/></svg>
              Juegos
            </label>

            <input type="radio" name="cat" id="f-aplicaciones" value="aplicaciones">
            <label for="f-aplicaciones" title="Sólo aplicaciones">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3 5h18v4H3zm0 5h18v4H3zm0 5h18v4H3z"/></svg>
              Aplicaciones
            </label>

            <input type="radio" name="cat" id="f-programas" value="programas">
            <label for="f-programas" title="Sólo programas (PC)">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6h16v10H4zM2 18h20v2H2z"/></svg>
              Programas
            </label>

            <input type="radio" name="cat" id="f-sistemas" value="sistemas">
            <label for="f-sistemas" title="Sólo sistemas operativos">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h16v12H4zM2 18h20v2H2z"/></svg>
              Sistemas
            </label>
          </div>
        </div>
      </div>
    </div>
  `;

  return `
    <section class="space-y-6">
      ${featuredBlock}
      ${controls}
      <div id="grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"></div>

      <nav class="flex items-center justify-center gap-3">
        <button id="prevPage" class="rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 px-4 py-2 text-sm font-semibold">Anterior</button>
        <span id="pageInfo" class="text-slate-300 text-sm min-w-32 text-center">0-0 de 0</span>
        <button id="nextPage" class="rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 px-4 py-2 text-sm font-semibold">Siguiente</button>
      </nav>
    </section>
  `;
}

function AppView(slug) {
  const app = bySlug(slug);
  if (!app) return NotFoundView();

  const unlocked = isUnlocked(app.slug);

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
        <a id="btnDownload" href="${unlocked ? getDownloadUrl(app) : '#'}" target="_blank" class="mt-4 block rounded-xl px-4 py-2 font-semibold text-center ${unlocked ? 'bg-sky-600 hover:bg-sky-500' : 'bg-slate-800 text-slate-400 cursor-not-allowed'}" ${unlocked ? '' : 'aria-disabled="true"'}>
          ${unlocked ? 'Descargar ahora' : 'Descarga bloqueada'}
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

function NotFoundView(){
  return `<div class="text-center py-20">
    <h1 class="text-3xl font-bold mb-2">404</h1>
    <p class="text-slate-400">No encontramos lo que buscas.</p>
    <a href="#/" class="inline-block mt-6 rounded-xl border border-slate-800 px-4 py-2">Volver al inicio</a>
  </div>`;
}

// ==========================
// RENDER
// ==========================
const root = document.getElementById('app');

function render(){
  const hash = location.hash || '#/';
  const [ , route, param ] = hash.split('/');
  if (route === '' || route === undefined) {
    root.innerHTML = HomeView();
    bindHome();
    // pintar el carrusel en el Home recién renderizado
    renderFeaturedInto(document);
  } else if (route === 'app') {
    root.innerHTML = AppView(param);
    bindApp(param);
  } else {
    root.innerHTML = NotFoundView();
  }
}

// ==========================
// BINDINGS (HOME) – con paginación
// ==========================
function bindHome() {
  const grid = document.getElementById('grid');
  const search = document.getElementById('searchInput');
  const radios = Array.from(document.querySelectorAll('input[name="cat"]'));
  const resultCount = document.getElementById('resultCount');

  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  const pageInfo = document.getElementById('pageInfo');

  let currentSort = 'AZ';
  const state = { page: 1, perPage: 8, filtered: [] };

  const normalize = (s) =>
    (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  const cardHTML = (app) => {
    const cat = deriveCategory(app);
    return `
      <article class="app-card group rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-sky-700 transition"
               data-category="${cat}">
        <a href="#/app/${app.slug}" class="block">
          <div class="aspect-[16/9] bg-slate-800 overflow-hidden">
            <img src="${app.cover}" alt="${app.title}" loading="lazy"
                 class="h-full w-full object-cover group-hover:scale-105 transition" />
          </div>
          <div class="p-4 flex flex-col gap-2">
            <h3 class="text-base font-semibold">${app.title}</h3>
            <p class="text-xs text-slate-400">${app.platform} · v${app.version} · ${app.size ?? ''}</p>
            <div class="flex gap-2 flex-wrap">${fmtTags(app.tags)}</div>
          </div>
        </a>
      </article>`;
  };

  function applyFilters() {
    const q = normalize(search?.value || '');
    const selected = (radios.find(r => r.checked)?.value) || 'todos';

    const sorted = [...APPS].sort((a,b) =>
      currentSort === 'AZ' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

    state.filtered = sorted.filter(app => {
      const cat = deriveCategory(app);
      const matchesCat = (selected === 'todos') ? true : (cat === selected);
      const matchesText =
        normalize(app.title).includes(q) ||
        normalize(app.platform).includes(q) ||
        (app.tags || []).some(t => normalize(t).includes(q));
      return matchesCat && matchesText;
    });

    state.page = 1;
    if (resultCount) resultCount.textContent = state.filtered.length;
    renderPage();
  }

  function renderPage() {
    const total = state.filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / state.perPage));
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * state.perPage;
    const end = start + state.perPage;

    grid.innerHTML = state.filtered.slice(start, end).map(cardHTML).join('');

    const from = total ? start + 1 : 0;
    const to = Math.min(end, total);

    if (pageInfo) pageInfo.textContent = `${from}-${to} de ${total}`;
    if (prevPageBtn) prevPageBtn.disabled = state.page <= 1 || total === 0;
    if (nextPageBtn) prevPageBtn && (nextPageBtn.disabled = state.page >= totalPages || total === 0);
  }

  search?.addEventListener('input', applyFilters);
  radios.forEach(r => r.addEventListener('change', applyFilters));
  $('#btnSortAZ').onclick = () => { currentSort = 'AZ'; applyFilters(); };
  $('#btnSortZA').onclick = () => { currentSort = 'ZA'; applyFilters(); };
  prevPageBtn?.addEventListener('click', () => { if (state.page > 1) { state.page--; renderPage(); } });
  nextPageBtn?.addEventListener('click', () => { state.page++; renderPage(); });

  applyFilters();
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

  if (isUnlocked(app.slug)) {
    btnDownload.href = getDownloadUrl(app);
    btnDownload.classList.remove('bg-slate-800','text-slate-400','cursor-not-allowed');
    btnDownload.classList.add('bg-sky-600','hover:bg-sky-500');
    btnDownload.textContent = 'Descargar ahora';
    return;
  }

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
          saveUnlock(app.slug);
          btnDownload.href = getDownloadUrl(app);
          btnDownload.classList.remove('bg-slate-800','text-slate-400','cursor-not-allowed');
          btnDownload.classList.add('bg-sky-600','hover:bg-sky-500');
          btnDownload.textContent = 'Descargar ahora';
        }
      }, 1000);
    }
  }
}

// Redirección chip emuladores (si existe)
(function(){
  const chip = document.getElementById('f-emuladores');
  if (!chip) return;
  chip.addEventListener('change', () => { if (chip.checked) window.location.href = 'emuladores.html'; });
})();

// ==========================
// INIT
// ==========================
window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

// === 1) Define los tutoriales por slug (agregá más cuando quieras) ===
const TUTORIALS = {
  "hydra-launcher": {
    title: "Cómo usar Hydra Launcher",
    steps: [
      "Descargá e instalá Hydra desde el botón de descarga.",
      "Abrí Hydra y elegí la carpeta donde guardás tus juegos.",
      "Agregá tus juegos existentes y organizalos con carátulas/categorías.",
      "Para descargas nuevas, elegí el servidor/mirror con mejor velocidad.",
      "Iniciá la descarga y seguí el progreso desde la cola de tareas.",
      "Usalo sólo con juegos gratuitos, demos o contenidos a los que tengas derecho de acceso."
    ],
    ctaLabel: "Ir a la descarga",
    // Si tu array de apps tiene 'download' distinto por app, no pongas href acá y lo leerá desde la card
    href: "https://srtslug.biz/hydralan"
  },
  // Ejemplo de cómo añadir otro (dejado como plantilla):
  // "otro-slug": { title: "Título", steps: ["Paso 1", "Paso 2"], ctaLabel: "Abrir guía", href: "https://..." }
};

// === 2) Inyecta dinámicamente el botón "Tutorial" en las cards que tengan tutorial ===
// Ajustá los selectores si tus cards usan otros nombres de clase
function injectTutorialButtons() {
  document.querySelectorAll(".app-card").forEach(card => {
    const slug = card.getAttribute("data-slug");
    if (!slug || !TUTORIALS[slug]) return;

    // Evita duplicados
    if (card.querySelector("[data-tutorial-btn]")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-tutorial-btn", "");
    btn.setAttribute("data-tutorial-slug", slug);
    btn.className = "mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-sm";
    btn.textContent = "📘 Tutorial";

    // Si tenés un contenedor de acciones, usalo; si no, lo agrego al final
    const actions = card.querySelector(".app-actions");
    (actions || card).appendChild(btn);
  });
}

// Si vos mismo renderizás las cards vía JS, llamá a injectTutorialButtons() después de pintarlas.
// Si no, lo disparamos al cargar:
document.addEventListener("DOMContentLoaded", injectTutorialButtons);

// === 3) Modal reusable ===
function openTutorialModal(slug, fromButtonEl) {
  const t = TUTORIALS[slug];
  if (!t) return;

  // Título
  document.getElementById("tutorial-title").textContent = t.title || "Tutorial";

  // Pasos
  const list = document.getElementById("tutorial-steps");
  list.innerHTML = "";
  (t.steps || []).forEach((s, i) => {
    const li = document.createElement("li");
    li.className = "flex gap-2";
    li.innerHTML = `<b>${i+1}.</b> <span>${s}</span>`;
    list.appendChild(li);
  });

  // CTAs
  const cta = document.getElementById("tutorial-cta");
  const close = document.getElementById("tutorial-close");

  // Preferencia: link del tutorial; si no hay, intenta leer el 'download' de la card
  let href = t.href;
  if (!href && fromButtonEl) {
    const card = fromButtonEl.closest(".app-card");
    const downloadBtn = card?.querySelector("[data-download-href]");
    href = downloadBtn?.getAttribute("data-download-href") || "#";
  }

  cta.textContent = t.ctaLabel || "Abrir";
  cta.href = href || "#";

  // Mostrar modal
  document.getElementById("tutorial-overlay").classList.remove("hidden");
}

// Delegación de eventos para cualquier botón con data-tutorial-slug
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tutorial-btn]");
  if (btn) {
    const slug = btn.getAttribute("data-tutorial-slug");
    openTutorialModal(slug, btn);
  }
});

// Cerrar modal
function closeTutorialModal() {
  document.getElementById("tutorial-overlay").classList.add("hidden");
}
document.addEventListener("click", (e) => {
  if (e.target.matches("#tutorial-overlay, #tutorial-close")) closeTutorialModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeTutorialModal();
});

