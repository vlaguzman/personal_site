import { describe, expect, it } from "vitest";
import { HERO } from "./hero";

describe("hero data", () => {
  it("points the essay CTA at the essays hub", () => {
    expect(HERO.primaryCta).toEqual({ label: "Read my essays", href: "/essays" });
  });

  it("introduces him by his former CTO roles", () => {
    expect(HERO.subheadline).toBe(
      "Former CTO at HoyTrabajas.com (YC W22) & FLUVIP (Latin American Influencer Marketing Leader)",
    );
  });

  it("uses a photo that exists in public/ with a meaningful alt", async () => {
    const { existsSync } = await import("node:fs");
    expect(existsSync(`public${HERO.photo.src}`)).toBe(true);
    expect(HERO.photo.alt).toBe("Vladimir Guzmán presenting at Clare Hall, Cambridge");
  });
});
