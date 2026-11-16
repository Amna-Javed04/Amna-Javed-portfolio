"use client";

import { useEffect, useRef } from "react";

/**
 * A drifting Three.js starfield. Three itself is imported after hydration so
 * it never blocks first paint, and the whole scene is skipped for reduced motion.
 */
export default function Starfield() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let teardown = () => {};

    void (async () => {
      const THREE = await import("three").catch(() => null);
      if (!THREE || cancelled || !hostRef.current) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 80);
      camera.position.set(0, 0, 16);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.domElement.className = "block h-full w-full";
      host.appendChild(renderer.domElement);

      const count =
        window.innerWidth < 640 ? 550 : window.innerWidth < 1100 ? 950 : 1500;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const tint = new THREE.Color();

      for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 34;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 24;

        const roll = Math.random();
        if (roll > 0.88) tint.set("#c084fc");
        else if (roll > 0.72) tint.set("#8b5cf6");
        else tint.set("#e6e6f0");
        tint.multiplyScalar(0.4 + Math.random() * 0.6);

        colors[i * 3] = tint.r;
        colors[i * 3 + 1] = tint.g;
        colors[i * 3 + 2] = tint.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.computeBoundingSphere();

      const material = new THREE.PointsMaterial({
        size: 0.115,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const stars = new THREE.Points(geometry, material);
      scene.add(stars);

      const resize = () => {
        const width = host.clientWidth || window.innerWidth;
        const height = host.clientHeight || window.innerHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      };
      resize();

      let pointerX = 0;
      let pointerY = 0;
      let targetX = 0;
      let targetY = 0;

      const onPointerMove = (event: PointerEvent) => {
        targetX = (event.clientX / window.innerWidth - 0.5) * 2;
        targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      };

      let frame = 0;
      let last = performance.now();
      let elapsed = 0;

      const renderFrame = (now: number) => {
        elapsed += Math.min((now - last) / 1000, 0.05);
        last = now;

        pointerX += (targetX - pointerX) * 0.035;
        pointerY += (targetY - pointerY) * 0.035;

        stars.rotation.y = elapsed * 0.012;
        stars.rotation.x = Math.sin(elapsed * 0.07) * 0.035;
        camera.position.x = pointerX * 0.9;
        camera.position.y = -pointerY * 0.6;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(renderFrame);
      };

      const start = () => {
        if (frame) return;
        last = performance.now();
        frame = window.requestAnimationFrame(renderFrame);
      };

      const stop = () => {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
      };

      const onVisibility = () => (document.hidden ? stop() : start());

      if (reducedMotion) {
        renderer.render(scene, camera);
      } else {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);
        start();
      }
      window.addEventListener("resize", resize);
      host.dataset.ready = "true";

      teardown = () => {
        stop();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        delete host.dataset.ready;
      };
    })();

    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100"
    />
  );
}
