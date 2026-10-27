import { describe, expect, it } from "vitest";
import { getArc } from "./arc";
import { getBeliefs } from "./beliefs";
import { getChrome } from "./chrome";
import { getContact } from "./contact";
import { getConversations } from "./conversations";
import { getEssaysUi } from "./essays-ui";
import { getExperience } from "./experience";
import { getHero } from "./hero";
import { getIdeas } from "./ideas";
import { getIntro } from "./intro";
import { getJourneyUi } from "./journey-ui";
import { getMedia } from "./media";
import { getPurpose } from "./purpose";
import { getSiteMeta } from "./site";
import { getCommunityProgram, getSpeaking, getTeaching } from "./speaking";
import { getTalk } from "./talk";
import { getWork } from "./work";

/** Recursive shape: object keys (sorted), array lengths and element shapes, primitive types. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, child]) => [key, shape(child)]),
    );
  }
  return typeof value;
}

/** Every string in a value, depth first. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value !== null && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

const getters = {
  hero: getHero,
  intro: getIntro,
  ideas: getIdeas,
  experience: (lang: "en" | "es") => getExperience(lang, new Date("2026-06-01")),
  beliefs: getBeliefs,
  purpose: getPurpose,
  conversations: getConversations,
  contact: getContact,
  chrome: getChrome,
  siteMeta: getSiteMeta,
  speaking: getSpeaking,
  teaching: getTeaching,
  community: getCommunityProgram,
  talk: getTalk,
  media: getMedia,
  work: getWork,
  essaysUi: getEssaysUi,
  journeyUi: getJourneyUi,
  arc: getArc,
};

describe("locale content parity", () => {
  it.each(Object.entries(getters))("%s has the same shape in English and Spanish", (_name, get) => {
    expect(shape(get("es"))).toEqual(shape(get("en")));
  });

  it.each(Object.entries(getters))("%s has no empty strings in either language", (_name, get) => {
    for (const lang of ["en", "es"] as const) {
      for (const text of strings(get(lang))) expect(text.length).toBeGreaterThan(0);
    }
  });

  it("shares every href between the languages", () => {
    const hrefs = (value: unknown): string[] => {
      if (Array.isArray(value)) return value.flatMap(hrefs);
      if (value !== null && typeof value === "object") {
        return Object.entries(value).flatMap(([key, child]) => (key === "href" ? [String(child)] : hrefs(child)));
      }
      return [];
    };
    for (const [name, get] of Object.entries(getters)) {
      // The WhatsApp invitation differs by design in its prefilled `text` parameter only.
      const normal = (list: string[]) => list.map((h) => h.replace(/&text=.*$/, ""));
      expect(normal(hrefs(get("es"))), name).toEqual(normal(hrefs(get("en"))));
    }
  });
});
