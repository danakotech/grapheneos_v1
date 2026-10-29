/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import Link from "next/link";
import { Ext, PageHead } from "@/components/Site";
import { AFTER, OFFICIAL, REQUIREMENTS, STEPS } from "@/lib/content";
import { crumbs, howToNode, ld, meta, pageNode } from "@/lib/schema";

const TITLE = "Cómo instalar GrapheneOS en un Pixel paso a paso (2026)";
const DESC =
  "Guía en español para instalar GrapheneOS con el instalador web oficial: requisitos, desbloqueo OEM, bootloader, instalación, bloqueo y verificación. Sin comandos, en unos 30 minutos.";

export const metadata = meta("/instalar", TITLE, DESC);

const TROUBLE = [
  { q: "El interruptor de desbloqueo OEM está gris", a: "Conecta el móvil a internet unos minutos y vuelve a mirar. Si sigue gris, es un Pixel bloqueado por operador y no se puede instalar GrapheneOS." },
  { q: "El navegador no detecta el móvil", a: "Prueba otro puerto USB (trasero en sobremesa), el cable original y un navegador basado en Chromium sin modo incógnito. En Windows, instala el controlador de fastboot; en Linux, las reglas udev y detén fwupd." },
  { q: "La instalación se corta a mitad", a: "No pasa nada: vuelve a poner el móvil en modo bootloader y repite «Flash release». Evita hubs USB y que el ordenador entre en reposo." },
  { q: "Veo un aviso amarillo al arrancar", a: "Es normal. Indica que el móvil ejecuta un sistema distinto al de fábrica y muestra el hash de su clave para que lo verifiques." },
];

export default function Instalar() {
  return (
    <div data-world="7" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ld([pageNode("/instalar", TITLE, DESC), howToNode(), crumbs([{ name: "Instalar", path: "/instalar" }])]) }}
      />
      <div className="wrap">
        <PageHead
          crumb="Instalar"
          kicker="Guía de instalación · 30 minutos · sin comandos"
          title={
            <>
              Instala <span className="grad">GrapheneOS</span> en tu Pixel
            </>
          }
          lead="Con el instalador web oficial, todo el proceso se hace desde el navegador. Sigue estos 10 pasos en orden y no desconectes el cable mientras se instala."
        />

        <section className="block" aria-labelledby="req">
          <h2 id="req" className="h2" data-reveal>
            Antes de empezar
          </h2>
          <ul className="grid4">
            {REQUIREMENTS.map((r) => (
              <li key={r.k} className="panel card" data-reveal>
                <h3 className="h3">{r.k}</h3>
                <p>{r.t}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="block" aria-labelledby="pasos">
          <h2 id="pasos" className="h2" data-reveal>
            Los 10 pasos
          </h2>
          <ol className="steps steps--full">
            {STEPS.map((s) => (
              <li key={s.n} id={`paso-${s.n}`} className="panel step" data-reveal>
                <span className="step__n">{String(s.n).padStart(2, "0")}</span>
                <div>
                  <h3 className="h3">
                    {s.title} <small>{s.time}</small>
                  </h3>
                  <p>{s.text}</p>
                  {s.tip && <p className="tip">{s.tip}</p>}
                  {s.warn && <p className="warn">{s.warn}</p>}
                </div>
              </li>
            ))}
          </ol>
          <div className="ctas" data-reveal>
            <Ext href={OFFICIAL.web} className="btn btn--lg">
              Abrir el instalador web oficial ↗
            </Ext>
            <Ext href={OFFICIAL.cli} className="btn btn--ghost">
              Prefiero la línea de comandos ↗
            </Ext>
          </div>
        </section>

        <section className="block" aria-labelledby="despues">
          <h2 id="despues" className="h2" data-reveal>
            Después de instalar
          </h2>
          <ul className="grid4">
            {AFTER.map((r) => (
              <li key={r.k} className="panel card" data-reveal>
                <h3 className="h3">{r.k}</h3>
                <p>{r.t}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="block" aria-labelledby="problemas">
          <h2 id="problemas" className="h2" data-reveal>
            Si algo falla
          </h2>
          <div className="panel faq" data-reveal>
            {TROUBLE.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p className="more" data-reveal>
            ¿Más dudas? Mira las <Link href="/preguntas-frecuentes">preguntas frecuentes</Link> o la <Ext href={OFFICIAL.web}>guía oficial en inglés</Ext>.
          </p>
        </section>
      </div>
    </div>
  );
}
