/*!
 * grapheneos.es — guía en español de GrapheneOS
 * © 2026 github.com/danakotech. Todos los derechos reservados.
 * Propiedad de github.com/danakotech
 */

/*
 * Mundo 3D guiado por el scroll.
 * Cada sección de la home lleva data-stage="n"; el motor convierte la posición de scroll
 * en un valor continuo de escena y mezcla cámara y parámetros entre escenas.
 * Las páginas interiores usan data-world="n" (escena fija, avance según el scroll de la página).
 */

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const MINT = new THREE.Color("#4ff5c9");
const BLUE = new THREE.Color("#69a7ff");
const RED = new THREE.Color("#ff3358");
const BG = new THREE.Color("#030508");

/* —— Parámetros por escena ——
   0 inicio · 1 problema · 2 qué es · 3 seguridad · 4 play · 5 comparativa · 6 dispositivos · 7 instalación · 8 final */
type P = {
  cam: [number, number, number];
  look: [number, number, number];
  side: number; // -1 móvil a la izquierda, 1 a la derecha, 0 centro
  safe: number;
  shield: number;
  leak: number;
  floor: number;
  rise: number;
  rings: number;
  cubes: number;
  lineup: number;
  path: number;
  lock: number;
  phone: number; // escala del móvil
};
const S: P[] = [
  { cam: [0, 0.2, 5.6], look: [0, 0, 0], side: 1, safe: 1, shield: 1, leak: 0, floor: 0.35, rise: 0, rings: 0, cubes: 0, lineup: 0, path: 0, lock: 0, phone: 1 },
  { cam: [1.0, 0.4, 4.8], look: [0, 0.1, 0], side: 1, safe: 0, shield: 0, leak: 1, floor: 0.1, rise: 0, rings: 0, cubes: 0, lineup: 0, path: 0, lock: 0, phone: 1 },
  { cam: [-0.6, 2.4, 7.4], look: [0, -0.3, 0], side: -1, safe: 1, shield: 1, leak: 0, floor: 1, rise: 0.35, rings: 0, cubes: 0, lineup: 0, path: 0, lock: 0, phone: 1 },
  { cam: [-2.2, 1.2, 6.2], look: [0, 0, 0], side: 1, safe: 1, shield: 0.35, leak: 0, floor: 1, rise: 1, rings: 1, cubes: 0, lineup: 0, path: 0, lock: 0, phone: 1 },
  { cam: [0.8, 0.6, 5.4], look: [0, 0, 0], side: -1, safe: 1, shield: 0.2, leak: 0, floor: 1, rise: 0.6, rings: 0, cubes: 1, lineup: 0, path: 0, lock: 0, phone: 1 },
  { cam: [0, 6.5, 11], look: [0, -1.2, 0], side: 0, safe: 1, shield: 0.6, leak: 0, floor: 1, rise: 1, rings: 0.4, cubes: 0, lineup: 0, path: 0, lock: 0, phone: 1 },
  { cam: [0, 0.4, 8.2], look: [0, 0, 0], side: 0, safe: 1, shield: 0, leak: 0, floor: 1, rise: 0.3, rings: 0, cubes: 0, lineup: 1, path: 0, lock: 0, phone: 1 },
  { cam: [0, 4, 10], look: [0, -2, 0], side: 0, safe: 1, shield: 0.3, leak: 0, floor: 1, rise: 0.2, rings: 0, cubes: 0, lineup: 0, path: 1, lock: 0, phone: 0.8 },
  { cam: [0, 0.7, 6], look: [0, 0.35, 0], side: 0, safe: 1, shield: 1, leak: 0, floor: 1, rise: 0.5, rings: 0.3, cubes: 0, lineup: 0, path: 0.4, lock: 1, phone: 1 },
];
const LAST = S.length - 1;

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* —— GLSL común —— */
const HEX = /* glsl */ `
float hexDist(vec2 p){ p = abs(p); return max(dot(p, normalize(vec2(1.0,1.7320508))), p.x); }
vec4 hexCoords(vec2 uv){
  vec2 r = vec2(1.0,1.7320508); vec2 h = r*0.5;
  vec2 a = mod(uv, r) - h; vec2 b = mod(uv - h, r) - h;
  vec2 gv = dot(a,a) < dot(b,b) ? a : b;
  return vec4(gv, uv - gv);
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
`;

function screenMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { uSafe: { value: 1 }, uTime: { value: 0 } },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `
      uniform float uSafe; uniform float uTime; varying vec2 vUv;
      ${HEX}
      float sdBox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r; }
      float lock(vec2 p, float open){
        float body = sdBox(p - vec2(0.0,-0.06), vec2(0.17,0.13), 0.035);
        vec2 q = p - vec2(open*0.06, 0.07 + open*0.07);
        float arc = q.y > 0.0 ? abs(length(q) - 0.11) - 0.028 : abs(abs(q.x) - 0.11) - 0.028;
        arc = max(arc, -q.y - 0.09);
        return min(body, arc);
      }
      void main(){
        vec2 p = (vUv - 0.5) * vec2(0.92, 2.0);
        if (sdBox(p, vec2(0.46, 1.0), 0.09) > 0.0) discard;

        // Inseguro: interferencia roja, bandas y candado abierto parpadeando
        float row = floor(vUv.y * 46.0); float tick = floor(uTime * 9.0);
        float band = step(0.62, hash(vec2(row, tick)));
        vec2 g = vUv; g.x += (hash(vec2(row, tick + 3.0)) - 0.5) * 0.08 * band;
        float n = hash(floor(g * vec2(28.0, 60.0)) + tick);
        vec3 bad = vec3(0.16, 0.0, 0.02) + vec3(1.0, 0.12, 0.2) * n * 0.22 * (0.4 + band);
        bad += vec3(1.0, 0.1, 0.2) * (0.5 + 0.5 * sin(uTime * 7.0)) * 0.12;
        bad += vec3(1.0, 0.2, 0.25) * step(0.985, hash(floor(g * vec2(9.0, 22.0)) + floor(uTime * 3.0))) * 0.8;
        float lb = lock(p - vec2(0.0, 0.32), 1.0);
        bad = mix(bad, vec3(1.0, 0.25, 0.3) * (0.7 + 0.3 * step(0.5, fract(uTime * 2.0))), smoothstep(0.012, 0.0, abs(lb) - 0.012));

        // Seguro: celosía de grafeno y candado cerrado
        vec4 hc = hexCoords(p * 11.0);
        float edge = smoothstep(0.43, 0.5, hexDist(hc.xy));
        float pulse = 0.5 + 0.5 * sin(length(hc.zw) * 0.35 - uTime * 2.2);
        vec3 good = vec3(0.0, 0.035, 0.04) + vec3(0.31, 0.96, 0.79) * edge * (0.08 + 0.3 * pulse);
        float lg = lock(p - vec2(0.0, 0.32), 0.0);
        good += vec3(0.31, 0.96, 0.79) * smoothstep(0.01, -0.01, lg) * 0.6;
        good += vec3(0.31, 0.96, 0.79) * exp(-max(lg, 0.0) * 14.0) * 0.18;
        // barras de "texto" de interfaz
        for (int i = 0; i < 4; i++) {
          float y = -0.05 - float(i) * 0.12;
          float w = 0.32 - float(i) * 0.05;
          good += vec3(0.6, 0.9, 1.0) * 0.18 * smoothstep(0.012, 0.0, sdBox(p - vec2(0.0, y), vec2(w, 0.018), 0.018));
        }

        float wipe = mix(-1.15, 1.15, uSafe);
        float m = smoothstep(wipe + 0.015, wipe - 0.015, p.y);
        vec3 col = mix(bad, good, m);
        float live = step(0.002, uSafe) * step(uSafe, 0.998);
        col += vec3(0.6, 1.0, 0.9) * smoothstep(0.05, 0.0, abs(p.y - wipe)) * live * 2.5;
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
}

function makePhone(body: THREE.BufferGeometry, bodyMat: THREE.Material, screenMat: THREE.Material) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(body, bodyMat));
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 2.0), screenMat);
  screen.position.z = 0.0565;
  g.add(screen);
  // Barra de cámara trasera estilo Pixel
  const bar = new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.24, 0.07, 3, 0.035), bodyMat);
  bar.position.set(0, 0.68, -0.07);
  g.add(bar);
  const lensMat = new THREE.MeshStandardMaterial({ color: "#05070a", metalness: 0.2, roughness: 0.1 });
  for (const x of [-0.26, -0.02]) {
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.03, 32), lensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(x, 0.68, -0.11);
    g.add(lens);
  }
  return g;
}

export type World = { refresh: () => void; destroy: () => void };

export function createWorld(canvas: HTMLCanvasElement): World {
  const mobile = matchMedia("(max-width: 820px)").matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = BG;
  scene.fog = new THREE.FogExp2(BG, 0.045);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  camera.position.set(0, 0.3, 7);

  scene.add(new THREE.AmbientLight("#9fb8c8", 0.5));
  const key = new THREE.DirectionalLight("#ffffff", 2.2);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(MINT, 18, 12);
  rim.position.set(-2.5, 1.5, -2);
  scene.add(rim);
  const rimRed = new THREE.PointLight(RED, 0, 10);
  rimRed.position.set(2, -1, 2);
  scene.add(rimRed);

  /* —— Núcleo: móvil + escudo + amenazas + anillos + cajas + candado —— */
  const core = new THREE.Group();
  scene.add(core);

  const bodyGeo = new RoundedBoxGeometry(1.0, 2.1, 0.11, 5, 0.12);
  const bodyMat = new THREE.MeshStandardMaterial({ color: "#121821", metalness: 0.85, roughness: 0.32 });
  const screenMat = screenMaterial();
  const phone = makePhone(bodyGeo, bodyMat, screenMat);
  core.add(phone);

  // Escudo geodésico
  const shieldMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uOn: { value: 1 }, uTime: { value: 0 }, uCol: { value: MINT.clone() } },
    vertexShader: /* glsl */ `
      varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vP = position; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: /* glsl */ `
      uniform float uOn; uniform float uTime; uniform vec3 uCol; varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main(){
        float f = pow(1.0 - abs(dot(vN, vV)), 2.6);
        float scan = smoothstep(0.08, 0.0, abs(fract(vP.y * 0.35 - uTime * 0.25) - 0.5) - 0.42);
        gl_FragColor = vec4(uCol * (f * 0.5 + scan * 0.07), 1.0) * uOn;
      }`,
  });
  const shield = new THREE.Mesh(new THREE.IcosahedronGeometry(1.9, 5), shieldMat);
  const wireMat = new THREE.LineBasicMaterial({ color: MINT, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false });
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.92, 2)), wireMat);
  core.add(shield, wire);

  // Amenazas: partículas rojas que rebotan contra el escudo (o alcanzan el móvil si no hay escudo)
  const TN = mobile ? 90 : 160;
  const threatMat = new THREE.MeshBasicMaterial({ color: RED.clone().multiplyScalar(1.6) });
  const threats = new THREE.InstancedMesh(new THREE.TetrahedronGeometry(0.04), threatMat, TN);
  const tdata = Array.from({ length: TN }, () => ({
    dir: new THREE.Vector3().randomDirection(),
    axis: new THREE.Vector3().randomDirection(),
    speed: 0.25 + Math.random() * 0.5,
    phase: Math.random() * Math.PI * 2,
    max: 2.6 + Math.random() * 1.8,
    spin: Math.random() * 6,
  }));
  core.add(threats);

  // Fugas de datos: líneas discontinuas que salen del móvil
  const LN = 36;
  const leakPos = new Float32Array(LN * 6);
  const leakT = new Float32Array(LN * 2);
  for (let i = 0; i < LN; i++) {
    const d = new THREE.Vector3().randomDirection().multiplyScalar(6 + Math.random() * 6);
    leakPos.set([0, 0, 0, d.x, d.y, d.z], i * 6);
    leakT.set([0, 1], i * 2);
  }
  const leakGeo = new THREE.BufferGeometry();
  leakGeo.setAttribute("position", new THREE.BufferAttribute(leakPos, 3));
  leakGeo.setAttribute("aT", new THREE.BufferAttribute(leakT, 1));
  const leakMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uOn: { value: 0 }, uTime: { value: 0 } },
    vertexShader: /* glsl */ `attribute float aT; varying float vT; void main(){ vT = aT; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `uniform float uOn; uniform float uTime; varying float vT;
      void main(){ float d = step(0.55, fract(vT * 14.0 - uTime * 1.6)); gl_FragColor = vec4(vec3(1.0,0.2,0.3) * d * (1.0 - vT) * uOn * 1.6, 1.0); }`,
  });
  const leaks = new THREE.LineSegments(leakGeo, leakMat);
  core.add(leaks);

  // Anillos: las seis capas de defensa
  const rings: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; speed: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: (i % 2 ? BLUE : MINT).clone().multiplyScalar(1.6),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const r = 1.3 + i * 0.24;
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(r, 0.008, 6, 180), mat);
    mesh.rotation.set(Math.PI / 2 + (i - 2.5) * 0.18, (i % 3) * 0.4, 0);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), mat);
    dot.position.x = r;
    mesh.add(dot);
    core.add(mesh);
    rings.push({ mesh, mat, speed: 0.2 + i * 0.07 });
  }

  // Cajas de sandbox (Google Play y apps aisladas)
  const cubes: THREE.Group[] = [];
  const cubeCols = ["#4ff5c9", "#69a7ff", "#ffffff", "#ffd166", "#69a7ff"];
  for (let i = 0; i < 5; i++) {
    const g = new THREE.Group();
    const box = new THREE.BoxGeometry(0.46, 0.46, 0.46);
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(box), new THREE.LineBasicMaterial({ color: MINT.clone().multiplyScalar(1.4), transparent: true, opacity: 0.9 })));
    g.add(new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: MINT, transparent: true, opacity: 0.05, depthWrite: false })));
    const app = new THREE.Mesh(new THREE.IcosahedronGeometry(0.1, 0), new THREE.MeshStandardMaterial({ color: cubeCols[i], emissive: cubeCols[i], emissiveIntensity: 0.6, flatShading: true }));
    g.add(app);
    g.userData = { a: (i / 5) * Math.PI * 2, y: (i - 2) * 0.32, app };
    core.add(g);
    cubes.push(g);
  }

  // Candado final
  const lockGroup = new THREE.Group();
  const lockMat = new THREE.MeshStandardMaterial({ color: "#0d1418", metalness: 0.9, roughness: 0.25, emissive: MINT, emissiveIntensity: 0.25 });
  const lockBody = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.5, 0.2, 4, 0.06), lockMat);
  const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.045, 12, 40, Math.PI), lockMat);
  const legGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.22, 12);
  const legL = new THREE.Mesh(legGeo, lockMat);
  const legR = new THREE.Mesh(legGeo, lockMat);
  legL.position.set(-0.2, -0.11, 0);
  legR.position.set(0.2, -0.11, 0);
  const shackleG = new THREE.Group();
  shackleG.add(shackle, legL, legR);
  lockGroup.add(lockBody, shackleG);
  const keyhole = new THREE.Mesh(new THREE.CircleGeometry(0.05, 20), new THREE.MeshBasicMaterial({ color: MINT.clone().multiplyScalar(2) }));
  keyhole.position.z = 0.101;
  lockGroup.add(keyhole);
  lockGroup.position.set(0, 1.75, 0.2);
  core.add(lockGroup);

  // Fila de dispositivos compatibles
  const lineup: THREE.Group[] = [];
  for (const [x, z, ry] of [[-1.55, -0.6, 0.35], [1.55, -0.6, -0.35], [-3.0, -1.6, 0.6], [3.0, -1.6, -0.6]] as const) {
    const ph = makePhone(bodyGeo, bodyMat, screenMat);
    ph.userData = { x, z, ry };
    ph.visible = false;
    core.add(ph);
    lineup.push(ph);
  }

  /* —— Suelo de grafeno —— */
  const floorMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uReveal: { value: 0 }, uTime: { value: 0 }, uSafe: { value: 1 } },
    vertexShader: /* glsl */ `varying vec2 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: /* glsl */ `
      uniform float uReveal; uniform float uTime; uniform float uSafe; varying vec2 vW;
      ${HEX}
      void main(){
        vec4 hc = hexCoords(vW * 0.9);
        float edge = smoothstep(0.44, 0.5, hexDist(hc.xy));
        float r = length(vW);
        float reveal = smoothstep(uReveal * 34.0, uReveal * 34.0 - 5.0, r);
        float fade = exp(-r * 0.055);
        float ring = smoothstep(1.6, 0.0, abs(r - mod(uTime * 4.5, 42.0)));
        float blink = step(0.97, hash(hc.zw + floor(uTime * 1.5))) * (1.0 - edge) * 0.5;
        vec3 col = mix(vec3(1.0,0.2,0.3), vec3(0.31,0.96,0.79), uSafe);
        gl_FragColor = vec4(col * (edge * (0.12 + ring * 0.45) + blink * 0.5) * reveal * fade, 1.0);
      }`,
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.3;
  scene.add(floor);

  /* —— Torres hexagonales (la ciudad segura) —— */
  const centers: { x: number; z: number; h: number }[] = [];
  const cell = 1 / 0.9;
  for (let i = -16; i <= 16; i++)
    for (let j = -10; j <= 10; j++)
      for (const off of [0, 1]) {
        const x = (i + off * 0.5) * cell;
        const z = (j + off * 0.5) * 1.7320508 * cell;
        const r = Math.hypot(x, z);
        if (r < 6.6 || r > 17 || Math.random() < 0.35) continue;
        centers.push({ x, z, h: 0.3 + Math.random() * Math.random() * 4.2 + (r - 6) * 0.08 });
      }
  const towerGeo = new THREE.CylinderGeometry(0.48 * cell, 0.48 * cell, 1, 6);
  towerGeo.translate(0, 0.5, 0);
  towerGeo.rotateY(Math.PI / 6);
  const aH = new Float32Array(centers.length);
  const aD = new Float32Array(centers.length);
  const towerMat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { uRise: { value: 0 }, uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      attribute float aH; attribute float aD; uniform float uRise; varying float vY; varying float vH; varying float vK; varying vec3 vN; varying vec3 vV;
      void main(){
        float k = clamp(uRise * 1.6 - (aD - 6.6) / 10.4 * 0.6, 0.0, 1.0);
        k = k * k * (3.0 - 2.0 * k);
        float h = max(aH * k, 0.002);
        vec3 p = position; p.y *= h; vY = p.y; vH = h; vK = k;
        vec4 mv = modelViewMatrix * instanceMatrix * vec4(p, 1.0);
        vN = normalize(normalMatrix * mat3(instanceMatrix) * normal); vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; varying float vY; varying float vH; varying float vK; varying vec3 vN; varying vec3 vV;
      void main(){
        if (vK < 0.01) discard;
        float t = vY / vH;
        float rimL = pow(1.0 - abs(dot(vN, vV)), 3.0);
        float top = smoothstep(0.96, 1.0, t);
        float lines = smoothstep(0.03, 0.0, abs(fract(vY * 3.0 - uTime * 0.4) - 0.5) - 0.46) * 0.2;
        vec3 c = vec3(0.006, 0.014, 0.017) + vec3(0.31, 0.96, 0.79) * (rimL * 0.06 + top * 0.25 + lines * t * 0.35) * vK;
        gl_FragColor = vec4(c, 0.95);
      }`,
  });
  const towers = new THREE.InstancedMesh(towerGeo, towerMat, centers.length);
  const m4 = new THREE.Matrix4();
  centers.forEach((c, i) => {
    m4.makeTranslation(c.x, -2.3, c.z);
    towers.setMatrixAt(i, m4);
    aH[i] = c.h;
    aD[i] = Math.hypot(c.x, c.z);
  });
  towerGeo.setAttribute("aH", new THREE.InstancedBufferAttribute(aH, 1));
  towerGeo.setAttribute("aD", new THREE.InstancedBufferAttribute(aD, 1));
  towers.frustumCulled = false;
  scene.add(towers);

  /* —— Camino de instalación (10 pasos) —— */
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI * 0.62 + i * 0.6;
    const r = 3.3 + i * 0.24;
    nodes.push(new THREE.Vector3(Math.cos(a) * r, -2.25, Math.sin(a) * r));
  }
  const curve = new THREE.CatmullRomCurve3(nodes);
  const pathMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uOn: { value: 0 }, uProg: { value: 0 }, uTime: { value: 0 } },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `uniform float uOn; uniform float uProg; uniform float uTime; varying vec2 vUv;
      void main(){
        float done = step(vUv.x, uProg);
        float flow = 0.5 + 0.5 * sin(vUv.x * 60.0 - uTime * 6.0);
        vec3 c = mix(vec3(0.12,0.2,0.25) * 0.6, vec3(0.31,0.96,0.79) * (1.2 + flow), done);
        gl_FragColor = vec4(c * uOn, 1.0);
      }`,
  });
  const pathMesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 240, 0.04, 6, false), pathMat);
  scene.add(pathMesh);
  const nodeGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.12, 6);
  const nodeMeshes = nodes.map((p) => {
    const mat = new THREE.MeshBasicMaterial({ color: MINT.clone(), transparent: true, opacity: 0 });
    const m = new THREE.Mesh(nodeGeo, mat);
    m.position.copy(p);
    scene.add(m);
    return m;
  });

  /* —— Polvo / estrellas —— */
  const DN = mobile ? 900 : 1800;
  const dust = new Float32Array(DN * 3);
  for (let i = 0; i < DN; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(8 + Math.random() * 45);
    dust.set([v.x, Math.abs(v.y) * 0.8 - 1, v.z], i * 3);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
  const dustPts = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: "#9adfff", size: 0.05, sizeAttenuation: true, transparent: true, opacity: 0.7, depthWrite: false }),
  );
  scene.add(dustPts);

  /* —— Postproceso —— */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), mobile ? 0.55 : 0.7, 0.5, 0.42);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* —— Escenas desde el DOM —— */
  let marks: { el: HTMLElement; top: number; h: number }[] = [];
  let fixed: number | null = null;
  function refresh() {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
    const y = scrollY;
    marks = els.map((el) => {
      const r = el.getBoundingClientRect();
      return { el, top: r.top + y, h: Math.max(r.height, 1) };
    });
    const w = document.querySelector<HTMLElement>("[data-world]");
    fixed = !marks.length && w ? Number(w.dataset.world) || 0 : null;
  }

  function stageNow(): { s: number; local: number } {
    const mid = scrollY + innerHeight * 0.5;
    if (fixed !== null) {
      const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
      return { s: fixed, local: clamp01(scrollY / max) };
    }
    if (!marks.length) return { s: 0, local: 0 };
    for (let i = 0; i < marks.length; i++) {
      const m = marks[i];
      const local = (mid - m.top) / m.h;
      if (local < 1 || i === marks.length - 1) {
        const idx = Number(m.el.dataset.stage) || 0;
        if (local < 0) return { s: idx, local: 0 };
        const blend = smooth(clamp01((local - 0.62) / 0.38));
        return { s: Math.min(idx + (i < marks.length - 1 ? blend : 0), LAST), local: clamp01(local) };
      }
    }
    return { s: LAST, local: 1 };
  }

  function mix(s: number): P {
    const a = S[Math.floor(s)];
    const b = S[Math.min(Math.ceil(s), LAST)];
    const t = s - Math.floor(s);
    const out = {} as Record<string, unknown>;
    for (const k of Object.keys(a) as (keyof P)[]) {
      const va = a[k];
      const vb = b[k];
      out[k] = Array.isArray(va) ? va.map((v, i) => lerp(v, (vb as number[])[i], t)) : lerp(va, vb as number, t);
    }
    return out as P;
  }

  /* —— Entrada (tras la pantalla de carga) —— */
  let intro = document.documentElement.classList.contains("seen") || reduced ? 1 : 0;
  const onIntro = () => (intro = Math.max(intro, 0.0001));
  addEventListener("gos:intro", onIntro);

  /* —— Ratón —— */
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = (e.clientY / innerHeight) * 2 - 1;
  };
  addEventListener("pointermove", onMove, { passive: true });

  function resize() {
    const w = innerWidth;
    const h = innerHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloom.resolution.set(w / 2, h / 2);
    camera.aspect = w / h;
    camera.fov = w / h < 0.8 ? 55 : 42;
    camera.updateProjectionMatrix();
    refresh();
  }
  resize();
  addEventListener("resize", resize);
  const ro = new ResizeObserver(() => refresh());
  ro.observe(document.body);

  /* —— Bucle —— */
  const clock = new THREE.Clock();
  const cur = { s: -1, local: 0 };
  const camPos = new THREE.Vector3();
  const look = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const pc = new THREE.Vector3();
  const pl = new THREE.Vector3();
  const side = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const dummy = new THREE.Object3D();
  let raf = 0;
  let visible = true;
  const onVis = () => {
    visible = !document.hidden;
    if (visible) clock.getDelta();
  };
  document.addEventListener("visibilitychange", onVis);

  function frame() {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const speed = reduced ? 0.25 : 1;

    const { s, local } = stageNow();
    cur.s = cur.s < 0 ? s : lerp(cur.s, s, 1 - Math.exp(-dt * 4));
    cur.local = lerp(cur.local, local, 1 - Math.exp(-dt * 5));
    const p = mix(cur.s);
    const stageIdx = Math.round(cur.s);

    if (intro > 0 && intro < 1) intro = Math.min(1, intro + dt / 2.2);
    const ei = 1 - Math.pow(1 - intro, 3);

    const wide = innerWidth / innerHeight > 1.05;
    const fit = wide ? 1 : 0.82;
    const off = wide ? 1.7 : 0;
    core.position.x = lerp(core.position.x, p.side * off, 1 - Math.exp(-dt * 3));

    // Móvil
    phone.scale.setScalar(p.phone * lerp(0.4, 1, ei) * fit);
    phone.position.y = Math.sin(t * 0.8 * speed) * 0.08;
    phone.rotation.y = Math.sin(t * 0.35 * speed) * 0.45 + lerp(Math.PI * 2, 0, ei) + mouse.sx * 0.3 - p.side * 0.3;
    phone.rotation.x = -0.08 + mouse.sy * 0.1;
    phone.rotation.z = p.leak * Math.sin(t * 30) * 0.015;
    screenMat.uniforms.uSafe.value = p.safe;
    screenMat.uniforms.uTime.value = t;

    // Escudo
    const sh = p.shield * ei;
    shieldMat.uniforms.uOn.value = sh;
    shieldMat.uniforms.uTime.value = t;
    shield.scale.setScalar(lerp(0.6, 1, sh) * fit);
    wire.scale.copy(shield.scale);
    wire.rotation.y = t * 0.05;
    wireMat.opacity = 0.14 * sh;
    shield.visible = wire.visible = sh > 0.005;

    // Amenazas
    const rMin = lerp(0.75, 1.95, sh) * fit;
    for (let i = 0; i < TN; i++) {
      const d = tdata[i];
      const k = Math.abs(Math.sin(t * d.speed * speed + d.phase));
      const r = rMin + (d.max - rMin) * k;
      tmp.copy(d.dir).applyAxisAngle(d.axis, t * 0.08 * speed + d.phase);
      dummy.position.copy(tmp.multiplyScalar(r));
      dummy.rotation.set(t * d.spin, t * d.spin * 0.7, 0);
      dummy.scale.setScalar((0.6 + (1 - k) * 0.9) * (1 - p.lock * 0.6));
      dummy.updateMatrix();
      threats.setMatrixAt(i, dummy.matrix);
    }
    threats.instanceMatrix.needsUpdate = true;
    rimRed.intensity = (1 - p.safe) * 22;
    rim.intensity = 18 * p.safe;

    // Fugas
    leakMat.uniforms.uOn.value = p.leak;
    leakMat.uniforms.uTime.value = t;
    leaks.visible = p.leak > 0.01;

    // Anillos (se encienden uno a uno en la sección de seguridad)
    const ringLocal = stageIdx === 3 ? cur.local : 1;
    rings.forEach((r, i) => {
      const on = clamp01(ringLocal * 7 - i * 0.9) * p.rings;
      r.mat.opacity = on * 0.9;
      r.mesh.visible = on > 0.01;
      r.mesh.rotation.z = t * r.speed * speed * (i % 2 ? -1 : 1);
      r.mesh.scale.setScalar((0.85 + on * 0.15) * fit);
    });

    // Cajas sandbox
    cubes.forEach((c, i) => {
      const on = smooth(clamp01(p.cubes * 1.6 - i * 0.12));
      c.visible = on > 0.01;
      const a = c.userData.a + t * 0.25 * speed;
      const R = 1.75 * (wide ? 1 : 0.85);
      c.position.set(Math.cos(a) * R, c.userData.y, Math.sin(a) * R);
      c.scale.setScalar(on);
      c.rotation.set(t * 0.3, t * 0.4 + i, 0);
      (c.userData.app as THREE.Mesh).rotation.set(t, t * 1.3, 0);
    });

    // Fila de Pixel
    lineup.forEach((ph, i) => {
      const on = smooth(clamp01(p.lineup * 1.4 - i * 0.1));
      ph.visible = on > 0.01;
      const { x, z, ry } = ph.userData as { x: number; z: number; ry: number };
      ph.position.set(x * (wide ? 1 : 0.55) * on, Math.sin(t + i) * 0.06, z);
      ph.rotation.y = ry + Math.sin(t * 0.4 + i) * 0.15;
      ph.scale.setScalar(on * (wide ? 0.85 : 0.6));
    });

    // Candado
    lockGroup.visible = p.lock > 0.01;
    lockGroup.scale.setScalar(p.lock * (wide ? 0.85 : 0.7));
    lockGroup.rotation.y = Math.sin(t * 0.6) * 0.4;
    const close = stageIdx === 8 ? smooth(clamp01(cur.local * 2.2)) : p.lock;
    shackleG.position.y = 0.25 + (1 - close) * 0.16;
    shackleG.rotation.y = (1 - close) * 0.9;
    lockMat.emissiveIntensity = 0.15 + close * 0.5;

    // Suelo y torres
    floorMat.uniforms.uReveal.value = p.floor * ei;
    floorMat.uniforms.uTime.value = t * speed;
    floorMat.uniforms.uSafe.value = p.safe;
    towerMat.uniforms.uRise.value = p.rise;
    towerMat.uniforms.uTime.value = t;
    towers.visible = p.rise > 0.005;

    // Camino
    const pathLocal = stageIdx === 7 ? cur.local : p.path > 0.5 ? 1 : 0;
    pathMat.uniforms.uOn.value = p.path;
    pathMat.uniforms.uProg.value = pathLocal;
    pathMat.uniforms.uTime.value = t;
    pathMesh.visible = p.path > 0.01;
    nodeMeshes.forEach((m, i) => {
      const lit = pathLocal * 9.6 >= i ? 1 : 0;
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = p.path * (0.25 + lit * 0.75);
      mat.color.copy(lit ? MINT : BLUE).multiplyScalar(lit ? 1.8 : 0.5);
      m.scale.setScalar(1 + lit * 0.25 + (lit ? Math.sin(t * 4 + i) * 0.05 : 0));
    });

    // Cámara
    mouse.sx = lerp(mouse.sx, mouse.x, 1 - Math.exp(-dt * 3));
    mouse.sy = lerp(mouse.sy, mouse.y, 1 - Math.exp(-dt * 3));
    camPos.set(p.cam[0], p.cam[1], p.cam[2]);
    look.set(p.look[0], p.look[1], p.look[2]);
    // Recorrido sobre el camino de instalación
    const pw = smooth(clamp01(1 - Math.abs(cur.s - 7) * 1.4));
    if (pw > 0) {
      const at = curve.getPointAt(clamp01(pathLocal));
      tmp.set(at.x, 0, at.z).normalize();
      pc.set(at.x + tmp.x * 3.4, 0.6, at.z + tmp.z * 3.4);
      pl.set(at.x, -2.1, at.z);
      // Desplaza el objetivo a la izquierda para que el nodo activo quede a la derecha del texto
      if (wide) {
        side.subVectors(pl, pc).normalize().cross(camera.up).normalize();
        pl.addScaledVector(side, -1.6);
      }
      camPos.lerp(pc, pw);
      look.lerp(pl, pw);
    }
    if (!wide) camPos.multiplyScalar(1.12);
    camPos.x += mouse.sx * 0.35;
    camPos.y += -mouse.sy * 0.2 + lerp(2.5, 0, ei);
    camPos.z += lerp(4, 0, ei);
    camera.position.lerp(camPos, 1 - Math.exp(-dt * 3.2));
    q.copy(camera.quaternion);
    camera.lookAt(look);
    camera.quaternion.slerpQuaternions(q, camera.quaternion, 1 - Math.exp(-dt * 4));

    dustPts.rotation.y = t * 0.01;
    composer.render();
  }
  frame();

  return {
    refresh,
    destroy() {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      removeEventListener("gos:intro", onIntro);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      composer.dispose();
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
    },
  };
}
