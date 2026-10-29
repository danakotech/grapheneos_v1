/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { World as W } from "./engine";

/** Lienzo WebGL fijo detrás de todo el sitio. Se carga después del contenido. */
export default function World() {
  const ref = useRef<HTMLCanvasElement>(null);
  const world = useRef<W | null>(null);
  const path = usePathname();

  useEffect(() => {
    let dead = false;
    const canvas = ref.current;
    if (!canvas) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) {
      document.documentElement.classList.add("no-gl");
      return;
    }
    import("./engine").then(({ createWorld }) => {
      if (dead) return;
      world.current = createWorld(canvas);
      canvas.classList.add("is-on");
    });
    return () => {
      dead = true;
      world.current?.destroy();
      world.current = null;
    };
  }, []);

  // Al cambiar de página, recalcular las escenas del DOM
  useEffect(() => {
    const id = setTimeout(() => world.current?.refresh(), 60);
    return () => clearTimeout(id);
  }, [path]);

  return <canvas ref={ref} className="world" aria-hidden="true" />;
}
