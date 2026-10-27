import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getMilestones, milestones } from "./milestones";
import type { Block } from "./types";

const ids = milestones.map((m) => m.id);

describe("milestones", () => {
  it("keeps the 15 milestones in chronological order", () => {
    expect(milestones).toHaveLength(15);
    expect(ids[0]).toBe("year2010");
    expect(ids.at(-1)).toBe("now");
  });

  it("has unique ids", () => {
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has a title, eyebrow, period and content for each milestone", () => {
    for (const m of milestones) {
      expect(m.titleLines.length, m.id).toBeGreaterThan(0);
      expect(m.eyebrow, m.id).not.toBe("");
      expect(m.period, m.id).not.toBe("");
      expect(m.blocks.length, m.id).toBeGreaterThan(0);
    }
  });

  it("marks exactly one milestone as current, and it is the last", () => {
    const current = milestones.filter((m) => m.current);
    expect(current.map((m) => m.id)).toEqual(["now"]);
  });

  it("only links to anchors that exist", () => {
    const hrefs: string[] = [];
    const collect = (b: Block) => {
      if (b.kind === "origin") hrefs.push(b.href);
      if (b.kind === "ventureTree") b.ventures.forEach((v) => hrefs.push(v.href));
    };
    milestones.forEach((m) => m.blocks.forEach(collect));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(ids).toContain(href.slice(1));
  });

  it("gives every blog post a title and body", () => {
    const posts = milestones.flatMap((m) => m.blocks).flatMap((b) => (b.kind === "posts" ? b.items : []));
    expect(posts).toHaveLength(5);
    for (const post of posts) {
      expect(post.title, post.title).not.toBe("");
      expect(post.sections.length, post.title).toBeGreaterThan(0);
    }
  });

  it("only references gallery images that exist in public/", () => {
    const srcs = milestones.flatMap((m) => m.blocks).flatMap((b) => (b.kind === "gallery" ? b.images.map((i) => i.src) : []));
    expect(srcs).toHaveLength(17);
    for (const src of srcs) expect(existsSync(join("public", src)), src).toBe(true);
  });

  it("only adds a short `learned` lesson where the copy already states one", () => {
    const withLesson = milestones.filter((m) => m.learned !== undefined);
    expect(withLesson.length).toBeGreaterThanOrEqual(5);
    for (const m of withLesson) {
      expect(m.learned!.trim(), m.id).not.toBe("");
      expect(m.learned!.length, m.id).toBeLessThanOrEqual(200);
    }
    expect(milestones.find((m) => m.id === "now")?.learned).toBeUndefined();
    expect(milestones.find((m) => m.id === "year2012")?.learned).toBeUndefined();
  });

  it("opens Gingga externally", () => {
    const button = milestones.flatMap((m) => m.blocks).find((b) => b.kind === "button");
    expect(button).toMatchObject({ href: "https://gingga.com/" });
  });
});

describe("leadership figures", () => {
  const facts = (id: string) =>
    milestones
      .find((m) => m.id === id)
      ?.blocks.flatMap((b) => (b.kind === "facts" ? b.items : [])) ?? [];

  it("starts FLUVIP with 4 people (him included) and 20 people led", () => {
    expect(facts("year2014-fluvip").map((f) => f.value)).toEqual(["4", "20"]);
  });

  it("has him leading 15 people at HoyTrabajas", () => {
    expect(facts("year2019").find((f) => f.label === "developers led")?.value).toBe("15");
  });
});

