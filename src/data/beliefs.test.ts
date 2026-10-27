import { describe, expect, it } from "vitest";
import { BELIEFS, BELIEFS_INTRO } from "./beliefs";
import { IDEAS } from "./ideas";

describe("BELIEFS", () => {
  it("has five convictions", () => {
    expect(BELIEFS).toHaveLength(5);
    expect(BELIEFS.map((b) => b.title)).toEqual([
      "Success should mean more than money.",
      "Nobody builds anything meaningful alone.",
      "Technology should expand human potential, not replace human purpose.",
      "Integrity is tested when it becomes inconvenient.",
      "Build a life worth living, not just a business worth selling.",
    ]);
    for (const b of BELIEFS) {
      expect(b.title.length).toBeGreaterThan(0);
      expect(b.text.length).toBeGreaterThan(0);
      expect(b.text.length, b.title).toBeLessThanOrEqual(220);
    }
  });

  it("does not repeat a claim already made in the ideas section", () => {
    const claims = IDEAS.items.map((i) => i.claim.toLowerCase());
    for (const b of BELIEFS) expect(claims, b.title).not.toContain(b.title.toLowerCase());
    expect(BELIEFS.map((b) => b.title)).not.toContain("Talent is everywhere. Opportunity is not.");
  });

  it("has unique titles", () => {
    expect(new Set(BELIEFS.map((b) => b.title)).size).toBe(BELIEFS.length);
  });

  it("sums the philosophy up in one line before the convictions", () => {
    expect(BELIEFS_INTRO.statement).toBe("Build with ambition. Act with integrity. Stay human.");
    expect(BELIEFS_INTRO.text).toBe(
      "I believe entrepreneurship can create freedom and opportunity, but it should never become an excuse to lose sight of what matters.",
    );
  });
});
