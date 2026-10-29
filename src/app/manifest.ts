/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GrapheneOS.es · Guía en español",
    short_name: "GrapheneOS.es",
    description: "Qué es GrapheneOS y cómo instalarlo en tu Google Pixel.",
    start_url: "/",
    display: "standalone",
    background_color: "#030508",
    theme_color: "#030508",
    lang: "es",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
