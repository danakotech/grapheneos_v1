/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import type { MetadataRoute } from "next";
import { UPDATED } from "@/lib/content";
import { abs } from "@/lib/schema";

const PAGES: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/instalar", priority: 0.95, freq: "monthly" },
  { path: "/dispositivos", priority: 0.9, freq: "monthly" },
  { path: "/preguntas-frecuentes", priority: 0.85, freq: "monthly" },
  { path: "/aviso-legal", priority: 0.2, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: abs(p.path),
    lastModified: new Date(UPDATED),
    changeFrequency: p.freq,
    priority: p.priority,
    images: p.path === "/" ? [abs("/opengraph-image")] : undefined,
  }));
}
