// src/components/BackgroundMesh.jsx
import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
  Dynamic Triangular Mesh Background
  - Random points (large, airy), connected to nearest neighbors
  - Points slowly move (sinusoidal/phase offsets) -> mesh morphs
  - Gentle group breathing (scale oscillation)
  - Safe BufferAttribute creation + in-place updates
  - DPR clamp, reduced-motion respected, mobile fallback
*/

function TriangularNetwork({ points, pairs, positionsRef, posAttrRef, enabled, mouseRef }) {
  const groupRef = useRef();
  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0x6ea8ff,
        transparent: true,
        opacity: 0.16,
        linewidth: 1,
      }),
    []
  );

  useFrame(({ clock }, delta) => {
    if (!enabled) return;

    // time base (slow)
    const t = clock.getElapsedTime() * 0.28;

    // gentle breathing / scale on group
    if (groupRef.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 0.12) * 0.025;
      groupRef.current.scale.setScalar(scale);
    }

    // update positionsRef in-place: small per-point jitter with phase
    let p = 0;
    for (let i = 0; i < pairs.length; i++) {
      for (let k = 0; k < 2; k++) {
        const idx = pairs[i][k];
        const base = points[idx];
        // per-point phase to avoid synchronous motion
        const ph = base._phase;
        // subtle motion: sum of slow and faster small sines, plus slight mouse influence
        const ox = Math.sin(t * base._speed + ph) * base._amp * 0.9 + Math.sin(t * 0.6 + ph * 1.3) * base._amp * 0.4;
        const oy = Math.cos(t * (0.9 * base._speed) + ph * 1.1) * base._amp * 0.85 + Math.cos(t * 0.5 + ph) * base._amp * 0.35;
        const mz = (mouseRef.current?.x ?? 0.5) - 0.5;
        const my = 0.5 - (mouseRef.current?.y ?? 0.5);
        const mx = mz * 0.06;
        const myPar = my * 0.06;
        positionsRef.current[p++] = base.x + ox + mx;
        positionsRef.current[p++] = base.y + oy + myPar;
        positionsRef.current[p++] = base.z + Math.sin(t * 0.4 + ph) * base._amp * 0.06;
      }
    }

    // commit to attribute
    if (posAttrRef.current) {
      posAttrRef.current.array.set(positionsRef.current);
      posAttrRef.current.needsUpdate = true;
    }
  });

  // Build a LineSegments primitive from geometry that already contains the attribute.
  // The actual geometry object will be created outside and passed in via posAttrRef (see parent)
  // Here we just create a LineSegments using a fresh BufferGeometry that re-uses the attribute reference.
  // But to be safe, we create a geometry that pulls from posAttrRef when available inside a useEffect.

  const lineRef = useRef();

  useEffect(() => {
    // when posAttrRef becomes available, set it on a geometry attached to our lineRef
    if (!lineRef.current) return;
    const geom = new THREE.BufferGeometry();
    if (posAttrRef.current) geom.setAttribute("position", posAttrRef.current);
    lineRef.current.geometry = geom;

    return () => {
      if (lineRef.current?.geometry) {
        lineRef.current.geometry.dispose?.();
      }
    };
  }, [posAttrRef]);

  return (
    <group ref={groupRef}>
      <lineSegments ref={lineRef}>
        {/* geometry is set imperatively in useEffect above */}
        <lineBasicMaterial attach="material" color={0x6ea8ff} transparent opacity={0.16} />
      </lineSegments>
    </group>
  );
}

