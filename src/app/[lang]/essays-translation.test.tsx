import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ESSAYS, getEssays, START_HERE_SLUG } from "@/data/essays";
import { LOCALES } from "@/i18n/config";
import { readingTimeMinutes } from "@/lib/essays";
import EssayPage from "./essays/[slug]/page";
import EssaysPage from "./essays/page";

const hub = async (lang: "en" | "es") => render(await EssaysPage({ params: Promise.resolve({ lang }) }));
const article = async (lang: "en" | "es", slug: string) => render(await EssayPage({ params: Promise.resolve({ lang, slug }) }));

describe("the English essays hub", () => {
  it("lists the English translations, not the Spanish titles", async () => {
    const { container } = await hub("en");
    const grid = container.querySelector(".essays-grid") as HTMLElement;
    for (const [i, translation] of getEssays("en").entries()) {
      const link = within(grid).getByRole("link", { name: translation.title });
      expect(link).toHaveAttribute("href", `/en/essays/${ESSAYS[i]!.slug}`);
      expect(within(grid).queryByRole("link", { name: ESSAYS[i]!.title })).not.toBeInTheDocument();
    }
  });

  it("labels every essay shown, plus the Start here block, with Translated with AI", async () => {
    const { container } = await hub("en");
    const cards = container.querySelectorAll(".essay-card");
    expect(cards).toHaveLength(ESSAYS.length);
    for (const card of cards) expect(within(card as HTMLElement).getByText("Translated with AI")).toBeVisible();
    const start = container.querySelector(".essays-start") as HTMLElement;
    expect(within(start).getByText("Translated with AI")).toBeVisible();
    expect(screen.getAllByText("Translated with AI")).toHaveLength(ESSAYS.length + 1);
  });

  it("starts the reader at the English translation of the Start here essay", async () => {
    const { container } = await hub("en");
    const start = container.querySelector(".essays-start") as HTMLElement;
    const index = ESSAYS.findIndex((e) => e.slug === START_HERE_SLUG);
    expect(within(start).getByRole("link", { name: getEssays("en")[index]!.title })).toHaveAttribute(
      "href",
      `/en/essays/${START_HERE_SLUG}`,
    );
  });

  it("introduces the translations and drops the old Spanish-only sentence", async () => {
    const { container } = await hub("en");
    expect(container.textContent).toContain("Each one also has an English translation, made with AI.");
    expect(container.textContent).not.toContain("The essays are in Spanish");
    expect(container.textContent).not.toMatch(/In Spanish|Written in Spanish|IN SPANISH/);
  });
});

describe("the Spanish essays hub", () => {
  it("lists the originals with no translation label", async () => {
    const { container } = await hub("es");
    const grid = container.querySelector(".essays-grid") as HTMLElement;
    for (const essay of ESSAYS) {
      expect(within(grid).getByRole("link", { name: essay.title })).toHaveAttribute("href", `/es/essays/${essay.slug}`);
    }
    expect(container.querySelector(".essay-ai-badge")).toBeNull();
    expect(container.textContent).toContain("Cada uno tiene también una traducción al inglés hecha con IA.");
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
