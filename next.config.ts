/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import type { NextConfig } from "next";
import path from "node:path";

const root = path.resolve(__dirname);
const dev = process.env.NODE_ENV !== "production";

/* Una web sobre seguridad debe dar ejemplo: CSP estricta, sin recursos de terceros. */
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${dev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Hay un package-lock.json en $HOME: fijar la raíz evita el bucle de recarga en dev.
  turbopack: { root },
  outputFileTracingRoot: root,
  poweredByHeader: false,
  async redirects() {
    return [
      // Canónica con www
      { source: "/:path*", has: [{ type: "host", value: "grapheneos.es" }], destination: "https://www.grapheneos.es/:path*", permanent: true },
      { source: "/instalacion", destination: "/instalar", permanent: true },
      { source: "/faq", destination: "/preguntas-frecuentes", permanent: true },
      { source: "/compatibilidad", destination: "/dispositivos", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), usb=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
