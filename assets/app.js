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
    tags: ['Aplicaciones', 'premium', 'sandbox'],
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
    cover: 'https://i.ytimg.com/vi/8wJYuwXs9uw/maxresdefault.jpg',
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
    cover: 'assets/img/winxlite.png',
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
  {
    slug: 'proton-vpn-premium-5-12-48-0',
    title: 'Proton VPN v5.12.48.0 [Premium]',
    platform: 'Android',
    version: '5.12.48.0',
    size: '49 MB',
    cover: 'assets/img/proton.jpg',
    tags: ['vpn', 'privacidad', 'seguridad', 'netshield', 'wireguard', 'kill switch', 'streaming'],
    description: `Proton VPN Premium ofrece navegación segura y sin registros, cifrado de nivel militar y NetShield para bloquear anuncios y rastreadores. Incluye Secure Core (doble salto), split tunneling, kill switch y soporte para WireGuard/OpenVPN. Ideal para streaming, gaming y protegerte en redes Wi-Fi públicas.`,
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
    description: `Defendé tu jardín en el clásico tower defense con plantas, poderes y mundos temáticos. La edición MOD suele incluir ventajas/desbloqueos para acelerar la progresión (puede variar según el build). Ideal para partidas rápidas offline y completar eventos por tiempo.`,
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
    description: `App de IPTV con TV en vivo, películas y series enfocada en contenido latino. Ofrece reproducción rápida en HD, servidores estables, buscador, favoritos, guía/EPG, subtítulos y soporte para Chromecast.`,
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
    description: `Edición optimizada para Android TV y TV Box. Interfaz para control remoto, navegación por categorías, guía/EPG, búsqueda, favoritos y reproducción estable en HD/Full HD con subtítulos. Ideal para ver canales latinos, películas y series directamente en la TV.`,
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
    description: `Editor de video completo con plantillas, efectos, transiciones y filtros. Soporta exportación en HD/4K, edición por capas, keyframes, cámara lenta/velocidad, eliminación de fondo (chroma), auto-subtítulos y sincronización con música. Versión Premium sin marcas de agua y con recursos desbloqueados.`,
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
    description: `Editor todo en uno para fotos y videos con filtros, efectos, stickers, collages, texto y pinceles. Incluye herramientas de IA: eliminación de fondo/objetos, retoque automático, estilos “Magic” y plantillas premium. Exportá en alta calidad sin marca de agua.`,
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
    description: `Emulador PSP de alto rendimiento para Android con amplia compatibilidad. Ofrece escalado de resolución, filtros, control táctil personalizable, soporte para gamepad, guardado rápido (save states), carga de texturas y motores Vulkan/OpenGL para mayor fluidez a 60 FPS.`,
    download: 'https://stfly.vip/ppsspp',
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
  // Barra superior con título + ordenar + filtros
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

        <!-- Filtros -->
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

  // Contenedor del grid + Paginador
  return `
    <section class="space-y-6">
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

// Categoría automática para el filtro
function deriveCategory(app) {
  const tags = (app.tags || []).map(t => t.toLowerCase());
  const title = (app.title || '').toLowerCase();
  const platform = (app.platform || '').toLowerCase();

  // Juegos (por tags)
  const gameHints = ['juego','juegos','arcade','runner','acción','mundo abierto','estrategia','tower defense'];
  if (tags.some(t => gameHints.includes(t))) return 'juegos';

  // Windows: decidir Programas vs Sistemas (Lite/Tiny/OS)
  if (platform.startsWith('windows')) {
    const isOS =
      tags.includes('lite') ||
      tags.includes('bajo-recursos') ||
      title.includes('tiny') ||
      title.includes('x lite') ||
      title.includes('versión lite');
    return isOS ? 'sistemas' : 'programas';
  }

  // Resto (Android, etc.)
  return 'aplicaciones';
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
// BINDINGS (HOME) – con paginación
// ==========================
function bindHome() {
  const grid = document.getElementById('grid');
  const search = document.getElementById('searchInput');
  const radios = Array.from(document.querySelectorAll('input[name="cat"]'));
  const resultCount = document.getElementById('resultCount');

  // NEW: paginador
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  const pageInfo = document.getElementById('pageInfo');

  let currentSort = 'AZ'; // 'AZ' | 'ZA'
  const state = {
    page: 1,
    perPage: 8, // <<--- Cambiá a 6 si preferís 6 por página
    filtered: []
  };

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

    // ordenar base
    const sorted = [...APPS].sort((a,b) =>
      currentSort === 'AZ' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

    // filtrar por búsqueda + categoría
    state.filtered = sorted.filter(app => {
      const cat = deriveCategory(app);
      const matchesCat = (selected === 'todos') ? true : (cat === selected);
      const matchesText =
        normalize(app.title).includes(q) ||
        normalize(app.platform).includes(q) ||
        (app.tags || []).some(t => normalize(t).includes(q));
      return matchesCat && matchesText;
    });

    // reset a primera página al cambiar filtros/búsqueda/orden
    state.page = 1;

    // actualizar contador
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
    if (nextPageBtn) nextPageBtn.disabled = state.page >= totalPages || total === 0;
  }

  // eventos de búsqueda / filtros / orden
  search?.addEventListener('input', applyFilters);
  radios.forEach(r => r.addEventListener('change', applyFilters));

  $('#btnSortAZ').onclick = () => { currentSort = 'AZ'; applyFilters(); };
  $('#btnSortZA').onclick = () => { currentSort = 'ZA'; applyFilters(); };

  // eventos de paginación
  prevPageBtn?.addEventListener('click', () => {
    if (state.page > 1) { state.page--; renderPage(); }
  });
  nextPageBtn?.addEventListener('click', () => {
    state.page++; renderPage();
  });

  // primera render con filtros por defecto
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