export default function BackgroundMesh() {
  const hasWindow = typeof window !== "undefined";
  const width = hasWindow ? window.innerWidth : 1200;

  // configuration: choose larger airy network
  const POINT_COUNT_X = width < 900 ? 14 : 24;
  const POINT_COUNT_Y = width < 900 ? 10 : 16;
  const SPREAD = width < 900 ? 18 : 36;

  // generate points once (random jitter applied to grid to make organic shapes)
  const points = useMemo(() => {
    const arr = [];
    for (let y = 0; y < POINT_COUNT_Y; y++) {
      for (let x = 0; x < POINT_COUNT_X; x++) {
        const baseX = (x / (POINT_COUNT_X - 1) - 0.5) * SPREAD;
        const baseY = (y / (POINT_COUNT_Y - 1) - 0.5) * (SPREAD * (POINT_COUNT_Y / POINT_COUNT_X));
        // add slight random offset so it's not perfectly grid-aligned
        const rx = (Math.random() - 0.5) * (SPREAD / POINT_COUNT_X) * 0.7;
        const ry = (Math.random() - 0.5) * (SPREAD / POINT_COUNT_Y) * 0.7;
        const pt = new THREE.Vector3(baseX + rx, baseY + ry, (Math.random() - 0.5) * 0.08);
        // attach small random properties for per-point motion control
        pt._amp = 0.08 + Math.random() * 0.12; // amplitude of motion
        pt._phase = Math.random() * Math.PI * 2;
        pt._speed = 0.6 + Math.random() * 0.9;
        arr.push(pt);
      }
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // compute nearest-neighbor pairs (k nearest)
  const pairs = useMemo(() => {
    const pairsArr = [];
    const k = 3; // connect to 3 nearest neighbors to create dense triangles
    for (let i = 0; i < points.length; i++) {
      const dists = points.map((p, j) => ({ j, d: points[i].distanceTo(p) }));
      dists.sort((a, b) => a.d - b.d);
      for (let n = 1; n <= k; n++) {
        pairsArr.push([i, dists[n].j]);
      }
    }
    // dedupe
    const set = new Set();
    return pairsArr.filter(([a, b]) => {
      const key = a < b ? `${a}_${b}` : `${b}_${a}`;
      if (set.has(key)) return false;
      set.add(key);
      return true;
    });
  }, [points]);

  // prepare base positions array (pairs.length * 2 * 3 floats)
  const pairCount = pairs.length;
  const basePositions = useMemo(() => {
    const arr = new Float32Array(pairCount * 2 * 3);
    let p = 0;
    for (let i = 0; i < pairCount; i++) {
      for (let k = 0; k < 2; k++) {
        const v = points[pairs[i][k]];
        arr[p++] = v.x;
        arr[p++] = v.y;
        arr[p++] = v.z;
      }
    }
    return arr;
  }, [pairs, points, pairCount]);

  // positionsRef stores mutable array used for BufferAttribute
  const positionsRef = useRef(basePositions.slice(0));
  const posAttrRef = useRef(null); // will be BufferAttribute

  // create BufferAttribute only once and attach to posAttrRef
  useEffect(() => {
    posAttrRef.current = new THREE.BufferAttribute(positionsRef.current, 3);
    return () => {
      // dispose if needed
      posAttrRef.current = null;
    };
  }, []);

  // mouse for subtle parallax
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  useEffect(() => {
    function onMove(e) {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // reduced-motion & visibility guards
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches && !document.hidden);
    if (mq.matches) setEnabled(false);
    mq.addEventListener?.("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      mq.removeEventListener?.("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // DPR clamp
  const [dpr] = useState(() => Math.min(1.5, hasWindow ? window.devicePixelRatio || 1 : 1));

  // mobile fallback: if tiny screen, just render a single slow DebugBox-ish wireframe big shape
  if (hasWindow && window.innerWidth < 420) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", width: "100%", height: "100vh" }} aria-hidden>
        <Canvas dpr={dpr} camera={{ position: [0, 0, 14], fov: 55 }} style={{ width: "100%", height: "100%" }}>
          <color attach="background" args={["#071026"]} />
          <ambientLight intensity={0.6} />
          <mesh rotation={[0, 0, 0]} scale={[10, 6, 1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={"#6ea7ff"} wireframe opacity={0.06} transparent />
          </mesh>
        </Canvas>
      </div>
    );
  }

  // main render: shader-like subtle background is optional; here we render only the network (keeps debug vibe)
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", width: "100%", height: "100vh" }} aria-hidden>
      <Canvas dpr={dpr} camera={{ position: [0, 0, 28], fov: 36 }} style={{ width: "100%", height: "100%" }}>
        <color attach="background" args={["#071026"]} />
        <ambientLight intensity={0.45} />
        {/* Triangular network primitive */}
        <TriangularNetwork
          points={points}
          pairs={pairs}
          positionsRef={positionsRef}
          posAttrRef={posAttrRef}
          enabled={enabled}
          mouseRef={mouseRef}
        />
      </Canvas>
    </div>
  );
}