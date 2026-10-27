import { describe, expect, it } from "vitest";
import { milestones as en, getMilestones } from "./milestones";
import type { Block, Milestone } from "./types";

const es = getMilestones("es");

/** Every string in a value, depth first. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value !== null && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

/** The block values that never change between languages. */
function neutral(block: Block): unknown {
  switch (block.kind) {
    case "facts":
      return block.items.map((f) => f.value);
    case "origin":
      return block.href;
    case "ventureTree":
      return block.ventures.map((v) => v.href);
    case "gallery":
      return block.images.map((i) => i.src);
    case "video":
      return block.youtubeId;
    case "button":
      return block.href;
    case "posts":
      return block.items.map((i) => i.title);
    case "roles":
      return block.items.length;
    case "paragraph":
      return block.variant ?? null;
    case "yc":
    case "details":
      return null;
  }
}

const flags = (m: Milestone) => ({
  id: m.id,
  year: m.year === "Now" || m.year === "Hoy" ? "now" : m.year,
  yearIsRange: m.yearIsRange ?? false,
  current: m.current ?? false,
  companyBuilder: m.companyBuilder ?? false,
  hasLearned: m.learned !== undefined,
  titleLines: m.titleLines.length,
  hasEmphasis: m.titleEmphasis !== undefined,
});

describe("getMilestones", () => {
  it("returns the English list for en and a separate Spanish list for es", () => {
    expect(getMilestones("en")).toBe(en);
    expect(es).not.toBe(en);
  });

  it("mirrors the English milestones: same ids, order and flags", () => {
    expect(es.map(flags)).toEqual(en.map(flags));
  });

  it("mirrors the block sequence and every locale-neutral value", () => {
    es.forEach((m, i) => {
      const source = en[i]!;
      expect(
        m.blocks.map((b) => b.kind),
        m.id,
      ).toEqual(source.blocks.map((b) => b.kind));
      expect(m.blocks.map(neutral), m.id).toEqual(source.blocks.map(neutral));
    });
  });

  it("keeps the numeric facts and roles periods in the same slots", () => {
    es.forEach((m, i) => {
      const facts = (x: Milestone) => x.blocks.flatMap((b) => (b.kind === "facts" ? b.items.map((f) => f.value) : []));
      expect(facts(m), m.id).toEqual(facts(en[i]!));
    });
  });

  it("has no empty strings", () => {
    for (const m of es) for (const text of strings(m)) expect(text.length, m.id).toBeGreaterThan(0);
  });

  it("translates every prose string instead of copying the English", () => {
    es.forEach((m, i) => {
      const source = en[i]!;
      // Four eyebrows are only brand names, so they are the same in both languages.
      if (!["year2012", "year2017", "year2020", "year2022"].includes(m.id)) expect(m.eyebrow, m.id).not.toBe(source.eyebrow);
      expect(m.titleLines, m.id).not.toEqual(source.titleLines);
      m.blocks.forEach((block, j) => {
        const original = source.blocks[j]!;
        if (block.kind === "paragraph" && original.kind === "paragraph") expect(block.text, m.id).not.toBe(original.text);
        if (block.kind === "details" && original.kind === "details") expect(block.text, m.id).not.toBe(original.text);
        if (block.kind === "gallery" && original.kind === "gallery") {
          block.images.forEach((img, k) => expect(img.alt, `${m.id} image ${k}`).not.toBe(original.images[k]!.alt));
        }
      });
    });
  });

  it("labels the blog posts in the language of the page", () => {
    const label = (list: Milestone[]) =>
      list.flatMap((m) => m.blocks).flatMap((b) => (b.kind === "posts" ? [b.label] : []));
    expect(new Set(label(en))).toEqual(new Set(["FROM MY BLOG · TRANSLATED WITH AI"]));
    expect(new Set(label(es))).toEqual(new Set(["DE MI BLOG"]));
  });

  it("uses Spanish month abbreviations in capitals in the periods", () => {
    // Months spelled the same in both languages (MAR, MAY, JUN, JUL, SEP, OCT, NOV) cannot be told apart.
    const english = /\b(JAN|FEB|APR|AUG|DEC|WINTER|MARCH|MY ROLE|BUILDING)\b/;
    for (const m of es) expect(m.period, m.id).not.toMatch(english);
    expect(es.find((m) => m.id === "year2010")!.period).toBe("AGO 2010 – DIC 2012");
    expect(es.find((m) => m.id === "year2022")!.period).toBe("INVIERNO 2022");
    expect(es.find((m) => m.id === "year2023-investment")!.period).toBe("MARZO 2023");
    expect(es.find((m) => m.id === "year2016")!.period).toBe("DIC 2016 – ABR 2018 · MI ROL");
    expect(es.find((m) => m.id === "year2017")!.period).toBe("ABR 2017 – ENE 2020 · ROLES");
    expect(es.find((m) => m.id === "now")!.year).toBe("Hoy");
    expect(es.find((m) => m.id === "now")!.period).toBe("CONSTRUYENDO EL SIGUIENTE CAPÍTULO");
  });

  it("keeps the figures that were confirmed with the author", () => {
    const fact = (id: string) => es.find((m) => m.id === id)!.blocks.flatMap((b) => (b.kind === "facts" ? b.items : []));
    expect(fact("year2014-fluvip").map((f) => f.value)).toEqual(["4", "20"]);
    expect(fact("year2019").map((f) => f.value)).toEqual(["50,000", "15"]);
    expect(strings(es.find((m) => m.id === "year2022")).join(" ")).toContain("US$5.5m");
    expect(strings(es.find((m) => m.id === "year2014-fluvip")).join(" ")).toContain("US$4.5m");
  });
});
