import { describe, expect, it } from "vitest";
import type { Essay } from "@/data/types";
import {
  buildShareLinks,
  excerpt,
  getEssay,
  readingTimeMinutes,
  relatedEssays,
  topicsInUse,
} from "./essays";

const make = (slug: string, topic?: Essay["topic"]): Essay => ({
  slug,
  title: `Title ${slug}`,
  topic,
  lang: "en",
  sections: [{ text: "word ".repeat(10).trim() }],
});

describe("readingTimeMinutes", () => {
  it("rounds up at 200 words per minute, counting headings and text", () => {
    expect(readingTimeMinutes([{ text: "a ".repeat(200).trim() }])).toBe(1);
    expect(readingTimeMinutes([{ text: "a ".repeat(201).trim() }])).toBe(2);
    expect(readingTimeMinutes([{ heading: "one two", text: "a ".repeat(199).trim() }])).toBe(2);
  });

  it("never reports less than one minute", () => {
    expect(readingTimeMinutes([{ text: "short" }])).toBe(1);
  });
});

describe("excerpt", () => {
  it("returns the first paragraph untouched when it is short", () => {
    expect(excerpt([{ text: "Hello world." }], 50)).toBe("Hello world.");
  });

  it("cuts at a word boundary and adds an ellipsis", () => {
    expect(excerpt([{ text: "alpha beta gamma delta" }], 12)).toBe("alpha beta…");
  });

  it("skips empty sections and returns an empty string for no body", () => {
    expect(excerpt([{ text: "  " }, { text: "Real." }], 50)).toBe("Real.");
    expect(excerpt([], 50)).toBe("");
  });
});

describe("topicsInUse", () => {
  it("lists only topics that have essays, in canonical order", () => {
    const list = [make("a", "Strategy"), make("b"), make("c", "Startups"), make("d", "Strategy")];
    expect(topicsInUse(list)).toEqual(["Startups", "Strategy"]);
  });

  it("is empty when no essay has a topic", () => {
    expect(topicsInUse([make("a")])).toEqual([]);
  });
});

describe("getEssay", () => {
  it("finds by slug and returns undefined otherwise", () => {
    const list = [make("a"), make("b")];
    expect(getEssay("b", list)?.slug).toBe("b");
    expect(getEssay("zzz", list)).toBeUndefined();
  });
});

describe("relatedEssays", () => {
  const list = [make("a", "Startups"), make("b", "Strategy"), make("c", "Startups"), make("d"), make("e", "Startups")];

  it("never includes the essay itself", () => {
    expect(relatedEssays("a", list, 10).map((e) => e.slug)).not.toContain("a");
  });

  it("puts same-topic essays first, then the rest in order, capped at the limit", () => {
    expect(relatedEssays("a", list, 3).map((e) => e.slug)).toEqual(["c", "e", "b"]);
    expect(relatedEssays("d", list, 2).map((e) => e.slug)).toEqual(["a", "b"]);
  });

  it("returns an empty list for an unknown slug's neighbours only when nothing else exists", () => {
    expect(relatedEssays("a", [make("a")], 3)).toEqual([]);
  });
});

describe("buildShareLinks", () => {
  it("encodes the title and url for X and LinkedIn", () => {
    const links = buildShareLinks("Hola & adiós", "https://example.com/essays/x?a=1");
    expect(links.x).toBe(
      "https://twitter.com/intent/tweet?text=Hola%20%26%20adi%C3%B3s&url=https%3A%2F%2Fexample.com%2Fessays%2Fx%3Fa%3D1",
    );
    expect(links.linkedin).toBe(
      "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fexample.com%2Fessays%2Fx%3Fa%3D1",
    );
  });
});
