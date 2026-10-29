/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import Link from "next/link";
import { Ext, PageHead } from "@/components/Site";
import { DEVICE_NOTES, DEVICES, LEGACY, OFFICIAL } from "@/lib/content";
import { crumbs, devicesNode, ld, meta, pageNode } from "@/lib/schema";

const TITLE = "Móviles compatibles con GrapheneOS: lista de Pixel (2026)";
const DESC = `Los ${DEVICES.length} Google Pixel compatibles con GrapheneOS, del Pixel 6 al Pixel 10a, con la fecha mínima de actualizaciones de cada modelo y cuáles recomendamos comprar.`;

export const metadata = meta("/dispositivos", TITLE, DESC);

export default function Dispositivos() {
  return (
    <div data-world="6" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ld([pageNode("/dispositivos", TITLE, DESC), devicesNode(), crumbs([{ name: "Dispositivos", path: "/dispositivos" }])]) }}
      />
      <div className="wrap">
        <PageHead
          crumb="Dispositivos"
          kicker={`${DEVICES.length} modelos compatibles · fuente: grapheneos.org`}
          title={
            <>
              ¿Funciona en <span className="grad">mi Pixel</span>?
            </>
          }
          lead="GrapheneOS solo es compatible con Google Pixel porque son los únicos móviles que cumplen sus requisitos de seguridad de hardware. Estos son todos los modelos con soporte oficial."
        />

        <section className="block" aria-labelledby="lista">
          <h2 id="lista" className="sr">
            Lista de dispositivos
          </h2>
          <div className="panel panel--table" data-reveal>
            <table className="dev">
              <caption className="sr">Dispositivos compatibles con GrapheneOS y fecha mínima de soporte</caption>
              <thead>
                <tr>
                  <th scope="col">Modelo</th>
                  <th scope="col">Nombre en clave</th>
                  <th scope="col">Soporte mínimo hasta</th>
                  <th scope="col">MTE</th>
                  <th scope="col">Recomendado</th>
                </tr>
              </thead>
              <tbody>
                {DEVICES.map((d) => (
                  <tr key={d.code} className={d.rec ? "is-rec" : undefined}>
                    <th scope="row">{d.name}</th>
                    <td className="mono">{d.code}</td>
                    <td>
                      {d.until} <small>({d.years} años)</small>
                    </td>
                    <td>{d.mte ? "Sí" : "—"}</td>
                    <td>{d.rec ? <span className="badge">Recomendado</span> : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="block" aria-labelledby="consejos">
          <h2 id="consejos" className="h2" data-reveal>
            Antes de comprar
          </h2>
          <ul className="grid3">
            {DEVICE_NOTES.map((n) => (
              <li key={n} className="panel card" data-reveal>
                <p>{n}</p>
              </li>
            ))}
          </ul>
          <p className="more" data-reveal>
            <b>Sin soporte:</b> {LEGACY}. Ya no reciben parches de seguridad, así que conviene cambiarlos por un modelo compatible.
          </p>
          <div className="ctas" data-reveal>
            <Link href="/instalar" className="btn">
              Tengo un Pixel compatible: instalar <span aria-hidden="true">→</span>
            </Link>
            <Ext href={OFFICIAL.faq} className="btn btn--ghost">
              Lista oficial ↗
            </Ext>
          </div>
        </section>
      </div>
    </div>
  );
}
