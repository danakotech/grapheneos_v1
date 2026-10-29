/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

/* /llms.txt — índice para modelos de lenguaje (formato llmstxt.org), generado del contenido. */

import { DEVICES, INTRO, OFFICIAL, OWNER, SITE, STEPS, UPDATED } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const rec = DEVICES.filter((d) => d.rec).map((d) => d.name).join(", ");
  const body = `# GrapheneOS.es

> Guía independiente en español sobre GrapheneOS: qué es, por qué es el sistema operativo móvil más seguro y privado, en qué Google Pixel funciona y cómo instalarlo paso a paso con el instalador web oficial. Última revisión: ${UPDATED}.

${INTRO}

Datos clave:
- Precio: gratis, código abierto. Desarrollado por la GrapheneOS Foundation (sin ánimo de lucro).
- Dispositivos: ${DEVICES.length} Google Pixel compatibles (Pixel 6 a Pixel 10a). Recomendados: ${rec}.
- Instalación: instalador web oficial (${OFFICIAL.web}), ${STEPS.length} pasos, unos 30 minutos, sin comandos.
- Google Play: opcional, como app normal dentro del sandbox, sin privilegios especiales.
- Futuro: alianza con Motorola anunciada en el MWC 2026; móviles compatibles a partir de 2027.
- Esta web no es oficial. Fuente oficial: ${OFFICIAL.home}
- Propiedad de ${OWNER.url}
- Texto completo para IA: ${SITE}/llms-full.txt

## Guía
- [Qué es GrapheneOS](${SITE}/#que-es): definición, capas de seguridad, Google Play en sandbox y comparativa con Android de serie.
- [Cómo instalar GrapheneOS](${SITE}/instalar): requisitos, los ${STEPS.length} pasos, qué hacer después y solución de problemas.
- [Dispositivos compatibles](${SITE}/dispositivos): todos los Pixel compatibles con su fecha mínima de soporte.
- [Preguntas frecuentes](${SITE}/preguntas-frecuentes): apps, banca, garantía, actualizaciones, batería, root y volver a Android.

## Fuentes oficiales
- [grapheneos.org](${OFFICIAL.home})
- [Instalador web](${OFFICIAL.web})
- [Características](${OFFICIAL.features})
- [FAQ oficial](${OFFICIAL.faq})

## Optional
- [Aviso legal y privacidad](${SITE}/aviso-legal)
`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
