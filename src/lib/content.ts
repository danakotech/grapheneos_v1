/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

/* Contenido único del sitio: de aquí salen las páginas, el JSON-LD, el sitemap y los llms.txt. */

export const SITE = "https://www.grapheneos.es";
export const BRAND = "GrapheneOS.es";
export const OWNER = { name: "danakotech", url: "https://github.com/danakotech" };
export const OFFICIAL = {
  home: "https://grapheneos.org",
  web: "https://grapheneos.org/install/web",
  cli: "https://grapheneos.org/install/cli",
  faq: "https://grapheneos.org/faq",
  features: "https://grapheneos.org/features",
  releases: "https://grapheneos.org/releases",
  donate: "https://grapheneos.org/donate",
  attestation: "https://attestation.app",
  hashes: "https://grapheneos.org/install/web#verifying-installation",
};
export const UPDATED = "2026-10-29";

export const NAV = [
  { href: "/#que-es", label: "Qué es" },
  { href: "/#seguridad", label: "Seguridad" },
  { href: "/dispositivos", label: "Dispositivos" },
  { href: "/instalar", label: "Instalar" },
  { href: "/preguntas-frecuentes", label: "FAQ" },
];

export const INTRO =
  "GrapheneOS es un sistema operativo móvil libre y de código abierto, centrado en la privacidad y la seguridad, compatible con las apps de Android. Se instala en teléfonos Google Pixel y endurece cada capa del sistema: memoria, kernel, permisos, arranque y red. No trae servicios de Google, pero puedes instalar Google Play dentro de una caja aislada, como una app más y sin privilegios especiales.";

/* —— El problema: lo que hace un móvil corriente —— */
export const THREATS = [
  { k: "Rastreo", t: "Identificadores publicitarios, telemetría y SDK de terceros dentro de apps que comparten tu actividad." },
  { k: "Permisos amplios", t: "Apps con acceso a red, sensores y archivos que no necesitan para funcionar." },
  { k: "Exploits", t: "Fallos de memoria que permiten a software espía tomar el control sin que toques nada (ataques zero-click)." },
  { k: "Servicios privilegiados", t: "Componentes del fabricante con acceso total al sistema que no puedes limitar ni auditar." },
];

/* —— Capas de defensa (resumen de grapheneos.org/features) —— */
export const LAYERS = [
  {
    id: "memoria",
    name: "Memoria blindada",
    tag: "hardened_malloc · MTE",
    text: "Asignador de memoria endurecido propio y etiquetado de memoria por hardware (MTE) en Pixel 8 y posteriores: muchos fallos que el software espía explota se detectan y bloquean antes de que sirvan para atacar.",
  },
  {
    id: "sandbox",
    name: "Sandbox reforzado",
    tag: "SELinux · seccomp",
    text: "Las apps quedan más aisladas entre sí y del sistema. El kernel y el sistema base se compilan con mitigaciones extra contra exploits y se reduce la superficie de ataque.",
  },
  {
    id: "permisos",
    name: "Permisos que mandas tú",
    tag: "Red · Sensores · Ámbitos",
    text: "Permiso de Red y de Sensores por app, Ámbitos de almacenamiento y Ámbitos de contactos: das a cada app solo lo que tú decides, sin que lo note.",
  },
  {
    id: "arranque",
    name: "Arranque verificado",
    tag: "Verified Boot · Auditor",
    text: "Con el bootloader bloqueado de nuevo, cada arranque comprueba criptográficamente que el sistema no se ha modificado. La app Auditor permite verificarlo con atestación por hardware.",
  },
  {
    id: "bloqueo",
    name: "Bloqueo de verdad",
    tag: "USB-C · Reinicio automático",
    text: "El puerto USB-C deja de transmitir datos con el móvil bloqueado, el teléfono se reinicia solo tras un tiempo sin desbloquear (vuelve al estado cifrado) y el PIN puede tener teclado aleatorio y PIN de emergencia que borra el dispositivo.",
  },
  {
    id: "red",
    name: "Red discreta",
    tag: "MAC aleatoria · Vanadium",
    text: "Dirección MAC aleatoria por conexión Wi-Fi, modo solo LTE, Wi-Fi y Bluetooth que se apagan solos y Vanadium, un navegador basado en Chromium con protecciones adicionales.",
  },
];

