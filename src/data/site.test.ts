import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { milestones } from "./milestones";
import { FOUNDER_PROFILE_PDF, NAV_LINKS, SITE, TALK } from "./site";

describe("site data", () => {
  it("exposes the page metadata", () => {
    expect(SITE.title).toBe("Vladimir Guzmán | A builder’s journey");
    expect(SITE.description).toMatch(/founder of Gingga/);
  });

  it("links the journey page, its Now section, speaking, the essays hub and contact in order", () => {
    expect(NAV_LINKS.map((l) => l.href)).toEqual(["/journey", "/journey#now", "/speaking", "/essays", "#contact"]);
  });

  it("only links to journey sections that exist in the timeline", () => {
    const ids = new Set(milestones.map((m) => m.id));
    const targets = NAV_LINKS.flatMap((l) => (l.href.startsWith("/journey#") ? [l.href.slice("/journey#".length)] : []));
    expect(targets.length).toBeGreaterThan(0);
    for (const id of targets) expect(ids.has(id), `#${id} is not a milestone id`).toBe(true);
  });

  it("points at files that exist in public/", () => {
    for (const path of [FOUNDER_PROFILE_PDF, TALK.pdf, TALK.cover]) {
      expect(existsSync(join(process.cwd(), "public", path)), path).toBe(true);
    }
  });
});
