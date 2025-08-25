// ==========================
// CONFIGURACIÓN GLOBAL
// ==========================
const SITE = {
  name: 'Assa AppHub Premium',
  youtubePrincipal: 'https://www.youtube.com/@AssaApps',
  youtubeSecundario: 'https://www.youtube.com/@AssaAR10',
  downloadEndpoint: null,
  unlockSeconds: 20,
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('ytLinkTop').href = SITE.youtubePrincipal;
  document.getElementById('year').textContent = new Date().getFullYear();
});

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
    tags: ['juegos', 'premium', 'sandbox'],
    description: `Construye, explora y sobrevive en mundos infinitos. Versión comprada, lista para instalar.`,
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
    description: `Mejorá y aumentá la resolución de tus fotos con inteligencia artificial de forma rápida y sencilla.`,
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
    description: `Optimiza tu dispositivo eliminando archivos basura, mejorando el rendimiento y extendiendo la vida útil de la batería.`,
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
    description: `Elimina fácilmente el fondo de tus fotos y crea imágenes con transparencia para tus diseños y proyectos.`,
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
    description: `Transmití tus videos y fotos a cualquier TV compatible de forma rápida y sencilla.`,
    download: 'https://srtslug.biz/8b9FM',
    mirrors: []
  },
  {
    slug: 'ccleaner-25-15-0',
    title: 'CCleaner v25.15.0 Pro Android',
    platform: 'Android',
    version: '25.15.0',
    size: '40 MB',
    cover: 'assets/img/ccleaner.png',
    tags: ['limpieza', 'rendimiento', 'optimización'],
    description: `Optimiza tu dispositivo, limpia archivos innecesarios y mejora el rendimiento con la versión Pro de CCleaner.`,
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
    description: `CCleaner PRO optimiza el rendimiento de tu PC eliminando archivos basura, limpiando registros, gestionando aplicaciones de inicio y mejorando la seguridad del sistema.`,
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
    description: `Disfrutá de TV en vivo, series, películas y anime directamente en tu celular.`,
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
    description: `Disfrutá de más de 1300 canales en vivo, películas y series sin interrupciones.`,
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
    description: `Este menú especial para Windows incluye aplicaciones portables, instaladores, limpiador de registros y optimizadores, todo en un solo paquete.`,
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
    description: `Elegí la versión que más te guste de Microsoft Office e instalala de forma rápida y sencilla.`,
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
    description: `Instalá el programa oficial de Logitech para gestionar la memoria integrada de tus periféricos.`,
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
    description: `Descargá PixelCut para crear diseños y ediciones de forma rápida y profesional.`,
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
    description: `Descargá Remini y mejorá tus fotos con inteligencia artificial de manera fácil y rápida.`,
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
    description: `Mira series y películas gratis con la última versión de Dark Play.`,
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
    description: `Windows Tiny11 es una versión ligera de Windows 11 que elimina el bloatware y no requiere altos recursos de hardware, ofreciendo una experiencia rápida incluso en PCs antiguos.`,
    download: 'https://shrtlk.click/tn11',
    mirrors: []
  },

  {
  slug: 'windows-x-lite-11',
  title: 'Windows X Lite – Windows 11 Lite',
  platform: 'Windows',
  version: '11 (Lite)',
  size: '3.15 GB',
  cover: 'assets/img/winxlite.png', // reemplazá por tu URL si querés
  tags: ['windows', 'lite', 'gaming', 'rendimiento', 'optimización', 'bajo-recursos'],
  description: `Windows X Lite es una edición ultraligera de Windows 11 pensada para máximo rendimiento. Elimina bloatware, reduce servicios en segundo plano y ajusta el sistema para menor latencia, mejor uso de CPU/RAM y arranques más rápidos. Ideal para juegos, streaming, creación de contenido y PCs de bajos recursos.`,
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
  description: `Life360 es una app de seguridad familiar con seguimiento GPS en tiempo real. Creá círculos privados, definí áreas seguras y recibí alertas de llegada/salida. Incluye historial de ubicaciones, chat entre miembros, botón SOS, detección de incidentes de manejo y reportes de conducción, ideal para cuidar a tu familia y coordinar encuentros.`,
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
  description: `Deezer Premium MOD te permite disfrutar de toda tu música favorita sin límites. Accedé a más de 90 millones de canciones, playlists y podcasts, con funciones premium desbloqueadas como descargas offline, audio de alta calidad, sin anuncios y saltos de pista ilimitados.`,
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
  description: `AdGuard Premium bloquea anuncios, pop-ups y rastreadores en apps y navegadores. Ofrece filtrado HTTPS, DNS seguro, reglas por aplicación, listas personalizadas y modo sigiloso para proteger tu privacidad y reducir consumo de datos y batería. Incluye firewall y filtros avanzados para una navegación limpia.`,
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
  description: `Temp Mail Premium crea correos temporales para proteger tu identidad y evitar spam. Recibí códigos de verificación y mensajes sin exponer tu email real. Funciones Premium: múltiples direcciones, mayor tiempo de vida, historial extendido, adjuntos, notificaciones push y sin anuncios.`,
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
  description: `Movie Plus ofrece un amplio catálogo de películas y series con reproducción rápida y estable. Incluye calidad HD/Full HD, subtítulos, búsqueda por género, lista de favoritos, reproductor integrado y soporte de casting para ver en la TV.`,
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
  description: `AI Chat es un software de Inteligencia Artificial capaz de mantener conversaciones en tiempo real por texto o voz. Basado en redes neuronales tipo GPT-4, ofrece respuestas contextuales, dictado/lectura por voz, historial, plantillas para tareas y un modo rápido para consultas frecuentes.`,
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
  description: `PlayHub+ es una app para ver películas, series y anime en HD con reproducción rápida. Ofrece un amplio catálogo y posibilidad de transmitir a la TV mediante Chromecast.`,
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
  description: `Snaptube VIP permite ver y descargar videos y música desde YouTube, Facebook y otras plataformas. Incluye buscador integrado, conversión a MP3/MP4, diferentes resoluciones, gestor de descargas y reproducción en segundo plano.`,
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
  description: `Con un toque eliminá el fondo y creá imágenes limpias para productos o retratos. Elegí fondo blanco o personalizado, corregí iluminación, agregá texto/logos, pegatinas y armá collages. Ideal para catálogos, redes y tiendas online.`,
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
  description: `Vive la historia de CJ en un mundo abierto enorme con misiones principales y secundarias, conducción, combate y personalización. Optimizado para móviles con controles táctiles y soporte para jugar sin conexión.`,
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
  description: `Corre por vías y azoteas esquivando trenes y obstáculos en este clásico endless runner. La versión MOD incluye ventajas/desbloqueos para progresar más rápido, eventos por temporadas, misiones diarias y personalización de tablas y personajes.`,
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
  description: `Editor de fotos para selfies con herramientas de retoque rápido: suavizado de piel, eliminación de imperfecciones, blanqueo dental, remodelado sutil, recorte y desenfoque de fondo, efectos, filtros y collages. Ideal para crear retratos profesionales en segundos.`,
  download: 'https://stly.link/youcam',
  mirrors: []
},









];

