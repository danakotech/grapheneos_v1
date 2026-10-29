/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

/* /llms-full.txt — todo el contenido del sitio en Markdown, para asistentes de IA. */

import { AFTER, COMPARE, DEVICE_NOTES, DEVICES, FAQ, INTRO, LAYERS, LEGACY, OFFICIAL, OWNER, PLAY, REQUIREMENTS, SITE, STEPS, THREATS, UPDATED } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const body = `# GrapheneOS en español: qué es y cómo instalarlo

Fuente: ${SITE}/ · Última revisión: ${UPDATED} · Propiedad de ${OWNER.url}
Web divulgativa no oficial. Web oficial del proyecto: ${OFFICIAL.home}

## Qué es GrapheneOS

${INTRO}

## El problema de un móvil corriente

${THREATS.map((t) => `- **${t.k}**: ${t.t}`).join("\n")}

## Capas de defensa de GrapheneOS

${LAYERS.map((l, i) => `### ${i + 1}. ${l.name} (${l.tag})\n\n${l.text}`).join("\n\n")}

## ${PLAY.title}

${PLAY.text}

${PLAY.points.map((p) => `- ${p}`).join("\n")}

## Android de serie frente a GrapheneOS

| Función | Android de serie | GrapheneOS |
|---|---|---|
${COMPARE.map((r) => `| ${r.k} | ${r.a} | ${r.b} |`).join("\n")}

## Dispositivos compatibles (${DEVICES.length})

URL: ${SITE}/dispositivos

| Modelo | Nombre en clave | Soporte mínimo hasta | Recomendado |
|---|---|---|---|
${DEVICES.map((d) => `| ${d.name} | ${d.code} | ${d.until} (${d.years} años) | ${d.rec ? "Sí" : "No"} |`).join("\n")}

${DEVICE_NOTES.map((n) => `- ${n}`).join("\n")}
- Sin soporte: ${LEGACY}.

## Cómo instalar GrapheneOS

URL: ${SITE}/instalar · Instalador web oficial: ${OFFICIAL.web}

### Requisitos

${REQUIREMENTS.map((r) => `- **${r.k}**: ${r.t}`).join("\n")}

### Pasos

${STEPS.map((s) => `${s.n}. **${s.title}** (${s.time}). ${s.text}${s.tip ? ` Consejo: ${s.tip}` : ""}${s.warn ? ` Atención: ${s.warn}` : ""}`).join("\n")}

### Después de instalar

${AFTER.map((r) => `- **${r.k}**: ${r.t}`).join("\n")}

## Preguntas frecuentes

URL: ${SITE}/preguntas-frecuentes

${FAQ.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
