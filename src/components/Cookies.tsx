/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */
"use client";

/*
 * Aviso de cookies. Aparece cuando termina la intro (evento gos:intro) o al cargar si la intro ya
 * se vio en la sesión, y solo mientras el usuario no haya elegido. La elección vive en localStorage
 * ("gos-consent") y actualiza Consent Mode de Google; el estado por defecto (denegado) se fija en el layout.
 */

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "gos-consent";
type Choice = "granted" | "denied";

function stored(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export default function Cookies() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => stored() === null && setOpen(true);
    const reopen = () => setOpen(true);
    if (document.documentElement.classList.contains("loading")) addEventListener("gos:intro", show, { once: true });
    else show();
    addEventListener("gos:cookies", reopen);
    return () => {
      removeEventListener("gos:intro", show);
      removeEventListener("gos:cookies", reopen);
    };
  }, []);

  const choose = (c: Choice) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.("consent", "update", { analytics_storage: c });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="ck" role="dialog" aria-labelledby="ck-t" aria-describedby="ck-d">
      <p id="ck-t" className="ck__t">Una cookie, solo para estadísticas</p>
      <p id="ck-d" className="ck__d">
        Usamos Google Analytics para saber cuántas personas leen la guía y qué páginas les sirven. Nada de publicidad ni de venta de datos.{" "}
        <Link href="/aviso-legal#privacidad">Más info</Link>
      </p>
      <div className="ck__b">
        <button type="button" className="btn btn--sm" onClick={() => choose("granted")}>
          Aceptar
        </button>
        <button type="button" className="btn btn--sm btn--ghost" onClick={() => choose("denied")}>
          No, gracias
        </button>
      </div>
    </div>
  );
}

/** Enlace del pie para volver a abrir el aviso y cambiar la elección. */
export function CookieLink() {
  return (
    <button type="button" className="ftr__ck" onClick={() => dispatchEvent(new Event("gos:cookies"))}>
      Cookies
    </button>
  );
}
