import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { milestones } from "./milestones";
import { FOUNDER_PROFILE_PDF, getSiteMeta, NAV_LINKS, SITE, TALK } from "./site";

describe("site data", () => {
  it("exposes the page metadata in English", () => {
    expect(getSiteMeta("en")).toEqual({
      title: "Vladimir Guzmán | A builder’s journey",
      description:
        "Vladimir Guzmán. Colombian entrepreneur, software engineer and founder of Gingga. A journey through technology, entrepreneurship and community.",
    });
  });

  it("exposes the page metadata in Spanish", () => {
    expect(getSiteMeta("es")).toEqual({
      title: "Vladimir Guzmán | El camino de un constructor",
      description:
        "Vladimir Guzmán. Emprendedor colombiano, ingeniero de software y fundador de Gingga. Un recorrido por la tecnología, el emprendimiento y la comunidad.",
    });
  });

  it("keeps only locale-neutral values in SITE", () => {
    expect(Object.keys(SITE).sort()).toEqual(["calendly", "email", "linkedin", "themeColor", "url"]);
  });

  it("links the journey page, its Now section, speaking and writing, work together and contact in order", () => {
    expect(NAV_LINKS.map((l) => l.href)).toEqual(["/journey", "/journey#now", "/speaking", "/work-together", "#contact"]);
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
