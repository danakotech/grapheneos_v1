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

## IndexNow

Tras cada despliegue con cambios de contenido, avisa a los buscadores (Bing, Yandex, Seznam, Naver…):

```bash
npm run indexnow                      # todas las URLs del sitemap + llms.txt
npm run indexnow -- /instalar         # solo algunas rutas
```

Clave: `public/ed33ad1f180cdeed927e637e1a0f5bfd.txt`.

www.grapheneos.es by danakotech FLE
