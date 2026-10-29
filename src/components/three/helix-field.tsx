"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/*
 * Ambient WebGL scene: a double helix of glowing particles (with base-pair
 * rungs) inside a field of drifting dust, coloured with the brand gradient.
 * Page scroll turns and lifts the helix while the camera moves through it,
 * so the whole page reads as travelling along one 3D structure.
 */

const BLUE = new THREE.Color("#0b5ae0");
const SKY = new THREE.Color("#0ea5e9");
const TEAL = new THREE.Color("#14b8a6");
const GREEN = new THREE.Color("#4cf277");

function gradient(t: number, out: THREE.Color) {
  if (t < 0.33) return out.copy(BLUE).lerp(SKY, t / 0.33);
  if (t < 0.66) return out.copy(SKY).lerp(TEAL, (t - 0.33) / 0.33);
  return out.copy(TEAL).lerp(GREEN, (t - 0.66) / 0.34);
}

function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.8)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function buildHelix(strandPoints: number, dust: number) {
  const LENGTH = 46;
  const RADIUS = 3.2;
  const TURNS = 7;
  const rungEvery = 14;
  const rungSteps = 10;
  // Rungs are placed at k = 0, rungEvery, 2·rungEvery… so round up.
  const rungs = Math.ceil(strandPoints / rungEvery);
  const total = strandPoints * 2 + rungs * rungSteps + dust;

  const positions = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);
  const sizes = new Float32Array(total);
  const c = new THREE.Color();
  let i = 0;

  const put = (x: number, y: number, z: number, t: number, s: number, dim = 1) => {
    positions.set([x, y, z], i * 3);
    gradient(t, c).multiplyScalar(dim);
    colors.set([c.r, c.g, c.b], i * 3);
    sizes[i] = s;
    i++;
  };

  for (let k = 0; k < strandPoints; k++) {
    const t = k / strandPoints;
    const a = t * Math.PI * 2 * TURNS;
    const y = (t - 0.5) * LENGTH;
    const j = () => (Math.random() - 0.5) * 0.18;
    put(Math.cos(a) * RADIUS + j(), y + j(), Math.sin(a) * RADIUS + j(), t, 1);
    put(Math.cos(a + Math.PI) * RADIUS + j(), y + j(), Math.sin(a + Math.PI) * RADIUS + j(), 1 - t, 1);

    if (k % rungEvery === 0) {
      for (let r = 1; r <= rungSteps; r++) {
        const f = r / (rungSteps + 1);
        const x = THREE.MathUtils.lerp(Math.cos(a) * RADIUS, Math.cos(a + Math.PI) * RADIUS, f);
        const z = THREE.MathUtils.lerp(Math.sin(a) * RADIUS, Math.sin(a + Math.PI) * RADIUS, f);
        put(x, y, z, f, 0.6, 0.7);
      }
    }
  }

  for (let d = 0; d < dust; d++) {
    const r = 6 + Math.random() * 16;
    const a = Math.random() * Math.PI * 2;
    put(Math.cos(a) * r, (Math.random() - 0.5) * LENGTH * 1.2, Math.sin(a) * r - 4, Math.random(), 0.45, 0.45);
  }

  return { positions, colors, sizes, count: i };
}

const vertexShader = /* glsl */ `
  attribute float aSize;
  varying vec3 vColor;
  uniform float uPixelRatio;
  uniform float uTime;
  void main() {
    vColor = color;
    vec3 p = position;
    p.x += sin(uTime * 0.4 + position.y * 0.6) * 0.06;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * 40.0 * uPixelRatio / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  varying vec3 vColor;
  void main() {
    float a = texture2D(uMap, gl_PointCoord).a;
    if (a < 0.02) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

function Helix({ compact, still }: { compact: boolean; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const tex = useDotTexture();
  const gl = useThree((s) => s.gl);
  const data = useMemo(
    () => buildHelix(compact ? 700 : 1500, compact ? 500 : 1300),
    [compact],
  );

  const uniforms = useMemo(
    () => ({
      uMap: { value: tex },
      uPixelRatio: { value: gl.getPixelRatio() },
      uTime: { value: 0 },
    }),
    [tex, gl],
  );

  const scroll = useRef(0);
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    };
    addEventListener("pointermove", onMove);
    return () => removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const target = max > 0 ? scrollY / max : 0;
    // Ease toward the real scroll position so motion stays silky.
    scroll.current += (target - scroll.current) * Math.min(1, delta * 4);
    const p = scroll.current;

    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime;
    const idle = still ? 0 : state.clock.elapsedTime * 0.05;
    g.rotation.y = idle + p * Math.PI * 3.2;
    g.rotation.z = 0.32 - p * 0.18;
    g.position.y = -14 + p * 30;

    // The camera drifts with the pointer and dollies in mid-page.
    const camera = state.camera;
    camera.position.x += ((compact ? 0 : -pointer.current.x * 1.2) - camera.position.x) * 0.04;
    camera.position.y += (pointer.current.y * 0.8 - camera.position.y) * 0.04;
    camera.position.z = 20 - Math.sin(p * Math.PI) * 6;
    camera.lookAt(compact ? 0 : -3.5, 0, 0);
  });

  return (
    <group ref={group} position={[compact ? 0 : 3.2, 0, 0]}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.positions, 3]} count={data.count} />
          <bufferAttribute attach="attributes-color" args={[data.colors, 3]} count={data.count} />
          <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} count={data.count} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HelixField() {
  const [compact, setCompact] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setCompact(mq.matches);
      setStill(rm.matches);
    };
    update();
    mq.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 20], fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Helix compact={compact} still={still} />
    </Canvas>
  );
}
