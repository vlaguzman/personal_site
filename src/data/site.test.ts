import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FOUNDER_PROFILE_PDF, NAV_LINKS, SITE, TALK } from "./site";

describe("site data", () => {
  it("exposes the page metadata", () => {
    expect(SITE.title).toBe("Vladimir Guzmán | A builder’s journey");
    expect(SITE.description).toMatch(/founder of Gingga/);
  });

  it("has the journey anchors, the essays hub and contact in order", () => {
    expect(NAV_LINKS.map((l) => l.href)).toEqual(["#journey", "#now", "#talks", "/essays", "#contact"]);
  });

  it("points at files that exist in public/", () => {
    for (const path of [FOUNDER_PROFILE_PDF, TALK.pdf, TALK.cover]) {
      expect(existsSync(join(process.cwd(), "public", path)), path).toBe(true);
    }
  });
});
