import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { ESSAYS } from "@/data/essays";
import type { Locale } from "@/i18n/config";
import EssayPage from "./essays/[slug]/page";
import JourneyPage from "./journey/page";
import SpeakingPage from "./speaking/page";
import WorkTogetherPage from "./work-together/page";

const ENGLISH_PHRASES = [
  "Challenge assumptions",
  "Start better conversations",
  "Invite me to speak",
  "What I speak about",
  "Featured talk",
  "Teaching",
  "Writing",
  "Independent thinking",
  "Practical experience",
  "How I can help",
  "Book a conversation",
  "Strategic advisory",
  "Start with the decision",
  "Looking for Gingga",
  "View slides",
  "Download PDF",
  "Related reading",
  "Translated with AI",
  "Read the original in Spanish",
];

const slug = ESSAYS[0]!.slug;
const params = (lang: Locale) => ({ params: Promise.resolve({ lang }) });

const pages: Record<string, (lang: Locale) => Promise<ReactElement>> = {
  speaking: (lang) => SpeakingPage(params(lang)),
  "work-together": (lang) => WorkTogetherPage(params(lang)),
  essay: (lang) => EssayPage({ params: Promise.resolve({ lang, slug }) }),
};

async function pageText(name: string, lang: Locale) {
  const { container } = render(await pages[name]!(lang));
  return (container.textContent ?? "").replace(/\s+/g, " ");
}

async function allText(lang: Locale) {
  const texts = await Promise.all(Object.keys(pages).map((name) => pageText(name, lang)));
  return texts.join(" ");
}

describe("speaking and writing, work together and essay copy", () => {
  it.each(Object.keys(pages))("shows no English phrase on the Spanish %s page", async (name) => {
    const text = await pageText(name, "es");
    for (const phrase of ENGLISH_PHRASES) expect(text, phrase).not.toContain(phrase);
  });

  it("keeps every English phrase on the English pages", async () => {
    const text = await allText("en");
    for (const phrase of ENGLISH_PHRASES) expect(text, phrase).toContain(phrase);
  });

  it("shows the Spanish headlines, writing section and article chrome on the Spanish pages", async () => {
    expect(await pageText("speaking", "es")).toContain("Cuestiona los supuestos.");
    expect(await pageText("work-together", "es")).toContain("Pensamiento independiente.");
    expect(await pageText("speaking", "es")).toContain("Escritos");
    expect(await pageText("essay", "es")).toContain("Lecturas relacionadas");
  });
});

const JOURNEY_ENGLISH_PHRASES = [
  "Different ventures",
  "One purpose",
  "What I learned",
  "Where my entrepreneurial",
  "Helping others",
  "Backing other builders",
  "Exploring a new market",
  "Technology that opens doors",
  "Explore Gingga",
  "Download founder profile",
  "FROM MY BLOG",
  "developers led",
  "monthly users supported",
];

async function journeyText(lang: Locale) {
  const { container } = render(await JourneyPage(params(lang)));
  return (container.textContent ?? "").replace(/\s+/g, " ");
}

describe("journey copy", () => {
  it("shows no English phrase on the Spanish journey page", async () => {
    const text = await journeyText("es");
    for (const phrase of JOURNEY_ENGLISH_PHRASES) expect(text, phrase).not.toContain(phrase);
    expect(text).toContain("Distintos proyectos.");
    // The title lines are separated by a <br />, which adds no text.
    expect(text).toContain("Donde empezó micamino emprendedor.");
    expect(text).toContain("DE MI BLOG");
    expect(text).toContain("Descargar perfil de fundador");
  });

  it("keeps the English journey page in English, with the blog posts translated with AI", async () => {
    const text = await journeyText("en");
    expect(text).toContain("Different ventures");
    expect(text).toContain("What I learned");
    expect(text).toContain("Download founder profile");
    expect(text).toContain("FROM MY BLOG · TRANSLATED WITH AI");
    expect(text).not.toContain("IN SPANISH");
  });
});

describe("work together tone", () => {
  it("does not sound like an agency in English", async () => {
    expect(await pageText("work-together", "en")).not.toMatch(/consultan|consulting|expert|agency|packages?\b/i);
  });

  it("does not sound like an agency in Spanish", async () => {
    expect(await pageText("work-together", "es")).not.toMatch(/consultor|consultoría|experto|agencia|paquete/i);
  });
});
