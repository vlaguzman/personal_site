import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ESSAYS, getEssays } from "@/data/essays";
import { LOCALES } from "@/i18n/config";
import { readingTimeMinutes } from "@/lib/essays";
import EssayPage from "./essays/[slug]/page";
import SpeakingPage from "./speaking/page";

const speaking = async (lang: "en" | "es") => render(await SpeakingPage({ params: Promise.resolve({ lang }) }));
const article = async (lang: "en" | "es", slug: string) => render(await EssayPage({ params: Promise.resolve({ lang, slug }) }));

describe("the English writing section", () => {
  it("lists the English translations, not the Spanish titles", async () => {
    const { container } = await speaking("en");
    const grid = container.querySelector("#writing .essays-grid") as HTMLElement;
    for (const [i, translation] of getEssays("en").entries()) {
      const link = within(grid).getByRole("link", { name: translation.title });
      expect(link).toHaveAttribute("href", `/en/essays/${ESSAYS[i]!.slug}`);
      expect(within(grid).queryByRole("link", { name: ESSAYS[i]!.title })).not.toBeInTheDocument();
    }
  });

  it("labels every essay shown with Translated with AI", async () => {
    const { container } = await speaking("en");
    const cards = container.querySelectorAll("#writing .essay-card");
    expect(cards).toHaveLength(ESSAYS.length);
    for (const card of cards) expect(within(card as HTMLElement).getByText("Translated with AI")).toBeVisible();
    expect(screen.getAllByText("Translated with AI")).toHaveLength(ESSAYS.length);
  });

  it("introduces the translations and never calls an essay Spanish-only", async () => {
    const { container } = await speaking("en");
    const writing = container.querySelector("#writing") as HTMLElement;
    expect(writing.textContent).toContain("each one also has an English translation, made with AI.");
    expect(writing.textContent).not.toContain("The essays are in Spanish");
    expect(writing.textContent).not.toMatch(/In Spanish|Written in Spanish|IN SPANISH/);
  });
});

describe("the Spanish writing section", () => {
  it("lists the originals with no translation label", async () => {
    const { container } = await speaking("es");
    const grid = container.querySelector("#writing .essays-grid") as HTMLElement;
    for (const essay of ESSAYS) {
      expect(within(grid).getByRole("link", { name: essay.title })).toHaveAttribute("href", `/es/essays/${essay.slug}`);
    }
    expect(container.querySelector(".essay-ai-badge")).toBeNull();
    expect(container.textContent).toContain("cada una tiene también una traducción al inglés hecha con IA.");
  });
});

describe.each(ESSAYS.map((e, i) => [e.slug, i] as const))("essay page %s", (slug, i) => {
  it("shows the English translation, labelled, with a link to the original", async () => {
    const { container } = await article("en", slug);
    expect(screen.getByRole("heading", { level: 1, name: getEssays("en")[i]!.title })).toBeInTheDocument();
    expect(container.querySelector("article")).toHaveAttribute("lang", "en");
    expect(screen.getByText("Translated with AI")).toBeVisible();
    expect(screen.getByText("Translated with AI from the Spanish original.")).toBeVisible();
    expect(screen.getByRole("link", { name: "Read the original in Spanish" })).toHaveAttribute("href", `/es/essays/${slug}`);
  });

  it("shows the Spanish original untouched, with a link to the translation", async () => {
    const { container } = await article("es", slug);
    expect(screen.getByRole("heading", { level: 1, name: ESSAYS[i]!.title })).toBeInTheDocument();
    expect(container.querySelector("article")).toHaveAttribute("lang", "es");
    expect(screen.queryByText(/Translated with AI|Traducido con IA/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Leer en inglés (traducido con IA)" })).toHaveAttribute("href", `/en/essays/${slug}`);
  });

  it("goes back to the writing section and marks Speaking & writing as the current nav item", async () => {
    for (const lang of LOCALES) {
      const { container, unmount } = await article(lang, slug);
      expect(container.querySelector(".essay-back")).toHaveAttribute("href", `/${lang}/speaking#writing`);
      const nav = container.querySelector("nav.site-nav") as HTMLElement;
      const current = nav.querySelectorAll("[aria-current='page']");
      expect(current).toHaveLength(1);
      expect(current[0]).toHaveAttribute("href", `/${lang}/speaking`);
      unmount();
    }
  });

  it("relates only essays of the page language, in the page locale", async () => {
    for (const lang of LOCALES) {
      const { container, unmount } = await article(lang, slug);
      const related = container.querySelector(".essay-related") as HTMLElement;
      const links = within(related).getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.getAttribute("href")).toMatch(new RegExp(`^/${lang}/essays/`));
        const target = getEssays(lang).find((e) => `/${lang}/essays/${e.slug}` === link.getAttribute("href"))!;
        expect(link).toHaveTextContent(target.title);
      }
      unmount();
    }
  });
});

describe("reading time and sharing of a translation", () => {
  it("computes the reading time from the English body", async () => {
    await article("en", ESSAYS[0]!.slug);
    const minutes = readingTimeMinutes(getEssays("en")[0]!.sections);
    expect(screen.getByText(`${minutes} min read`)).toBeInTheDocument();
  });

  it("shares the translated title with English labels", async () => {
    const translation = getEssays("en")[0]!;
    await article("en", ESSAYS[0]!.slug);
    const x = screen.getByRole("link", { name: /Share on X/ });
    expect(x.getAttribute("href")).toContain(`text=${encodeURIComponent(translation.title)}`);
  });
});
