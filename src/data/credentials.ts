import { milestones } from "./milestones";
import type { Credential } from "./types";

/**
 * Track-record figures for the strip under the hero.
 * Every number comes from milestone copy; only the years are computed.
 */
export function getCredentials(now: Date = new Date()): Credential[] {
  const startYear = Number.parseInt(milestones[0].year, 10);
  return [
    { value: "YC W22", label: "HoyTrabajas, Y Combinator Winter 2022" },
    { value: String(now.getFullYear() - startYear), label: `years building, since ${startYear}` },
    { value: "50,000", label: "monthly users supported at HoyTrabajas" },
    { value: "20+", label: "different companies where I have managed teams" },
    { value: "270+", label: "entrepreneurs reached at the Colombian Consulate in London" },
  ];
}
