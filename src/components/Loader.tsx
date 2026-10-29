/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */
"use client";

/*
 * Pantalla de carga (≈4 s, una vez por sesión): un móvil vulnerable se convierte en un móvil protegido.
 * El HTML llega en el servidor y la animación es CSS pura, así que arranca con la primera pintura;
 * este componente solo decide cuándo retirarla. Sin JS (buscadores) no se muestra.
 */

import { useEffect, useState } from "react";

const BAD = ["Ubicación compartida con 14 apps", "Micrófono activo en segundo plano", "Rastreador publicitario detectado", "Datos enviados a 37 servidores"];
const GOOD = ["Memoria blindada · MTE", "Red bloqueada a 9 apps", "Arranque verificado", "USB-C cerrado"];

export default function Loader() {
  const [state, setState] = useState<"on" | "out" | "gone">("on");

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("seen")) {
      setState("gone");
      return;
    }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 1400 : 4000;
    let t2: ReturnType<typeof setTimeout>;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setState("out");
      html.classList.remove("loading");
      try {
        sessionStorage.setItem("gos-intro", "1");
      } catch {}
      dispatchEvent(new Event("gos:intro"));
      t2 = setTimeout(() => setState("gone"), 750);
    };
    // Los 4 s cuentan desde que arrancó la animación CSS (primera pintura), no desde la navegación.
    const spin = document.querySelector(".ldr__phone")?.getAnimations()[0];
    const elapsed = typeof spin?.currentTime === "number" ? spin.currentTime : Math.max(0, performance.now() - 300);
    const t1 = setTimeout(finish, Math.max(150, total - elapsed));
    const skip = (e: KeyboardEvent) => e.key === "Escape" && finish();
    addEventListener("keydown", skip);
    (window as unknown as { __gosSkip?: () => void }).__gosSkip = () => {
      clearTimeout(t1);
      finish();
    };
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      removeEventListener("keydown", skip);
    };
  }, []);

  if (state === "gone") return null;

  return (
    <div className={`ldr${state === "out" ? " ldr--out" : ""}`} role="status" aria-live="polite" aria-label="Cargando GrapheneOS.es">
      <div className="ldr__grid" aria-hidden="true" />
      <div className="ldr__stage" aria-hidden="true">
        <div className="ldr__waves">
          <i />
          <i />
          <i />
        </div>
        <div className="ldr__threats">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} style={{ "--a": `${i * 30}deg`, "--d": `${(i % 4) * 0.12}s` } as React.CSSProperties} />
          ))}
        </div>
        <div className="ldr__phone">
          <div className="ldr__face ldr__front">
            <div className="ldr__screen">
              <div className="ldr__bad">
                <svg className="ldr__crack" viewBox="0 0 200 420" preserveAspectRatio="none">
                  <path d="M120 0 L104 70 L132 118 L96 170 L118 214 L84 270" />
                  <path d="M132 118 L176 140 L200 132" />
                  <path d="M96 170 L40 186 L0 176" />
                  <path d="M118 214 L160 262 L170 330" />
                </svg>
                <svg className="ldr__lock ldr__lock--open" viewBox="0 0 64 64">
                  <path d="M20 28 V19 a12 12 0 0 1 23 -5" />
                  <rect x="12" y="28" width="40" height="28" rx="6" />
                  <path d="M32 38 v8" />
                </svg>
                <b className="ldr__risk">RIESGO ALTO</b>
                <ul className="ldr__pops">
                  {BAD.map((t, i) => (
                    <li key={t} style={{ "--i": i } as React.CSSProperties}>
                      <span>!</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ldr__good">
                <svg className="ldr__lock ldr__lock--shut" viewBox="0 0 64 64">
                  <path d="M20 28 V19 a12 12 0 0 1 24 0 V28" />
                  <rect x="12" y="28" width="40" height="28" rx="6" />
                  <path d="M25 42 l5 5 l10 -10" />
                </svg>
                <b className="ldr__ok">PROTEGIDO</b>
                <ul className="ldr__pops ldr__pops--good">
                  {GOOD.map((t, i) => (
                    <li key={t} style={{ "--i": i } as React.CSSProperties}>
                      <span>✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ldr__scan" />
            </div>
            <div className="ldr__punch" />
          </div>
          <div className="ldr__face ldr__back">
            <div className="ldr__visor">
              <i />
              <i />
            </div>
            <span className="ldr__brand">GrapheneOS</span>
          </div>
        </div>
      </div>

      <div className="ldr__copy">
        <p className="ldr__status">
          <span className="s1">Analizando tu móvil…</span>
          <span className="s2">Instalando capas de defensa…</span>
          <span className="s3">Móvil protegido con GrapheneOS</span>
        </p>
        <div className="ldr__meter">
          <span className="ldr__label">Seguridad</span>
          <span className="ldr__bar">
            <i />
          </span>
          <span className="ldr__pct" />
        </div>
      </div>
      <button
        type="button"
        className="ldr__skip"
        onClick={() => (window as unknown as { __gosSkip?: () => void }).__gosSkip?.()}
      >
        Saltar intro
      </button>
    </div>
  );
}
