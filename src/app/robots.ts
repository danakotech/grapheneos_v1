/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

/* Buscadores y asistentes de IA son bienvenidos: el contenido está pensado para ser citado. */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "cohere-ai",
  "meta-externalagent",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_BOTS, allow: ["/", "/llms.txt", "/llms-full.txt"] },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
