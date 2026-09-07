"use client";

import landmarkPoints from "@/lib/landmark-points.json";
import {
  CASABLANCA_ARCHITECTURAL_LINES,
  MUNICH_ARCHITECTURAL_LINES,
} from "@/lib/landmark-linework";
import { useEffect, useRef } from "react";

type Point3D = [number, number, number];
type Landmark = "munich" | "casablanca";
type LandmarkVariant = "scroll-morph" | Landmark;
type LandmarkColorZone = { selector: string; color: string };

type LandmarkMorphProps = {
  variant?: LandmarkVariant;
  monochromeColor?: string;
  monochromeColorTo?: string;
  className?: string;
  scrollContainerSelector?: string;
  reverseMorph?: boolean;
  centerX?: number;
  centerY?: number;
  scale?: number;
  compactCenterX?: number;
  compactCenterY?: number;
  compactScale?: number;
  colorZones?: LandmarkColorZone[];
};

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

export function LandmarkMorph({
  variant = "scroll-morph",
  monochromeColor,
  monochromeColorTo,
  className,
  scrollContainerSelector = ".work-landmark-zone",
  reverseMorph = false,
  centerX: centerXRatio,
  centerY: centerYRatio,
  scale = 1,
  compactCenterX,
  compactCenterY,
  compactScale,
  colorZones,
}: LandmarkMorphProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorZonesKey = JSON.stringify(colorZones ?? []);

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
    const monochromeStart = monochromeColor?.split(",").map(Number);
    const monochromeEnd = (monochromeColorTo ?? monochromeColor)?.split(",").map(Number);
    const parsedColorZones = (JSON.parse(colorZonesKey) as LandmarkColorZone[]).map((zone) => ({
      ...zone,
      channels: zone.color.split(",").map(Number),
    }));

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
      const zone = variant === "scroll-morph"
        ? canvas.closest<HTMLElement>(scrollContainerSelector)
        : null;
      const zoneBounds = zone?.getBoundingClientRect();
      const scrollRange = Math.max((zoneBounds?.height ?? 0) - window.innerHeight, 1);
      const scrollProgress = zoneBounds
        ? Math.max(0, Math.min(1, -zoneBounds.top / scrollRange))
        : 0;
      const forwardMorph = variant === "casablanca"
        ? 1
        : variant === "munich" || reducedMotion
          ? 0
          : easeInOutCubic(scrollProgress);
      const morph = variant === "scroll-morph" && reverseMorph
        ? 1 - forwardMorph
        : forwardMorph;
      const transitionScatter = Math.sin(morph * Math.PI);
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
      const responsiveScale = isCompact ? compactScale ?? scale : scale;
      const unit =
        Math.min(width / 8.6, height / 7.8) * (isCompact ? 0.88 : 0.7) * responsiveScale;
      const defaultCenterX = isCompact ? 0.52 : 0.73 - morph * 0.04;
      const defaultCenterY = isCompact ? 0.59 - morph * 0.11 : 0.63 - morph * 0.2;
      const centerX = width * (isCompact
        ? compactCenterX ?? centerXRatio ?? defaultCenterX
        : centerXRatio ?? defaultCenterX);
      const centerY = height * (isCompact
        ? compactCenterY ?? centerYRatio ?? defaultCenterY
        : centerYRatio ?? defaultCenterY);
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
        lineWidth = 0.65,
        color = "27, 24, 20",
      ) => {
        if (opacity < 0.015) return;
        context.strokeStyle = `rgba(${color}, ${opacity})`;
        context.lineWidth = lineWidth;
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

      const munichOpacity = Math.pow(1 - morph, 1.8);
      const casablancaOpacity = Math.pow(morph, 1.8);
      let activeMonochromeColor = monochromeStart && monochromeEnd
        ? monochromeStart
            .map((channel, index) => Math.round(channel + (monochromeEnd[index] - channel) * morph))
            .join(", ")
        : undefined;
      if (parsedColorZones.length > 0) {
        let contextualColor = [27, 24, 20];
        const canvasBounds = canvas.getBoundingClientRect();
        const modelScreenY = canvasBounds.top + centerY;
        const transitionDistance = Math.min(180, height * 0.2);

        for (const zone of parsedColorZones) {
          const section = document.querySelector<HTMLElement>(zone.selector);
          if (!section) continue;
          const sectionTop = section.getBoundingClientRect().top;
          const blend = Math.max(
            0,
            Math.min(1, (modelScreenY - sectionTop + transitionDistance) / (transitionDistance * 2)),
          );
          contextualColor = contextualColor.map((channel, index) =>
            Math.round(channel + (zone.channels[index] - channel) * blend),
          );
        }

        activeMonochromeColor = contextualColor.join(", ");
      }
      const baseLineColor = activeMonochromeColor ?? "27, 24, 20";
      const munichAccent = activeMonochromeColor ?? "105, 65, 198";
      const casablancaAccent = activeMonochromeColor ?? "238, 108, 61";
      const usesSectionContrast = parsedColorZones.length > 0;
      const baseMeshOpacity = usesSectionContrast ? 0.16 : activeMonochromeColor ? 0.18 : 0.1;
      const detailMeshOpacity = usesSectionContrast ? 0.52 : activeMonochromeColor ? 0.58 : 0.32;
      const haloMeshOpacity = usesSectionContrast ? 0.07 : activeMonochromeColor ? 0.1 : 0.075;

      drawLineMesh(MUNICH_LINES, baseMeshOpacity * munichOpacity, true, 6, 0.65, baseLineColor);
      drawLineMesh(CASABLANCA_LINES, baseMeshOpacity * casablancaOpacity, false, 6, 0.65, baseLineColor);
      drawLineMesh(
        MUNICH_ARCHITECTURAL_LINES,
        haloMeshOpacity * munichOpacity,
        false,
        6,
        2.2,
        munichAccent,
      );
      drawLineMesh(
        MUNICH_ARCHITECTURAL_LINES,
        detailMeshOpacity * munichOpacity,
        false,
        6,
        0.85,
        baseLineColor,
      );
      drawLineMesh(
        CASABLANCA_ARCHITECTURAL_LINES,
        haloMeshOpacity * casablancaOpacity,
        false,
        6,
        2.2,
        casablancaAccent,
      );
      drawLineMesh(
        CASABLANCA_ARCHITECTURAL_LINES,
        detailMeshOpacity * casablancaOpacity,
        false,
        6,
        0.85,
        baseLineColor,
      );

      projections.sort((a, b) => b.z - a.z);

      for (const point of projections) {
        if (point.index % 13 !== 0 && point.index % 37 !== 0 && point.index % 89 !== 0) continue;
        const isViolet = point.index % 37 === 0;
        const isSunset = point.index % 89 === 0;
        const pointPresence = 0.3 + transitionScatter * 0.7;
        const alpha = Math.max(0.12, Math.min(0.5, 0.3 + point.scale * 0.12)) * pointPresence;
        context.fillStyle = activeMonochromeColor
          ? `rgba(${activeMonochromeColor}, ${Math.min(0.72, alpha + 0.08)})`
          : isSunset
            ? `rgba(238, 108, 61, ${Math.min(0.92, alpha + 0.18)})`
            : isViolet
              ? `rgba(105, 65, 198, ${Math.min(0.9, alpha + 0.12)})`
              : `rgba(27, 24, 20, ${alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, Math.max(0.45, point.scale * 0.68), 0, Math.PI * 2);
        context.fill();
      }

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
  }, [
    centerXRatio,
    centerYRatio,
    compactCenterX,
    compactCenterY,
    compactScale,
    colorZonesKey,
    monochromeColor,
    monochromeColorTo,
    reverseMorph,
    scale,
    scrollContainerSelector,
    variant,
  ]);

  const description = variant === "munich"
    ? "A line-mesh study of Munich's Frauenkirche."
    : variant === "casablanca"
      ? "A line-mesh study of Casablanca's Hassan II Mosque."
      : "A line-mesh study morphing Munich's Frauenkirche into Casablanca's Hassan II Mosque.";

  return (
    <div className={className ? `landmark-morph ${className}` : "landmark-morph"}>
      <p className="sr-only">{description}</p>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
