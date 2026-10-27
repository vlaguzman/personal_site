import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { ESSAYS } from "@/data/essays";
import { LOCALES, type Locale } from "@/i18n/config";
import EssayPage from "./essays/[slug]/page";
import Home from "./page";
import JourneyPage from "./journey/page";
import SpeakingPage from "./speaking/page";
import WorkTogetherPage from "./work-together/page";

const slug = ESSAYS[0]!.slug;

const pages: Record<string, (lang: Locale) => Promise<ReactElement>> = {
  home: (lang) => Home({ params: Promise.resolve({ lang }) }),
  journey: (lang) => JourneyPage({ params: Promise.resolve({ lang }) }),
  speaking: (lang) => SpeakingPage({ params: Promise.resolve({ lang }) }),
  "work-together": (lang) => WorkTogetherPage({ params: Promise.resolve({ lang }) }),
  essay: (lang) => EssayPage({ params: Promise.resolve({ lang, slug }) }),
};

describe.each(LOCALES)("internal links on the %s site", (lang) => {
  it.each(Object.keys(pages))("every internal link on %s carries the locale prefix", async (name) => {
    const { container } = render(await pages[name]!(lang));
    // The language switcher and the original/translation links deliberately point to the other
    // locale; the switcher is checked separately below, the translation links in essays-translation.test.tsx.
    const hrefs = [...container.querySelectorAll("a[href]")]
      .filter((a) => !a.closest("nav.lang-switch") && !a.closest(".essay-translation"))
      .map((a) => a.getAttribute("href") ?? "");
    expect(hrefs.length).toBeGreaterThan(0);

    const internal = hrefs.filter((h) => h.startsWith("/") && !h.startsWith("//"));
    // Public assets (PDFs, images) are not localised; every other internal route must be.
    const routes = internal.filter((h) => !/^\/(docs|images)\//.test(h));
    expect(routes.length).toBeGreaterThan(0);
    for (const href of routes) {
      expect(href, `${name}: ${href}`).toMatch(new RegExp(`^/${lang}(/|#|\\?|$)`));
    }
  });

  it.each(Object.keys(pages))("the language switcher on %s targets the equivalent page", async (name) => {
    const { container } = render(await pages[name]!(lang));
    const nav = container.querySelector("nav.lang-switch")!;
    const [en, es] = [...nav.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    expect(en).toMatch(/^\/en(\/|$)/);
    expect(es).toMatch(/^\/es(\/|$)/);
    expect(en!.replace(/^\/en/, "")).toBe(es!.replace(/^\/es/, ""));
  });
});
