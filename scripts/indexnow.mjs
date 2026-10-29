/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

/*
 * Avisa a IndexNow (Bing, Yandex, Seznam, Naver…) de las URLs del sitio.
 * Lee el sitemap publicado y añade los llms.txt.
 * Uso: npm run indexnow            (todas las URLs del sitemap)
 *      npm run indexnow -- /instalar /dispositivos   (solo esas rutas)
 */

const SITE = "https://www.grapheneos.es";
const KEY = "ed33ad1f180cdeed927e637e1a0f5bfd";
const ENDPOINTS = ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow", "https://yandex.com/indexnow"];

async function urls() {
  const only = process.argv.slice(2);
  if (only.length) return only.map((p) => (p.startsWith("http") ? p : SITE + p));
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set([...locs, `${SITE}/llms.txt`, `${SITE}/llms-full.txt`])];
}

const key = await (await fetch(`${SITE}/${KEY}.txt`)).text();
if (key.trim() !== KEY) {
  console.error(`La clave publicada en ${SITE}/${KEY}.txt no coincide. Despliega antes de avisar.`);
  process.exit(1);
}

const urlList = await urls();
const body = JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList });
console.log(`Enviando ${urlList.length} URL a IndexNow…`);
let ok = true;
for (const ep of ENDPOINTS) {
  const r = await fetch(ep, { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body });
  console.log(`${r.status}  ${ep}`);
  if (r.status >= 300) ok = false;
}
process.exit(ok ? 0 : 1);
