/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

/* JSON-LD (schema.org) y metadatos con canónica www. */

import type { Metadata } from "next";
import { BRAND, DEVICES, FAQ, INTRO, OFFICIAL, OWNER, REQUIREMENTS, SITE, STEPS, UPDATED } from "./content";

export const abs = (p: string) => SITE + (p === "/" ? "/" : p);

export function meta(path: string, title: string, description: string, opts: { absolute?: boolean } = {}): Metadata {
  const url = abs(path);
  return {
    title: opts.absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: { "es-ES": url, "x-default": url } },
    openGraph: { type: "website", url, title, description, siteName: BRAND, locale: "es_ES" },
    twitter: { card: "summary_large_image", title, description },
  };
}

const ID = {
  site: `${SITE}/#website`,
  org: `${SITE}/#owner`,
  os: `${SITE}/#grapheneos`,
};

/** Nodos comunes a todas las páginas. */
export function baseGraph() {
  return [
    {
      "@type": "WebSite",
      "@id": ID.site,
      url: `${SITE}/`,
      name: BRAND,
      alternateName: ["GrapheneOS España", "GrapheneOS en español"],
      description: "Guía en español de GrapheneOS: qué es, por qué es el sistema móvil más seguro y cómo instalarlo en un Google Pixel.",
      inLanguage: "es-ES",
      publisher: { "@id": ID.org },
      copyrightHolder: { "@id": ID.org },
    },
    {
      "@type": "Organization",
      "@id": ID.org,
      name: OWNER.name,
      url: OWNER.url,
      sameAs: [OWNER.url],
    },
    {
      "@type": "SoftwareApplication",
      "@id": ID.os,
      name: "GrapheneOS",
      applicationCategory: "OperatingSystem",
      operatingSystem: "Android (AOSP)",
      description: INTRO,
      url: OFFICIAL.home,
      downloadUrl: OFFICIAL.web,
      isAccessibleForFree: true,
      license: "https://grapheneos.org/source",
      author: { "@type": "Organization", name: "GrapheneOS Foundation", url: OFFICIAL.home },
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      availableOnDevice: DEVICES.map((d) => `Google ${d.name}`).join(", "),
    },
  ];
}

export function pageNode(path: string, name: string, description: string, type = "WebPage") {
  return {
    "@type": type,
    "@id": `${abs(path)}#page`,
    url: abs(path),
    name,
    description,
    inLanguage: "es-ES",
    isPartOf: { "@id": ID.site },
    about: { "@id": ID.os },
    dateModified: UPDATED,
    publisher: { "@id": ID.org },
  };
}

export function crumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqNode(path: string) {
  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToNode() {
  return {
    "@type": "HowTo",
    "@id": `${abs("/instalar")}#howto`,
    name: "Cómo instalar GrapheneOS en un Google Pixel",
    description: "Guía paso a paso para instalar GrapheneOS con el instalador web oficial, sin comandos, en unos 30 minutos.",
    totalTime: "PT30M",
    inLanguage: "es-ES",
    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
    supply: [{ "@type": "HowToSupply", name: "Google Pixel compatible y libre" }],
    tool: REQUIREMENTS.slice(1).map((r) => ({ "@type": "HowToTool", name: `${r.k}: ${r.t}` })),
    step: STEPS.map((s) => ({
      "@type": "HowToStep",
      position: s.n,
      name: s.title,
      text: [s.text, s.tip, s.warn].filter(Boolean).join(" "),
      url: `${abs("/instalar")}#paso-${s.n}`,
    })),
  };
}

export function devicesNode() {
  return {
    "@type": "ItemList",
    "@id": `${abs("/dispositivos")}#lista`,
    name: "Dispositivos compatibles con GrapheneOS",
    numberOfItems: DEVICES.length,
    itemListElement: DEVICES.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Google ${d.name} (${d.code}): compatible con GrapheneOS, actualizaciones mínimas hasta ${d.until}${d.rec ? " · recomendado" : ""}`,
    })),
  };
}

export const ld = (nodes: object[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
