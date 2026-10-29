# grapheneos.es

Guía en español de GrapheneOS: qué es y cómo instalarlo. Web 3D con scroll (Next.js 16 + Three.js + Lenis).

Propiedad de [github.com/danakotech](https://github.com/danakotech).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

- Contenido: `src/lib/content.ts` (de ahí salen páginas, JSON-LD, sitemap y llms.txt)
- Mundo 3D: `src/components/world/engine.ts` (escenas `data-stage` en la home, `data-world` en páginas interiores)
- Pantalla de carga: `src/components/Loader.tsx` + estilos `.ldr` en `src/styles/site.css`
