/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import { Ext, PageHead } from "@/components/Site";
import { OFFICIAL, OWNER } from "@/lib/content";
import { crumbs, ld, meta, pageNode } from "@/lib/schema";

const TITLE = "Aviso legal y privacidad";
const DESC = "Titularidad, condiciones de uso y privacidad de GrapheneOS.es: web divulgativa independiente, sin publicidad y con analítica solo si la aceptas.";

export const metadata = meta("/aviso-legal", TITLE, DESC);

export default function Legal() {
  return (
    <div data-world="2" className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld([pageNode("/aviso-legal", TITLE, DESC), crumbs([{ name: "Aviso legal", path: "/aviso-legal" }])]) }} />
      <div className="wrap wrap--narrow">
        <PageHead crumb="Aviso legal" kicker="Legal" title="Aviso legal y privacidad" lead="Sin letra pequeña: sin publicidad y con estadísticas solo si tú quieres." />
        <div className="panel prose" data-reveal>
          <h2>Titularidad</h2>
          <p>
            GrapheneOS.es y su código son propiedad de <Ext href={OWNER.url}>github.com/{OWNER.name}</Ext>. Todos los derechos reservados sobre el diseño, los textos y el código de esta web.
          </p>
          <h2>Web no oficial</h2>
          <p>
            GrapheneOS.es es una guía divulgativa independiente en español. No está afiliada, patrocinada ni respaldada por la GrapheneOS Foundation. «GrapheneOS» es una marca de su titular; «Google», «Pixel» y «Google Play» son marcas de Google LLC; «Motorola» es una marca de Motorola Trademark Holdings, LLC.
          </p>
          <p>
            Descarga GrapheneOS solo desde su web oficial, <Ext href={OFFICIAL.home}>grapheneos.org</Ext>. Nunca te pediremos dinero ni datos para instalarlo.
          </p>
          <h2>Responsabilidad</h2>
          <p>
            La información se ofrece de buena fe y se revisa con las fuentes oficiales (última revisión: octubre de 2026). Instalar un sistema operativo borra el dispositivo; sigue siempre las instrucciones oficiales. El titular no se hace responsable de daños o pérdidas de datos derivados del uso de esta guía.
          </p>
          <h2 id="privacidad">Privacidad y cookies</h2>
          <p>
            Esta web no tiene publicidad ni vende datos. Las únicas cookies son las de <strong>Google Analytics</strong> (cargado mediante Google Tag Manager), que usamos solo con fines estadísticos: saber cuántas visitas recibe la guía y qué páginas resultan útiles. Solo se instalan si las aceptas en el aviso que aparece al entrar; si las rechazas, no se guarda ninguna.
          </p>
          <p>
            Esas cookies (<code>_ga</code> y <code>_ga_*</code>) las gestiona Google Ireland Limited, duran hasta 2 años y la información se trata de forma agregada. Puedes cambiar tu elección cuando quieras desde el enlace «Cookies» del pie de página o borrarlas desde tu navegador. Más información en la{" "}
            <Ext href="https://policies.google.com/privacy?hl=es">política de privacidad de Google</Ext>.
          </p>
          <p>
            Además, el navegador guarda tu elección sobre las cookies (en almacenamiento local) y, durante la sesión, una marca para no repetir la animación de entrada. El proveedor de alojamiento puede registrar datos técnicos mínimos (como la IP) para servir la página y protegerla frente a abusos. Las fuentes tipográficas se sirven desde el propio dominio.
          </p>
        </div>
      </div>
    </div>
  );
}
