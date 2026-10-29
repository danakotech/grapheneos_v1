/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 · Página no encontrada",
  description: "Esta dirección no existe en GrapheneOS.es.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div data-world="1" className="page nf">
      <div className="wrap nf__in">
        <p className="kicker kicker--red">
          <span className="dot dot--red" /> Error 404 · amenaza contenida
        </p>
        <h1 className="nf__code" data-text="404" aria-label="404">
          404
        </h1>
        <h2 className="h2">Esta página no existe… o la hemos puesto en cuarentena.</h2>
        <p className="lead">
          El enlace que has seguido está roto o ha cambiado. Tu móvil, por suerte, no tiene por qué correr la misma suerte.
        </p>
        <div className="ctas">
          <Link href="/" className="btn">
            Volver a zona segura
          </Link>
          <Link href="/instalar" className="btn btn--ghost">
            Guía de instalación
          </Link>
        </div>
        <ul className="nf__links">
          <li>
            <Link href="/#que-es">Qué es GrapheneOS</Link>
          </li>
          <li>
            <Link href="/dispositivos">Dispositivos compatibles</Link>
          </li>
          <li>
            <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