export const PLAY = {
  title: "Google Play, pero dentro de una caja",
  text: "En Android normal, los servicios de Google forman parte del sistema y tienen acceso privilegiado. En GrapheneOS no vienen instalados. Si los necesitas, los instalas desde la tienda de apps de GrapheneOS y funcionan como una app normal, dentro del sandbox estándar y sin permisos especiales. Puedes ponerlos solo en un perfil de usuario y dejar el resto del móvil libre de Google.",
  points: [
    "Sin acceso privilegiado al sistema",
    "Revocas sus permisos como los de cualquier app",
    "Aislables en un perfil secundario o Espacio privado",
    "Compatibilidad con la mayoría de apps de Play Store",
  ],
};

export const COMPARE = [
  { k: "Servicios de Google", a: "Integrados y con privilegios", b: "Opcionales, aislados como una app" },
  { k: "Permiso de red por app", a: "No existe", b: "Sí, lo activas o quitas por app" },
  { k: "Permiso de sensores", a: "No existe", b: "Sí, por app" },
  { k: "Memoria endurecida", a: "Asignador estándar", b: "hardened_malloc + MTE" },
  { k: "USB-C con el móvil bloqueado", a: "Datos activos", b: "Solo carga (configurable)" },
  { k: "Reinicio automático", a: "No (llegó parcialmente después)", b: "Sí, por defecto a las 18 h" },
  { k: "PIN de emergencia que borra", a: "No", b: "Sí" },
  { k: "Código fuente", a: "Partes cerradas del fabricante", b: "100 % abierto" },
];

/* —— Dispositivos (fuente: grapheneos.org/faq, octubre de 2026) —— */
export type Device = { name: string; code: string; until: string; years: number; gen: number; rec: boolean; mte: boolean };
export const DEVICES: Device[] = [
  { name: "Pixel 10a", code: "stallion", until: "marzo de 2033", years: 7, gen: 10, rec: true, mte: true },
  { name: "Pixel 10 Pro Fold", code: "rango", until: "octubre de 2032", years: 7, gen: 10, rec: true, mte: true },
  { name: "Pixel 10 Pro XL", code: "mustang", until: "agosto de 2032", years: 7, gen: 10, rec: true, mte: true },
  { name: "Pixel 10 Pro", code: "blazer", until: "agosto de 2032", years: 7, gen: 10, rec: true, mte: true },
  { name: "Pixel 10", code: "frankel", until: "agosto de 2032", years: 7, gen: 10, rec: true, mte: true },
  { name: "Pixel 9a", code: "tegu", until: "abril de 2032", years: 7, gen: 9, rec: true, mte: true },
  { name: "Pixel 9 Pro Fold", code: "comet", until: "agosto de 2031", years: 7, gen: 9, rec: true, mte: true },
  { name: "Pixel 9 Pro XL", code: "komodo", until: "agosto de 2031", years: 7, gen: 9, rec: true, mte: true },
  { name: "Pixel 9 Pro", code: "caiman", until: "agosto de 2031", years: 7, gen: 9, rec: true, mte: true },
  { name: "Pixel 9", code: "tokay", until: "agosto de 2031", years: 7, gen: 9, rec: true, mte: true },
  { name: "Pixel 8a", code: "akita", until: "mayo de 2031", years: 7, gen: 8, rec: true, mte: true },
  { name: "Pixel 8 Pro", code: "husky", until: "octubre de 2030", years: 7, gen: 8, rec: true, mte: true },
  { name: "Pixel 8", code: "shiba", until: "octubre de 2030", years: 7, gen: 8, rec: true, mte: true },
  { name: "Pixel Fold", code: "felix", until: "junio de 2028", years: 5, gen: 7, rec: false, mte: false },
  { name: "Pixel Tablet", code: "tangorpro", until: "junio de 2028", years: 5, gen: 7, rec: false, mte: false },
  { name: "Pixel 7a", code: "lynx", until: "mayo de 2028", years: 5, gen: 7, rec: false, mte: false },
  { name: "Pixel 7 Pro", code: "cheetah", until: "octubre de 2027", years: 5, gen: 7, rec: false, mte: false },
  { name: "Pixel 7", code: "panther", until: "octubre de 2027", years: 5, gen: 7, rec: false, mte: false },
  { name: "Pixel 6a", code: "bluejay", until: "julio de 2027", years: 5, gen: 6, rec: false, mte: false },
  { name: "Pixel 6 Pro", code: "raven", until: "octubre de 2026", years: 5, gen: 6, rec: false, mte: false },
  { name: "Pixel 6", code: "oriole", until: "octubre de 2026", years: 5, gen: 6, rec: false, mte: false },
];
export const LEGACY = "Pixel 5a, Pixel 5, Pixel 4a (5G), Pixel 4a, Pixel 4 / 4 XL, Pixel 3a / 3a XL, Pixel 3 / 3 XL y anteriores";

