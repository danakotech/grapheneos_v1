/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import World from "@/components/world/World";
import Loader from "@/components/Loader";
import { Header, Motion } from "@/components/Chrome";
import { Footer } from "@/components/Site";
import { BRAND, OWNER, SITE } from "@/lib/content";
import { baseGraph, ld } from "@/lib/schema";
import "@/styles/site.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap" });

export const viewport: Viewport = { themeColor: "#030508", colorScheme: "dark", width: "device-width", initialScale: 1 };

const DESC =
  "Qué es GrapheneOS, el sistema operativo móvil más seguro y privado, y cómo instalarlo paso a paso en tu Google Pixel en 30 minutos. Guía en español, actualizada en 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "GrapheneOS en español: qué es y cómo instalarlo · GrapheneOS.es", template: "%s · GrapheneOS.es" },
  description: DESC,
  applicationName: BRAND,
  authors: [{ name: OWNER.name, url: OWNER.url }],
  creator: OWNER.name,
  publisher: OWNER.name,
  category: "technology",
  keywords: [
    "GrapheneOS",
    "GrapheneOS español",
    "instalar GrapheneOS",
    "GrapheneOS Pixel",
    "sistema operativo seguro",
    "Android privado",
    "móvil seguro",
    "privacidad móvil",
    "Pixel 9",
    "Pixel 10",
    "Google Play sandbox",
    "desbloquear bootloader",
    "alternativa a Android",
    "móvil sin Google",
  ],
  alternates: { canonical: `${SITE}/`, types: { "text/markdown": [{ url: "/llms.txt", title: "llms.txt" }] } },
  openGraph: { type: "website", url: `${SITE}/`, siteName: BRAND, locale: "es_ES", title: "GrapheneOS en español: qué es y cómo instalarlo", description: DESC },
  twitter: { card: "summary_large_image", title: "GrapheneOS en español: qué es y cómo instalarlo", description: DESC },
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  other: {
    copyright: `© ${new Date().getFullYear()} github.com/${OWNER.name}`,
    owner: `github.com/${OWNER.name}`,
    "content-language": "es-ES",
  },
};

/* Clases en <html> antes de pintar: js, seen (intro ya vista en la sesión) y loading. */
const BOOT =
  "var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('gos-intro'))d.classList.add('seen');else d.classList.add('loading')}catch(e){d.classList.add('seen')}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(baseGraph()) }} />
        <link rel="author" href="/humans.txt" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="llms-full.txt" />
      </head>
      <body>
        <World />
        <Loader />
        <Motion />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
