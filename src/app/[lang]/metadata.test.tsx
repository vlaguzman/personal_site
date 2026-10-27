import { describe, expect, it, vi } from "vitest";
import { ESSAYS } from "@/data/essays";
import { alternatesFor } from "@/i18n/config";

// next/font/google is resolved by the Next compiler; stub it for node/jsdom tests.
vi.mock("next/font/google", () => {
  const font = () => ({ variable: "font-var", className: "font-class" });
  return { Inter: font, JetBrains_Mono: font, Playfair_Display: font };
});

import RootLayout, * as layoutModule from "./layout";
import * as home from "./page";
import * as essay from "./essays/[slug]/page";
import * as essays from "./essays/page";
import * as journey from "./journey/page";
import * as speaking from "./speaking/page";
import * as workTogether from "./work-together/page";

const params = <T extends object>(p: T) => ({ params: Promise.resolve(p) });

describe("locale static params", () => {
  it("pre-renders the layout for every locale and 404s the rest", async () => {
    expect(await layoutModule.generateStaticParams()).toEqual([{ lang: "en" }, { lang: "es" }]);
    expect(layoutModule.dynamicParams).toBe(false);
  });

  it("pre-renders every essay in every locale", async () => {
    const all = await essay.generateStaticParams();
    expect(all).toHaveLength(ESSAYS.length * 2);
    expect(all).toContainEqual({ lang: "es", slug: ESSAYS[0]!.slug });
    expect(all).toContainEqual({ lang: "en", slug: ESSAYS[ESSAYS.length - 1]!.slug });
  });
});

describe("root layout", () => {
  it("sets the document language from the route", async () => {
    const tree = await RootLayout({ children: null, ...params({ lang: "es" }) });
    expect(tree.type).toBe("html");
    expect(tree.props.lang).toBe("es");
  });

  it("answers 404 for an unsupported locale", async () => {
    await expect(RootLayout({ children: null, ...params({ lang: "fr" }) })).rejects.toThrow();
  });
});

describe("layout metadata", () => {
  it("defaults the title and description to the site meta of the route locale", async () => {
    expect(await layoutModule.generateMetadata(params({ lang: "en" }))).toEqual({
      title: "Vladimir Guzmán | A builder’s journey",
      description: expect.stringMatching(/founder of Gingga/),
    });
    expect(await layoutModule.generateMetadata(params({ lang: "es" }))).toEqual({
      title: "Vladimir Guzmán | El camino de un constructor",
      description: expect.stringMatching(/fundador de Gingga/),
    });
  });

  it("keeps the viewport and theme colour", () => {
    expect(layoutModule.viewport).toMatchObject({ width: "device-width", themeColor: "#0F1F18" });
  });

  it("returns no metadata for an unsupported locale", async () => {
    expect(await layoutModule.generateMetadata(params({ lang: "fr" }))).toEqual({});
  });
});

describe("page metadata", () => {
  const cases = [
    ["/journey", journey.generateMetadata, journey],
    ["/speaking", speaking.generateMetadata, speaking],
    ["/work-together", workTogether.generateMetadata, workTogether],
    ["/essays", essays.generateMetadata, essays],
  ] as const;

  it.each(cases)("%s keeps its title and declares locale alternates", async (path, generateMetadata) => {
    for (const lang of ["en", "es"] as const) {
      const metadata = await generateMetadata(params({ lang }));
      expect(metadata.title).toMatch(/\| Vladimir Guzmán$/);
      expect(metadata.description).toBeTruthy();
      expect(metadata.alternates).toEqual(alternatesFor(lang, path));
    }
  });

  it("home keeps the layout title and declares locale alternates", async () => {
    const metadata = await home.generateMetadata(params({ lang: "es" }));
    expect(metadata.title).toBeUndefined();
    expect(metadata.alternates).toEqual(alternatesFor("es", "/"));
  });

  it("essay pages declare alternates for the same slug", async () => {
    const slug = ESSAYS[0]!.slug;
    const metadata = await essay.generateMetadata(params({ lang: "es", slug }));
    expect(metadata.alternates).toEqual(alternatesFor("es", `/essays/${slug}`));
    expect(metadata.title).toContain("Vladimir Guzmán");
  });
});
