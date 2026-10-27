import { describe, expect, it } from "vitest";
import { HERO } from "./hero";

describe("hero data", () => {
  it("leads with the brand statement", () => {
    expect(HERO.headlineLines).toEqual(["Question the obvious."]);
    expect(HERO.headlineEmphasis).toBe("Build what matters.");
  });

  it("states his name and roles", () => {
    expect(HERO.byline).toEqual({
      name: "Vladimir Guzmán",
      roles: "Entrepreneur · Technology Builder · Speaker",
    });
  });

  it("introduces him through failure, restarting and the YC story", () => {
    expect(HERO.lead).toEqual([
      "I’ve built businesses, led technology teams, experienced failure and started again.",
      "From opening a restaurant in Colombia to building a Y Combinator-backed company, I’ve learned that the most valuable ideas often begin by questioning what everyone else takes for granted.",
    ]);
  });

  it("points the primary CTA at the essays hub and the secondary at contact", () => {
    expect(HERO.primaryCta).toEqual({ label: "Explore my thinking", href: "/essays" });
    expect(HERO.secondaryCta).toEqual({ label: "Invite me to speak", href: "#contact" });
  });

  it("uses a photo that exists in public/ with a meaningful alt", async () => {
    const { existsSync } = await import("node:fs");
    expect(existsSync(`public${HERO.photo.src}`)).toBe(true);
    expect(HERO.photo.alt).toBe("Vladimir Guzmán presenting at Clare Hall, Cambridge");
  });
});
