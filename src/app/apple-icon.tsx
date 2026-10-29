/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#030508", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="132" height="132" viewBox="0 0 48 48">
          <path d="M24 5 L40 14.2 V33.8 L24 43 L8 33.8 V14.2 Z" fill="none" stroke="#4ff5c9" strokeWidth="3" strokeLinejoin="round" />
          <path d="M24 14.5 L32 19.1 V28.4 L24 33 L16 28.4 V19.1 Z" fill="#4ff5c9" opacity="0.25" />
          <circle cx="24" cy="23.8" r="3.6" fill="#4ff5c9" />
        </svg>
      </div>
    ),
    size,
  );
}