describe("duplicated lessons", () => {
  /** All paragraph and details text of a milestone, the copy that sits around its `learned` box. */
  const prose = (id: string) =>
    milestones
      .find((m) => m.id === id)!
      .blocks.flatMap((b) => (b.kind === "paragraph" ? [b.text] : b.kind === "details" ? [b.text] : []))
      .join(" ");
  const learned = (id: string) => milestones.find((m) => m.id === id)!.learned;

  const removed: [id: string, sentence: string][] = [
    ["year2010", "It was an early lesson in how hard building a business can be, and how much it changes you."],
    ["year2011", "to validate it and learn from early adopters"],
    ["year2014-tappsi", "It gave me an early view of how product, funding and a business model come together."],
    ["year2014-fluvip", "It was where I learned to connect technology decisions with the realities of building a company."],
    ["year2017", "The experience strengthened my approach to commercial validation and financial discipline."],
    ["year2019", "The mission also sharpened my belief that learning begins with awareness: people need to see how a new skill could change their lives."],
    ["year2023-community", "Talent is often already there; what people need is a chance to recognise it, develop it and put it to work."],
  ];

  it.each(removed)("%s no longer repeats its lesson in the copy", (id, sentence) => {
    expect(prose(id)).not.toContain(sentence);
    expect(learned(id)).toBeTruthy();
  });

  it("keeps the learned boxes as they were", () => {
    expect(learned("year2010")).toBe("Building a business is harder than it looks, and it changes the person who builds it.");
    expect(learned("year2011")).toBe("Take an idea to people in person first: validate it and learn from early adopters.");
    expect(learned("year2014-tappsi")).toBe("How product, funding and a business model come together.");
    expect(learned("year2019")).toBe("Learning begins with awareness: people need to see how a new skill could change their lives.");
  });

  it("records the Guía Londres Business Mentor recognition as its own milestone, apart from the Consulate", () => {
    for (const lang of ["en", "es"] as const) {
      const list = getMilestones(lang);
      const ids = list.map((m) => m.id);
      const award = list.find((m) => m.id === "year2025-mentor-awards")!;
      expect(award, lang).toBeDefined();
      expect(award.year).toBe("2025");
      expect(award.period).toBe("14 JUN 2025");
      expect(award.eyebrow).toBe("GUÍA LONDRES / MENTOR AWARDS 2025");
      expect(award.titleLines.join(" ")).toMatch(/Business Mentor/);
      expect(ids.indexOf("year2025-mentor-awards")).toBe(ids.indexOf("year2023-community") + 1);
      expect(ids.indexOf("year2025-mentor-awards")).toBeLessThan(ids.indexOf("now"));

      const consulate = list.find((m) => m.id === "year2023-community")!;
      const text = (blocks: typeof award.blocks) => blocks.flatMap((b) => (b.kind === "paragraph" ? [b.text] : []));
      expect(text(consulate.blocks).join(" "), lang).not.toMatch(/Business Mentor|Guía Londres/);
      expect(consulate.blocks.flatMap((b) => (b.kind === "gallery" ? b.images.map((i) => i.src) : []))).not.toContain(
        "/images/journey/guia-londres-mentor-awards-2025.jpg",
      );

      expect(text(award.blocks)).toEqual([
        lang === "en"
          ? "On 14 June 2025, Guía Londres recognised me as a Business Mentor at its Mentor Awards 2025."
          : "El 14 de junio de 2025, Guía Londres me reconoció como Business Mentor en sus Mentor Awards 2025.",
      ]);
      const gallery = award.blocks.find((b) => b.kind === "gallery");
      expect(gallery?.kind === "gallery" && gallery.images.map((i) => i.src)).toEqual([
        "/images/journey/guia-londres-mentor-awards-2025.jpg",
      ]);
    }
  });

  it("leaves the surrounding sentences readable", () => {
    expect(prose("year2011")).toContain("taking the idea into an in-person format.");
    expect(prose("year2014-tappsi")).toContain("Tappsi would later become a Colombian startup success story");
    expect(prose("year2017")).toContain("The pandemic hit the bar concept hard and the business eventually closed.");
    expect(prose("year2023-community")).toContain("Working with migrant entrepreneurs deepened my commitment to combining technology, education and practical support.");
    expect(prose("year2010")).toContain("I chose to co-found a small restaurant: Funky’s, in Chía, Colombia.");
  });
});
