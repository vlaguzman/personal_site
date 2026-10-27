import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { ESSAYS } from "@/data/essays";
import type { Locale } from "@/i18n/config";
import EssayPage from "./essays/[slug]/page";
import EssaysPage from "./essays/page";
import SpeakingPage from "./speaking/page";
import WorkTogetherPage from "./work-together/page";

const ENGLISH_PHRASES = [
  "Challenge assumptions",
  "Start better conversations",
  "Invite me to speak",
  "What I speak about",
  "Featured talk",
  "In the community",
  "About Vladimir",
  "Independent thinking",
  "Practical experience",
  "How I can help",
  "Book a conversation",
  "Strategic advisory",
  "Start with the decision",
  "Looking for Gingga",
  "Watch on YouTube",
  "View slides",
  "Download PDF",
  "Download founder profile",
  "Subscribe",
  "Related reading",
  "Start here",
];

const slug = ESSAYS[0]!.slug;
const params = (lang: Locale) => ({ params: Promise.resolve({ lang }) });

const pages: Record<string, (lang: Locale) => Promise<ReactElement>> = {
  speaking: (lang) => SpeakingPage(params(lang)),
  "work-together": (lang) => WorkTogetherPage(params(lang)),
  essays: (lang) => EssaysPage(params(lang)),
  essay: (lang) => EssayPage({ params: Promise.resolve({ lang, slug }) }),
};

async function pageText(name: string, lang: Locale) {
  const { container } = render(await pages[name]!(lang));
  return (container.textContent ?? "").replace(/\s+/g, " ");
}

/** The signup form is only rendered once a newsletter endpoint exists, so it is rendered directly. */
function signupFormText(lang: Locale) {
  const { container } = render(<NewsletterSignup lang={lang} endpoint="https://example.com/subscribe" email="a@b.c" />);
  return (container.textContent ?? "").replace(/\s+/g, " ");
}

async function allText(lang: Locale) {
  const texts = await Promise.all(Object.keys(pages).map((name) => pageText(name, lang)));
  return [...texts, signupFormText(lang)].join(" ");
}

describe("speaking, work together and essays copy", () => {
  it.each(Object.keys(pages))("shows no English phrase on the Spanish %s page", async (name) => {
    const text = await pageText(name, "es");
    for (const phrase of ENGLISH_PHRASES) expect(text, phrase).not.toContain(phrase);
  });

  it("shows no English phrase in the Spanish newsletter form", () => {
    const text = signupFormText("es");
    for (const phrase of ENGLISH_PHRASES) expect(text, phrase).not.toContain(phrase);
  });

  it("keeps every English phrase on the English pages", async () => {
    const text = await allText("en");
    for (const phrase of ENGLISH_PHRASES) expect(text, phrase).toContain(phrase);
  });

  it("shows the Spanish headlines, hub title and article chrome on the Spanish pages", async () => {
    expect(await pageText("speaking", "es")).toContain("Cuestiona los supuestos.");
    expect(await pageText("work-together", "es")).toContain("Pensamiento independiente.");
    expect(await pageText("essays", "es")).toContain("Lo que aprendí construyendo");
    expect(await pageText("essay", "es")).toContain("Lecturas relacionadas");
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
