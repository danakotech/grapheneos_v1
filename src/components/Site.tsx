/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

/* Piezas estáticas: logo, pie, cabecera de página interior y enlace externo. */

import Link from "next/link";
import { NAV, OFFICIAL, OWNER } from "@/lib/content";

/** Marca propia: celda de grafeno con núcleo protegido. */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 3 L42 13.5 V34.5 L24 45 L6 34.5 V13.5 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M24 13 L33 18.2 V28.8 L24 34 L15 28.8 V18.2 Z" fill="currentColor" opacity=".18" />
      <path d="M24 13 L33 18.2 V28.8 L24 34 L15 28.8 V18.2 Z M24 3 V13 M42 13.5 L33 18.2 M42 34.5 L33 28.8 M24 45 V34 M6 34.5 L15 28.8 M6 13.5 L15 18.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" opacity=".7" />
      <circle cx="24" cy="23.5" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function Ext({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr"> (se abre en otra pestaña)</span>
    </a>
  );
}

export function PageHead({ kicker, title, lead, crumb }: { kicker: string; title: React.ReactNode; lead: string; crumb: string }) {
  return (
    <header className="phead">
      <nav className="crumbs" aria-label="Migas de pan">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{crumb}</span>
      </nav>
      <p className="kicker" data-reveal>
        {kicker}
      </p>
      <h1 className="h1" data-reveal>
        {title}
      </h1>
      <p className="lead" data-reveal>
        {lead}
      </p>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ftr">
      <div className="ftr__top">
        <div className="ftr__brand">
          <Link href="/" className="hdr__logo" aria-label="GrapheneOS.es, inicio">
            <Logo size={34} />
            <span>
              GrapheneOS<em>.es</em>
            </span>
          </Link>
          <p>La guía en español para entender GrapheneOS e instalarlo en tu Pixel. Sin cookies, sin rastreadores y sin anuncios.</p>
        </div>
        <nav aria-label="Sitio">
          <h2>Guía</h2>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <Link href="/aviso-legal">Aviso legal</Link>
        </nav>
        <nav aria-label="Fuentes oficiales">
          <h2>Oficial</h2>
          <Ext href={OFFICIAL.home}>grapheneos.org</Ext>
          <Ext href={OFFICIAL.web}>Instalador web</Ext>
          <Ext href={OFFICIAL.features}>Características</Ext>
          <Ext href={OFFICIAL.releases}>Versiones</Ext>
          <Ext href={OFFICIAL.donate}>Donar al proyecto</Ext>
        </nav>
      </div>
      <p className="ftr__note">
        GrapheneOS.es es una web divulgativa independiente y no está afiliada a la GrapheneOS Foundation. «GrapheneOS» es una marca de su titular; «Google» y «Pixel» son marcas de Google LLC. Descarga GrapheneOS siempre desde grapheneos.org.
      </p>
      <div className="ftr__bottom">
        <span>
          © {year} · Propiedad de{" "}
          <Ext href={OWNER.url}>github.com/{OWNER.name}</Ext>
        </span>
        <span className="mono">
          <a href="/llms.txt">llms.txt</a> · <a href="/sitemap.xml">sitemap</a>
        </span>
      </div>
    </footer>
  );
}
