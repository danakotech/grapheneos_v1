/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */
"use client";

/* Piezas de interfaz con estado: cabecera, scroll suave, apariciones y riel de escenas. */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { NAV } from "@/lib/content";
import { Logo } from "./Site";

let lenis: Lenis | null = null;

export function Motion() {
  const path = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let id = 0;
    const raf = (t: number) => {
      lenis?.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    // Bloquear el scroll mientras está la pantalla de carga
    if (document.documentElement.classList.contains("loading")) {
      lenis.stop();
      const go = () => lenis?.start();
      addEventListener("gos:intro", go, { once: true });
    }
    return () => {
      cancelAnimationFrame(id);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Apariciones al entrar en pantalla
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    // Anclas con scroll suave
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a) return;
      const url = new URL(a.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector(decodeURIComponent(url.hash));
      if (!target) return;
      e.preventDefault();
      history.replaceState(null, "", url.hash);
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -70 });
      else target.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    if (location.hash) {
      const t = document.querySelector(decodeURIComponent(location.hash));
      if (t) setTimeout(() => (lenis ? lenis.scrollTo(t as HTMLElement, { offset: -70, immediate: true }) : t.scrollIntoView()), 80);
    } else {
      lenis?.scrollTo(0, { immediate: true });
    }
    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, [path]);

  return null;
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setSolid(scrollY > 40);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <header className={`hdr${solid ? " hdr--solid" : ""}${open ? " hdr--open" : ""}`}>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <Link href="/" className="hdr__logo" aria-label="GrapheneOS.es, inicio">
        <Logo />
        <span>
          GrapheneOS<em>.es</em>
        </span>
      </Link>
      <nav className="hdr__nav" aria-label="Principal">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>
            {n.label}
          </Link>
        ))}
      </nav>
      <Link href="/instalar" className="btn btn--sm hdr__cta">
        Instalar
      </Link>
      <button type="button" className="hdr__burger" aria-expanded={open} aria-controls="menu" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen(!open)}>
        <i />
        <i />
      </button>
      <div id="menu" className="menu" hidden={!open}>
        {NAV.map((n, i) => (
          <Link key={n.href} href={n.href} style={{ "--i": i } as React.CSSProperties}>
            <small>0{i + 1}</small>
            {n.label}
          </Link>
        ))}
        <Link href="/instalar" className="btn">
          Instalar GrapheneOS
        </Link>
      </div>
    </header>
  );
}

const STAGE_NAMES = ["Inicio", "El problema", "Qué es", "Seguridad", "Google Play", "Comparativa", "Dispositivos", "Instalación", "Mundo seguro"];

/** Riel lateral con las escenas del recorrido (solo en la home). */
export function StageRail() {
  const [active, setActive] = useState(0);
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
    setIds(els.map((e) => e.id));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.stage) || 0);
        }),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (!ids.length) return null;
  return (
    <nav className="rail" aria-label="Recorrido">
      {ids.map((id, i) => (
        <a key={id} href={`#${id}`} className={i === active ? "is-on" : undefined} aria-current={i === active ? "step" : undefined}>
          <span>{STAGE_NAMES[i]}</span>
        </a>
      ))}
    </nav>
  );
}
