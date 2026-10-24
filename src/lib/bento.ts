export type BentoShape = "tile" | "wide" | "big" | "full";

/**
 * Shapes for a 4-column bento grid: tile 1x1, wide 2x1, big 2x2, full 4x2.
 * Every full cycle and every remainder fills whole rows, so the grid has no holes.
 */
const CYCLE: BentoShape[] = ["big", "tile", "tile", "wide"];
const REMAINDER: Record<number, BentoShape[]> = {
  1: ["full"],
  2: ["big", "big"],
  3: ["big", "wide", "wide"],
};

export function bentoShapes(count: number): BentoShape[] {
  const cycles = Math.floor(count / CYCLE.length);
  const rest = REMAINDER[count % CYCLE.length] ?? [];
  return [...Array.from({ length: cycles }, () => CYCLE).flat(), ...rest];
}
