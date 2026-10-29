/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import Link from "next/link";
import { StageRail } from "@/components/Chrome";
import { Ext } from "@/components/Site";
import { COMPARE, DEVICES, FAQ, INTRO, LAYERS, OFFICIAL, PLAY, STEPS, THREATS } from "@/lib/content";
import { abs, ld, meta, pageNode } from "@/lib/schema";

/* La home enlaza a las guías completas en lugar de duplicar sus datos estructurados. */
const howToRef = { "@type": "WebPage", "@id": `${abs("/instalar")}#page`, name: "Cómo instalar GrapheneOS", url: abs("/instalar") };
const devicesRef = { "@type": "WebPage", "@id": `${abs("/dispositivos")}#page`, name: "Dispositivos compatibles con GrapheneOS", url: abs("/dispositivos") };

const TITLE = "GrapheneOS en español: qué es y cómo instalarlo en tu Pixel";
const DESC =
  "Descubre GrapheneOS, el sistema operativo móvil libre más seguro y privado, compatible con apps de Android. Guía paso a paso para instalarlo en tu Google Pixel en unos 30 minutos.";

export const metadata = meta("/", TITLE, DESC, { absolute: true });

const recommended = DEVICES.filter((d) => d.rec);
const rest = DEVICES.filter((d) => !d.rec);

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld([pageNode("/", TITLE, DESC), howToRef, devicesRef]) }} />
      <StageRail />

      {/* 0 · Inicio */}
      <section id="inicio" data-stage="0" className="sec sec--hero">
        <div className="wrap hero">
          <p className="kicker" data-reveal>
            <span className="dot" /> Guía en español · actualizada en octubre de 2026
          </p>
          <h1 className="h0" data-reveal>
            Tu móvil,
            <br />
            <span className="grad">blindado</span>.
          </h1>
          <p className="lead" data-reveal>
            <strong>GrapheneOS</strong> es el sistema operativo móvil libre que convierte un Google Pixel en el teléfono más seguro y privado que puedes llevar en el bolsillo. Y sigue usando tus apps de Android.
          </p>
          <div className="ctas" data-reveal>
            <Link href="/instalar" className="btn">
              Instalar en 30 minutos <span aria-hidden="true">→</span>
            </Link>
            <Link href="/dispositivos" className="btn btn--ghost">
              ¿Es compatible mi Pixel?
            </Link>
          </div>
          <dl className="stats" data-reveal>
            <div>
              <dt>Pixel compatibles</dt>
              <dd>{DEVICES.length}</dd>
            </div>
            <div>
              <dt>Años de actualizaciones</dt>
              <dd>7</dd>
            </div>
            <div>
              <dt>Precio · código abierto</dt>
              <dd>0 €</dd>
            </div>
            <div>
              <dt>Minutos para instalarlo</dt>
              <dd>~30</dd>
            </div>
          </dl>
        </div>
        <a href="#problema" className="scrollcue" aria-label="Empezar el recorrido">
          <span>Desliza para entrar</span>
          <i />
        </a>
      </section>

      {/* 1 · El problema */}
      <section id="problema" data-stage="1" className="sec sec--left">
        <div className="wrap">
          <div className="panel panel--red" data-reveal>
            <p className="kicker kicker--red">01 · El problema</p>
            <h2 className="h2">Tu móvil habla de ti. Todo el rato.</h2>
            <p>Un Android o un iPhone corriente trae servicios con privilegios que no puedes limitar, y apps que piden más de lo que necesitan. Cada fallo de memoria es una puerta para el software espía.</p>
            <ul className="threats">
              {THREATS.map((t) => (
                <li key={t.k}>
                  <b>{t.k}</b>
                  <span>{t.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2 · Qué es */}
      <section id="que-es" data-stage="2" className="sec sec--right">
        <div className="wrap">
          <div className="panel" data-reveal>
            <p className="kicker">02 · La solución</p>
            <h2 className="h2">¿Qué es GrapheneOS?</h2>
            <p>{INTRO}</p>
            <ul className="facts">
              <li>
                <b>Basado en AOSP</b>
                <span>El Android de código abierto, sin capas del fabricante.</span>
              </li>
              <li>
                <b>Sin ánimo de lucro</b>
                <span>Lo desarrolla la GrapheneOS Foundation desde 2014 (antes CopperheadOS).</span>
              </li>
              <li>
                <b>Tus apps de siempre</b>
                <span>WhatsApp, Signal, Telegram, banca y la Play Store, si la quieres.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3 · Seguridad */}
      <section id="seguridad" data-stage="3" className="sec sec--left sec--tall">
        <div className="wrap">
          <header className="sechead" data-reveal>
            <p className="kicker">03 · Capas de defensa</p>
            <h2 className="h2">Seis muros entre tú y el atacante.</h2>
          </header>
          <ol className="layers">
            {LAYERS.map((l, i) => (
              <li key={l.id} className="panel layer" data-reveal>
                <span className="layer__n">0{i + 1}</span>
                <div>
                  <p className="tag">{l.tag}</p>
                  <h3 className="h3">{l.name}</h3>
                  <p>{l.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="more" data-reveal>
            Lista completa en <Ext href={OFFICIAL.features}>grapheneos.org/features</Ext>
          </p>
        </div>
      </section>

      {/* 4 · Google Play en sandbox */}
      <section id="google-play" data-stage="4" className="sec sec--right">
        <div className="wrap">
          <div className="panel" data-reveal>
            <p className="kicker">04 · Compatibilidad</p>
            <h2 className="h2">{PLAY.title}</h2>
            <p>{PLAY.text}</p>
            <ul className="checks">
              {PLAY.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5 · Comparativa */}
      <section id="comparativa" data-stage="5" className="sec sec--center">
        <div className="wrap">
          <header className="sechead sechead--c" data-reveal>
            <p className="kicker">05 · Cara a cara</p>
            <h2 className="h2">Android de serie frente a GrapheneOS</h2>
          </header>
          <div className="panel panel--table" data-reveal>
            <table className="cmp">
              <caption className="sr">Comparativa entre Android de serie y GrapheneOS</caption>
              <thead>
                <tr>
                  <th scope="col">Función</th>
                  <th scope="col">Android de serie</th>
                  <th scope="col">GrapheneOS</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    <td className="no">{r.a}</td>
                    <td className="yes">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6 · Dispositivos */}
      <section id="dispositivos" data-stage="6" className="sec sec--center">
        <div className="wrap">
          <header className="sechead sechead--c" data-reveal>
            <p className="kicker">06 · Dispositivos</p>
            <h2 className="h2">Funciona en Google Pixel. Del 6 al 10a.</h2>
            <p className="lead">Los Pixel son, hoy, los únicos móviles que cumplen los requisitos de hardware de GrapheneOS. Te recomendamos un Pixel 8 o posterior.</p>
          </header>
          <div className="panel" data-reveal>
            <p className="tag">Recomendados · 7 años de actualizaciones · MTE</p>
            <ul className="chips">
              {recommended.map((d) => (
                <li key={d.code} className="chip chip--rec">
                  {d.name}
                </li>
              ))}
            </ul>
            <p className="tag">También compatibles</p>
            <ul className="chips">
              {rest.map((d) => (
                <li key={d.code} className="chip">
                  {d.name}
                </li>
              ))}
            </ul>
            <Link href="/dispositivos" className="btn btn--ghost">
              Ver fechas de soporte de cada modelo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7 · Instalación */}
      <section id="instalacion" data-stage="7" className="sec sec--left sec--tall">
        <div className="wrap">
          <header className="sechead" data-reveal>
            <p className="kicker">07 · Instalación</p>
            <h2 className="h2">Diez pasos. Sin comandos. Desde el navegador.</h2>
            <p className="lead">El instalador web oficial lo hace casi todo por ti. Necesitas un ordenador, un cable USB-C y unos 30 minutos.</p>
          </header>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.n} className="panel step" data-reveal>
                <span className="step__n">{String(s.n).padStart(2, "0")}</span>
                <div>
                  <h3 className="h3">
                    {s.title} <small>{s.time}</small>
                  </h3>
                  <p>{s.text}</p>
                  {s.warn && <p className="warn">{s.warn}</p>}
                </div>
              </li>
            ))}
          </ol>
          <div className="ctas" data-reveal>
            <Link href="/instalar" className="btn">
              Guía detallada de instalación <span aria-hidden="true">→</span>
            </Link>
            <Ext href={OFFICIAL.web} className="btn btn--ghost">
              Abrir el instalador oficial ↗
            </Ext>
          </div>
        </div>
      </section>

      {/* 8 · Final */}
      <section id="mundo-seguro" data-stage="8" className="sec sec--center sec--final">
        <div className="wrap">
          <header className="sechead sechead--c" data-reveal>
            <p className="kicker">08 · Bienvenido</p>
            <h2 className="h1">
              Bienvenido al <span className="grad">mundo seguro</span>.
            </h2>
          </header>
          <div className="panel faq" data-reveal>
            <h3 className="h3">Preguntas rápidas</h3>
            {FAQ.slice(1, 7).map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
            <Link href="/preguntas-frecuentes" className="more">
              Todas las preguntas frecuentes →
            </Link>
          </div>
          <div className="ctas ctas--c" data-reveal>
            <Link href="/instalar" className="btn btn--lg">
              Empezar la instalación
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
