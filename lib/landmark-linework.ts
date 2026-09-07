type Point3D = [number, number, number];

function addSegment(lines: number[], from: Point3D, to: Point3D) {
  lines.push(...from, ...to);
}

function addPolyline(lines: number[], points: Point3D[], close = false) {
  for (let index = 1; index < points.length; index += 1) {
    addSegment(lines, points[index - 1], points[index]);
  }
  if (close && points.length > 2) addSegment(lines, points.at(-1)!, points[0]);
}

function addBox(
  lines: number[],
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  z1: number,
  z2: number,
) {
  const corners: Point3D[] = [
    [x1, y1, z1], [x2, y1, z1], [x2, y2, z1], [x1, y2, z1],
    [x1, y1, z2], [x2, y1, z2], [x2, y2, z2], [x1, y2, z2],
  ];
  for (const [from, to] of [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ]) addSegment(lines, corners[from], corners[to]);
}

function addHipRoof(
  lines: number[],
  x1: number,
  x2: number,
  y: number,
  ridgeY: number,
  z1: number,
  z2: number,
) {
  const inset = Math.min((x2 - x1) * 0.16, 0.7);
  const ridgeA: Point3D = [x1 + inset, ridgeY, 0];
  const ridgeB: Point3D = [x2 - inset, ridgeY, 0];
  addPolyline(lines, [[x1, y, z1], [x2, y, z1], [x2, y, z2], [x1, y, z2]], true);
  addSegment(lines, ridgeA, ridgeB);
  for (const corner of [[x1, y, z1], [x1, y, z2]] as Point3D[]) {
    addSegment(lines, corner, ridgeA);
  }
  for (const corner of [[x2, y, z1], [x2, y, z2]] as Point3D[]) {
    addSegment(lines, corner, ridgeB);
  }
}

function addPointedArch(
  lines: number[],
  centerX: number,
  baseY: number,
  springY: number,
  peakY: number,
  width: number,
  z: number,
) {
  const left = centerX - width * 0.5;
  const right = centerX + width * 0.5;
  addSegment(lines, [left, baseY, z], [left, springY, z]);
  addSegment(lines, [right, baseY, z], [right, springY, z]);

  const addCurve = (fromX: number, controlX: number, toX: number) => {
    let previous: Point3D = [fromX, springY, z];
    for (let step = 1; step <= 5; step += 1) {
      const t = step / 5;
      const inverse = 1 - t;
      const point: Point3D = [
        inverse * inverse * fromX + 2 * inverse * t * controlX + t * t * toX,
        inverse * inverse * springY + 2 * inverse * t * peakY + t * t * peakY,
        z,
      ];
      addSegment(lines, previous, point);
      previous = point;
    }
  };
  addCurve(left, centerX - width * 0.12, centerX);
  addCurve(right, centerX + width * 0.12, centerX);
}

function addOnionDome(lines: number[], centerX: number, centerZ: number) {
  const profile = [
    { y: 1.1, radius: 0.53 },
    { y: 1.32, radius: 0.68 },
    { y: 1.62, radius: 0.62 },
    { y: 1.94, radius: 0.42 },
    { y: 2.2, radius: 0.17 },
    { y: 2.38, radius: 0 },
  ];
  const sides = 12;
  for (const { y, radius } of profile.slice(0, -1)) {
    const ring = Array.from({ length: sides }, (_, index): Point3D => {
      const angle = (index / sides) * Math.PI * 2;
      return [centerX + Math.cos(angle) * radius, y, centerZ + Math.sin(angle) * radius];
    });
    addPolyline(lines, ring, true);
  }
  for (let side = 0; side < sides; side += 2) {
    const angle = (side / sides) * Math.PI * 2;
    addPolyline(
      lines,
      profile.map(({ y, radius }): Point3D => [
        centerX + Math.cos(angle) * radius,
        y,
        centerZ + Math.sin(angle) * radius,
      ]),
    );
  }
  addSegment(lines, [centerX, 2.38, centerZ], [centerX, 2.72, centerZ]);
}

function makeMunichLinework() {
  const lines: number[] = [];
  addBox(lines, -2.25, 2.25, -3.15, -1.45, -1.15, 1.15);
  addHipRoof(lines, -2.25, 2.25, -1.45, -0.72, -1.15, 1.15);

  for (const centerX of [-1.12, 1.12]) {
    addBox(lines, centerX - 0.55, centerX + 0.55, -3.15, 1.1, -1.28, -0.18);
    addOnionDome(lines, centerX, -0.73);
    addPointedArch(lines, centerX, -1.2, -0.4, 0.15, 0.42, -1.3);
    addPointedArch(lines, centerX, -2.45, -1.9, -1.55, 0.34, -1.3);
    for (const bandY of [-0.08, 0.9]) {
      addPolyline(
        lines,
        [
          [centerX - 0.55, bandY, -1.29],
          [centerX + 0.55, bandY, -1.29],
          [centerX + 0.55, bandY, -0.17],
          [centerX - 0.55, bandY, -0.17],
        ],
        true,
      );
    }
  }

  for (const centerX of [-0.55, 0, 0.55]) {
    addPointedArch(lines, centerX, -2.8, -2.28, -1.9, 0.32, -1.17);
  }
  return lines;
}

function makeCasablancaLinework() {
  const lines: number[] = [];
  addBox(lines, -3.6, 3.6, -3.15, -1.68, -1.35, 1.35);
  addBox(lines, -4.55, -3.6, -3.15, -2.25, -1.12, 1.12);
  addBox(lines, 3.6, 4.55, -3.15, -2.25, -1.12, 1.12);
  addHipRoof(lines, -3.72, 3.72, -1.68, -0.88, -1.45, 1.45);

  addBox(lines, -0.58, 0.58, -3.15, 1.72, -1.58, -0.42);
  addBox(lines, -0.7, 0.7, 1.72, 2.36, -1.7, -0.3);
  addBox(lines, -0.4, 0.4, 2.36, 2.78, -1.4, -0.6);
  addSegment(lines, [0, 2.78, -1], [0, 3.35, -1]);
  addSegment(lines, [-0.12, 3.12, -1], [0, 3.35, -1]);
  addSegment(lines, [0.12, 3.12, -1], [0, 3.35, -1]);

  addPointedArch(lines, 0, -0.72, 0.72, 1.36, 0.68, -1.6);
  for (const centerX of [-0.34, 0, 0.34]) {
    addPointedArch(lines, centerX, -2.95, -2.54, -2.24, 0.23, -1.6);
  }

  const arcadeCenters = Array.from({ length: 12 }, (_, index) => -4.1 + index * (8.2 / 11));
  for (const centerX of arcadeCenters) {
    addPointedArch(lines, centerX, -3.12, -2.74, -2.46, 0.48, -1.46);
  }
  for (const centerX of [-2.8, -1.85, 1.85, 2.8]) {
    addPointedArch(lines, centerX, -2.42, -2.02, -1.76, 0.62, -1.46);
  }

  for (const bandY of [-0.25, 1.5, 2.08, 2.6]) {
    addPolyline(
      lines,
      [
        [-0.58, bandY, -1.6],
        [0.58, bandY, -1.6],
        [0.58, bandY, -0.4],
        [-0.58, bandY, -0.4],
      ],
      true,
    );
  }
  return lines;
}

export const MUNICH_ARCHITECTURAL_LINES = makeMunichLinework();
export const CASABLANCA_ARCHITECTURAL_LINES = makeCasablancaLinework();
