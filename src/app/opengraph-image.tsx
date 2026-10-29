/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import { ImageResponse } from "next/og";

export const alt = "GrapheneOS en español: qué es y cómo instalarlo en tu Pixel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Phone({ safe }: { safe: boolean }) {
  const c = safe ? "#4ff5c9" : "#ff3358";
  return (
    <div
      style={{
        width: 150,
        height: 300,
        borderRadius: 26,
        border: `4px solid ${c}`,
        background: safe ? "rgba(79,245,201,0.08)" : "rgba(255,51,88,0.10)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 60px ${safe ? "rgba(79,245,201,0.45)" : "rgba(255,51,88,0.35)"}`,
      }}
    >
      <svg width="70" height="70" viewBox="0 0 64 64">
        <path d={safe ? "M20 28 V19 a12 12 0 0 1 24 0 V28" : "M20 28 V19 a12 12 0 0 1 23 -5"} fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" />
        <rect x="12" y="28" width="40" height="28" rx="6" fill={c} />
      </svg>
    </div>
  );
}

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 78% 45%, #0c2a26 0%, #030508 55%)",
          color: "#eaf6f3",
          display: "flex",
          padding: 70,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#4ff5c9" }}>GRAPHENEOS.ES · GUÍA EN ESPAÑOL</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 84, lineHeight: 1.02, letterSpacing: -3, fontWeight: 700 }}>Tu móvil,</div>
            <div style={{ display: "flex", fontSize: 84, lineHeight: 1.02, letterSpacing: -3, fontWeight: 700, color: "#4ff5c9" }}>blindado.</div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 32, color: "#a9bcb8", maxWidth: 600 }}>Qué es GrapheneOS y cómo instalarlo en tu Pixel en 30 minutos.</div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6f8a85" }}>www.grapheneos.es</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <Phone safe={false} />
          <div style={{ display: "flex", fontSize: 54, color: "#4ff5c9" }}>→</div>
          <Phone safe />
        </div>
      </div>
    ),
    size,
  );
}
