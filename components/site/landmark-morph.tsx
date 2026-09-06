"use client";

import landmarkPoints from "@/lib/landmark-points.json";
import { useEffect, useRef, useState } from "react";

type Point3D = [number, number, number];
type Landmark = "munich" | "casablanca";

const POINT_COUNT = landmarkPoints.munich.length / 3;
const MUNICH_POINTS = landmarkPoints.munich;
const CASABLANCA_POINTS = landmarkPoints.casablanca;
const MUNICH_LINES = landmarkPoints.munichLines;
const CASABLANCA_LINES = landmarkPoints.casablancaLines;

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

const DOT_SEEDS = Array.from({ length: POINT_COUNT }, (_, index) => {
  const random = seededRandom(index * 17 + 41);
  return [random(), random(), random()] as Point3D;
});

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function LandmarkMorph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<Landmark>("munich");
  const [active, setActive] = useState<Landmark>("munich");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let frame = 0;
    let visible = true;
    let startTime = performance.now();
    let pausedAt = 0;
    let pointerX = 0;
    let pointerY = 0;
    let easedPointerX = 0;
    let easedPointerY = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = Math.max(
        -1,
        Math.min(1, ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2),
      );
      pointerY = Math.max(
        -1,
        Math.min(1, ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2),
      );
    };

    const draw = (now: number) => {
      if (!visible) return;

      const elapsed = reducedMotion ? 0 : now - startTime;
      const zone = canvas.closest<HTMLElement>(".work-landmark-zone");
      const zoneBounds = zone?.getBoundingClientRect();
      const scrollRange = Math.max((zoneBounds?.height ?? 0) - window.innerHeight, 1);
      const scrollProgress = zoneBounds
        ? Math.max(0, Math.min(1, -zoneBounds.top / scrollRange))
        : 0;
      const morph = reducedMotion ? 0 : easeInOutCubic(scrollProgress);
      const transitionScatter = Math.sin(morph * Math.PI);
      const nextActive: Landmark = morph < 0.5 ? "munich" : "casablanca";

      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }

      easedPointerX += (pointerX - easedPointerX) * 0.035;
      easedPointerY += (pointerY - easedPointerY) * 0.035;
      context.clearRect(0, 0, width, height);

      const seconds = elapsed / 1000;
      const yaw = 0.2 + Math.sin(seconds * 0.28) * 0.12 + easedPointerX * 0.12;
      const pitch = -0.075 + easedPointerY * 0.045;
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      const isCompact = width < 860;
      const unit =
        Math.min(width / 8.6, height / 7.8) * (isCompact ? 0.88 : 0.7);
      const centerX = width * (isCompact ? 0.52 : 0.73);
      const centerY = height * (isCompact ? 0.59 : 0.63);
      const projectPoint = (x: number, y: number, z: number) => {
        const rotatedX = x * cosYaw - z * sinYaw;
        const rotatedZ = x * sinYaw + z * cosYaw;
        const rotatedY = y * cosPitch - rotatedZ * sinPitch;
        const depth = y * sinPitch + rotatedZ * cosPitch;
        const perspective = 8.5 / (8.5 + depth);
        return {
          x: centerX + rotatedX * unit * perspective,
          y: centerY - rotatedY * unit * perspective,
          z: depth,
          scale: perspective,
        };
      };
      const projections: Array<{
        x: number;
        y: number;
        z: number;
        index: number;
        scale: number;
      }> = [];

      for (let index = 0; index < POINT_COUNT; index += 1) {
        const offset = index * 3;
        const seed = DOT_SEEDS[index];
        const swirl = transitionScatter * transitionScatter;
        const angle = seed[0] * Math.PI * 2 + seconds * (0.32 + seed[2] * 0.22);
        const radius = swirl * (0.2 + seed[1] * 0.85);
        // The LoD2 source is aligned along the nave. Turn it toward its iconic
        // west facade so both Frauenkirche towers remain legible.
        const munichX = -MUNICH_POINTS[offset + 2];
        const munichZ = MUNICH_POINTS[offset];
        const x =
          munichX +
          (CASABLANCA_POINTS[offset] - munichX) * morph +
          Math.cos(angle) * radius;
        const y =
          MUNICH_POINTS[offset + 1] +
          (CASABLANCA_POINTS[offset + 1] - MUNICH_POINTS[offset + 1]) * morph +
          Math.sin(angle * 1.25) * radius * 0.72;
        const z =
          munichZ +
          (CASABLANCA_POINTS[offset + 2] - munichZ) * morph +
          Math.sin(angle) * radius;

        const projected = projectPoint(x, y, z);
        const projection = {
          x: projected.x,
          y: projected.y,
          z: projected.z,
          index,
          scale: projected.scale,
        };
        projections.push(projection);
      }

      const drawLineMesh = (
        lines: number[],
        opacity: number,
        turnMunich = false,
        edgeStep = 6,
      ) => {
        if (opacity < 0.015) return;
        context.strokeStyle = `rgba(27, 24, 20, ${opacity})`;
        context.lineWidth = 0.65;
        context.beginPath();
        for (let index = 0; index < lines.length; index += edgeStep) {
          const fromX = turnMunich ? -lines[index + 2] : lines[index];
          const fromZ = turnMunich ? lines[index] : lines[index + 2];
          const toX = turnMunich ? -lines[index + 5] : lines[index + 3];
          const toZ = turnMunich ? lines[index + 3] : lines[index + 5];
          const from = projectPoint(fromX, lines[index + 1], fromZ);
          const to = projectPoint(toX, lines[index + 4], toZ);
          context.moveTo(from.x, from.y);
          context.lineTo(to.x, to.y);
        }
        context.stroke();
      };

      drawLineMesh(MUNICH_LINES, 0.2 * Math.pow(1 - morph, 1.8), true, 12);
      drawLineMesh(CASABLANCA_LINES, 0.22 * Math.pow(morph, 1.8));

      projections.sort((a, b) => b.z - a.z);

      for (const point of projections) {
        if (point.index % 13 !== 0 && point.index % 37 !== 0 && point.index % 89 !== 0) continue;
        const isViolet = point.index % 37 === 0;
        const isSunset = point.index % 89 === 0;
        const alpha = Math.max(0.2, Math.min(0.58, 0.34 + point.scale * 0.14));
        context.fillStyle = isSunset
          ? `rgba(238, 108, 61, ${Math.min(0.92, alpha + 0.18)})`
          : isViolet
            ? `rgba(105, 65, 198, ${Math.min(0.9, alpha + 0.12)})`
            : `rgba(27, 24, 20, ${alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, Math.max(0.45, point.scale * 0.68), 0, Math.PI * 2);
        context.fill();
      }

      context.strokeStyle = "rgba(27, 24, 20, 0.12)";
      context.lineWidth = 0.75;
      context.beginPath();
      context.ellipse(centerX, height * 0.89, unit * 2.4, unit * 0.28, 0, 0, Math.PI * 2);
      context.stroke();

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = entry.isIntersecting;
      if (nextVisible === visible) return;
      visible = nextVisible;
      window.cancelAnimationFrame(frame);

      if (visible) {
        startTime += performance.now() - pausedAt;
        frame = window.requestAnimationFrame(draw);
      } else {
        pausedAt = performance.now();
      }
    });
    intersectionObserver.observe(canvas);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div className="landmark-morph">
      <p className="sr-only">
        A line-mesh study morphing Munich&apos;s Frauenkirche into Casablanca&apos;s Hassan II Mosque.
      </p>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="landmark-morph-compass" aria-hidden="true">
        <span>N</span>
        <i />
      </div>
      <div className="landmark-morph-active" aria-hidden="true">
        <span>{active === "munich" ? "01 / MUNICH" : "02 / CASABLANCA"}</span>
        <strong>{active === "munich" ? "Frauenkirche" : "Hassan II Mosque"}</strong>
      </div>
      <div className="landmark-morph-route" aria-hidden="true">
        <span className={active === "munich" ? "is-active" : ""}>MUC</span>
        <i />
        <span className={active === "casablanca" ? "is-active" : ""}>CAS</span>
      </div>
    </div>
  );
}