export const DEVICE_NOTES = [
  "Compra siempre un Pixel libre. Los Pixel bloqueados por operador (habituales en EE. UU.) no permiten activar el desbloqueo OEM.",
  "Se recomienda Pixel 8 o posterior: 7 años de actualizaciones y etiquetado de memoria por hardware (MTE).",
  "Motorola anunció en el MWC 2026 una alianza con GrapheneOS. Sus primeros móviles compatibles se esperan a partir de 2027.",
];

/* —— Instalación con el instalador web oficial —— */
export const REQUIREMENTS = [
  { k: "Teléfono", t: "Un Pixel compatible y libre (no bloqueado por operador), con la batería cargada." },
  { k: "Ordenador", t: "Windows 10/11, macOS, Linux (Debian, Ubuntu, Arch, Mint), ChromeOS o incluso otro móvil Android. Con 2 GB de RAM y 32 GB libres." },
  { k: "Navegador", t: "Chrome, Chromium, Edge, Brave (sin Shields) o Vanadium, actualizado. No vale Firefox ni Safari, y tampoco el modo incógnito." },
  { k: "Cable", t: "El cable USB-C original o uno de calidad. Conéctalo directamente al ordenador, sin hubs." },
];

export type Step = { n: number; title: string; time: string; text: string; tip?: string; warn?: string };
export const STEPS: Step[] = [
  {
    n: 1,
    title: "Haz copia de seguridad",
    time: "5 min",
    text: "Instalar GrapheneOS borra todo el teléfono. Guarda fotos, chats y contraseñas en otro sitio antes de empezar.",
    warn: "Se borrarán todos los datos del móvil.",
  },
  {
    n: 2,
    title: "Activa el desbloqueo OEM",
    time: "1 min",
    text: "Ajustes › Información del teléfono › toca 7 veces «Número de compilación». Después, Ajustes › Sistema › Opciones para desarrolladores › activa «Desbloqueo de OEM».",
    tip: "El móvil debe tener conexión a internet para que la opción se pueda activar.",
  },
  {
    n: 3,
    title: "Arranca en modo bootloader",
    time: "1 min",
    text: "Apaga el móvil y enciéndelo manteniendo pulsado el botón de bajar volumen. Verás un triángulo rojo y «Fastboot Mode». No pulses «Start».",
  },
  {
    n: 4,
    title: "Conéctalo al ordenador",
    time: "1 min",
    text: "Abre grapheneos.org/install/web en un navegador compatible y conecta el cable. En Windows, si no lo reconoce, instala el controlador de fastboot desde Windows Update.",
    tip: "En Linux, instala las reglas udev (android-udev o android-sdk-platform-tools-common).",
  },
  {
    n: 5,
    title: "Desbloquea el bootloader",
    time: "1 min",
    text: "Pulsa «Unlock bootloader» en el instalador y confírmalo en el móvil: con los botones de volumen eliges la opción y con el de encendido la aceptas.",
    warn: "Este paso borra el teléfono.",
  },
  {
    n: 6,
    title: "Descarga GrapheneOS",
    time: "3–10 min",
    text: "Pulsa «Download release». El instalador elige automáticamente la versión para tu modelo y la descarga en el navegador.",
  },
  {
    n: 7,
    title: "Instala la versión",
    time: "5–10 min",
    text: "Pulsa «Flash release» y espera sin tocar el móvil ni el cable. Se reiniciará varias veces mientras escribe el firmware y el sistema.",
  },
  {
    n: 8,
    title: "Vuelve a bloquear el bootloader",
    time: "1 min",
    text: "Pulsa «Lock bootloader» y confírmalo en el móvil. Este paso es imprescindible: activa el arranque verificado y la protección completa.",
    warn: "Vuelve a borrar los datos, así que hazlo antes de configurar nada.",
  },
  {
    n: 9,
    title: "Primer arranque",
    time: "3 min",
    text: "Elige «Start» en el bootloader. En la última pantalla del asistente, desactiva el interruptor de desbloqueo OEM, que viene activado.",
  },
  {
    n: 10,
    title: "Verifica la instalación",
    time: "2 min",
    text: "Al arrancar verás un aviso amarillo con el hash de la clave de arranque verificado: compáralo con el publicado para tu modelo en grapheneos.org. Para la comprobación más fuerte, usa la app Auditor desde un segundo Android.",
  },
];

