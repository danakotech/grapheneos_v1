/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import Link from "next/link";
import { PageHead } from "@/components/Site";
import { FAQ } from "@/lib/content";
import { crumbs, faqNode, ld, meta, pageNode } from "@/lib/schema";

const TITLE = "Preguntas frecuentes sobre GrapheneOS";
const DESC =
  "Respuestas claras sobre GrapheneOS: si es gratis, si funcionan WhatsApp y las apps del banco, por qué solo en Pixel, garantía, actualizaciones, batería, root y cómo volver a Android.";

export const metadata = meta("/preguntas-frecuentes", TITLE, DESC);

export default function Faq() {
  return (
    <div data-world="8" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: ld([pageNode("/preguntas-frecuentes", TITLE, DESC), faqNode("/preguntas-frecuentes"), crumbs([{ name: "Preguntas frecuentes", path: "/preguntas-frecuentes" }])]),
        }}
      />
      <div className="wrap wrap--narrow">
        <PageHead
          crumb="Preguntas frecuentes"
          kicker={`${FAQ.length} respuestas`}
          title={
            <>
              Lo que todo el mundo <span className="grad">pregunta</span>
            </>
          }
          lead="Si estás pensando en pasarte a GrapheneOS, seguramente tu duda está aquí."
        />
        <div className="panel faq faq--big" data-reveal>
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>
                <h2>{f.q}</h2>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <div className="ctas" data-reveal>
          <Link href="/instalar" className="btn">
            Ir a la guía de instalación <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