// ==========================
// UTILIDADES
// ==========================
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

const bySlug = (slug) => APPS.find(a => a.slug === slug);
const getDownloadUrl = (app) => {
  if (SITE.downloadEndpoint) return `${SITE.downloadEndpoint}${encodeURIComponent(app.slug)}`;
  return app.download;
};

const fmtTags = (tags=[]) => tags.map(t => `<span class="text-xs rounded-full border border-slate-700 px-2 py-0.5">${t}</span>`).join('');

const saveUnlock = (slug) => localStorage.setItem(`unlock_${slug}`, Date.now());
const isUnlocked = (slug) => !!localStorage.getItem(`unlock_${slug}`);

// ==========================
// VISTAS
// ==========================
function HomeView() {
  const grid = APPS.map(app => `
    <article class="group rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-sky-700 transition">
      <a href="#/app/${app.slug}" class="block">
        <div class="aspect-[16/9] bg-slate-800 overflow-hidden">
          <img src="${app.cover}" alt="${app.title}" loading="lazy" class="h-full w-full object-cover group-hover:scale-105 transition" />
        </div>
        <div class="p-4 flex flex-col gap-2">
          <h3 class="text-base font-semibold">${app.title}</h3>
          <p class="text-xs text-slate-400">${app.platform} · v${app.version} · ${app.size ?? ''}</p>
          <div class="flex gap-2 flex-wrap">${fmtTags(app.tags)}</div>
        </div>
      </a>
    </article>
  `).join('');

  return `
    <section class="space-y-6">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold tracking-tight">Todas las aplicaciones</h1>
          <p class="text-slate-400">${APPS.length} elementos</p>
        </div>
        <div class="flex gap-2">
          <button id="btnSortAZ" class="rounded-xl border border-slate-800 px-3 py-2 text-sm hover:bg-slate-900">A–Z</button>
          <button id="btnSortZA" class="rounded-xl border border-slate-800 px-3 py-2 text-sm hover:bg-slate-900">Z–A</button>
        </div>
      </div>
      <div id="grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">${grid}</div>
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
  } else if (route === 'app') {
    root.innerHTML = AppView(param);
    bindApp(param);
  } else {
    root.innerHTML = NotFoundView();
  }
}

// ==========================
// BINDINGS
// ==========================
function bindHome(){
  const grid = document.getElementById('grid');
  const search = document.getElementById('searchInput');

  const applyFilter = () => {
    const q = (search.value || '').toLowerCase();
    const filtered = APPS.filter(a => (
      a.title.toLowerCase().includes(q) ||
      a.tags?.some(t => t.toLowerCase().includes(q)) ||
      (a.platform||'').toLowerCase().includes(q)
    ));
    grid.innerHTML = filtered.map(app => `
      <article class="group rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-sky-700 transition">
        <a href="#/app/${app.slug}" class="block">
          <div class="aspect-[16/9] bg-slate-800 overflow-hidden">
            <img src="${app.cover}" alt="${app.title}" loading="lazy" class="h-full w-full object-cover group-hover:scale-105 transition" />
          </div>
          <div class="p-4 flex flex-col gap-2">
            <h3 class="text-base font-semibold">${app.title}</h3>
            <p class="text-xs text-slate-400">${app.platform} · v${app.version} · ${app.size ?? ''}</p>
            <div class="flex gap-2 flex-wrap">${fmtTags(app.tags)}</div>
          </div>
        </a>
      </article>`).join('');
  };
  search.addEventListener('input', applyFilter);

  $('#btnSortAZ').onclick = () => {
    APPS.sort((a,b)=>a.title.localeCompare(b.title));
    applyFilter();
  };
  $('#btnSortZA').onclick = () => {
    APPS.sort((a,b)=>b.title.localeCompare(a.title));
    applyFilter();
  };
}

function bindApp(slug){
  const app = bySlug(slug);
  if (!app) return;

  const btnDownload = document.getElementById('btnDownload');
  const timerWrap = document.getElementById('timerWrap');
  const timerNum = document.getElementById('timerNum');
  const progress = document.getElementById('progress');

  // desbloqueado previamente
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

  $('#btnSubPrincipal').addEventListener('click', () => {
    clickedPrincipal = true;
    checkReady();
  });
  $('#btnSubSecundario').addEventListener('click', () => {
    clickedSecundario = true;
    checkReady();
  });

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

// ==========================
// INIT
// ==========================
window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