export const AFTER = [
  { k: "Google Play opcional", t: "Abre la app «Tienda» (App Store) de GrapheneOS e instala Google Play Services si tus apps lo necesitan." },
  { k: "Revisa los permisos", t: "Quita el permiso de Red o de Sensores a las apps que no lo necesiten." },
  { k: "Perfiles", t: "Crea un perfil de trabajo, un perfil con Google o un Espacio privado para separar tu vida digital." },
  { k: "Actualizaciones", t: "Se descargan e instalan solas en segundo plano. Basta con reiniciar cuando te avise." },
];

/* —— Preguntas frecuentes —— */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "¿Qué es GrapheneOS?",
    a: "Es un sistema operativo móvil libre y de código abierto, basado en el Android Open Source Project (AOSP), que añade mejoras profundas de privacidad y seguridad. Lo desarrolla la GrapheneOS Foundation, una organización sin ánimo de lucro, y es compatible con las apps de Android.",
  },
  {
    q: "¿Es gratis?",
    a: "Sí. Es gratuito y de código abierto. El proyecto se financia con donaciones en grapheneos.org/donate.",
  },
  {
    q: "¿Funcionan WhatsApp, Telegram, el banco y mis apps?",
    a: "La gran mayoría, sí. Con Google Play en sandbox funcionan las notificaciones push, la Play Store y la mayoría de apps. Unas pocas apps bancarias y de pagos bloquean los sistemas que no son de Google mediante la Play Integrity API. Los pagos sin contacto de Google Wallet no funcionan, pero sí las alternativas de algunos bancos.",
  },
  {
    q: "¿Por qué solo funciona en Google Pixel?",
    a: "Porque GrapheneOS exige requisitos de hardware que hoy solo cumplen los Pixel: bootloader que se puede volver a bloquear con las claves del propio sistema, elemento seguro (Titan M2), parches de firmware puntuales, 5 a 7 años de soporte y etiquetado de memoria (MTE). Motorola trabaja con el proyecto para tener móviles compatibles a partir de 2027.",
  },
  {
    q: "¿Es difícil de instalar?",
    a: "No. Con el instalador web oficial se hace desde el navegador en unos 15–30 minutos, sin comandos. Basta con seguir los pasos de la guía de esta web.",
  },
  {
    q: "¿Necesito un ordenador con Linux?",
    a: "No. Sirve un ordenador con Windows 10/11, macOS, Linux o ChromeOS, e incluso otro móvil Android con un navegador basado en Chromium.",
  },
  {
    q: "¿Pierdo la garantía?",
    a: "Google permite desbloquear el bootloader de los Pixel libres y GrapheneOS lo vuelve a bloquear al terminar. En la UE, la garantía legal cubre los defectos de hardware. Si alguna vez la necesitas, puedes volver a Android de serie antes de enviarlo.",
  },
  {
    q: "¿Puedo volver a Android de serie?",
    a: "Sí, en cualquier momento. Instalas las imágenes de fábrica de Google con la herramienta Android Flash Tool y vuelves a bloquear el bootloader.",
  },
  {
    q: "¿Cómo se actualiza?",
    a: "Con actualizaciones automáticas que se instalan en segundo plano sobre la partición inactiva. Solo hay que reiniciar. Los parches de seguridad suelen llegar en cuanto se publican.",
  },
  {
    q: "¿Afecta a la batería o la cámara?",
    a: "La batería suele igualar o mejorar la de Android de serie porque no hay servicios de Google consumiendo en segundo plano. Incluye su propia app de cámara, y la cámara de Pixel también funciona con Google Play en sandbox.",
  },
  {
    q: "¿Puedo hacer root?",
    a: "No se recomienda. El root rompe el modelo de seguridad (arranque verificado, sandbox) que hace a GrapheneOS lo que es.",
  },
  {
    q: "¿Es legal usar GrapheneOS?",
    a: "Sí. Instalar un sistema operativo libre en un teléfono de tu propiedad es completamente legal en España y en la UE.",
  },
  {
    q: "¿Es esta la web oficial?",
    a: "No. GrapheneOS.es es una guía divulgativa e independiente en español. La web oficial del proyecto es grapheneos.org, y es de donde debes descargar siempre el sistema.",
  },
];
