import { describe, expect, it, vi } from "vitest";
import { ESSAYS, getEssays } from "@/data/essays";
import { alternatesFor } from "@/i18n/config";
import { excerpt } from "@/lib/essays";

// next/font/google is resolved by the Next compiler; stub it for node/jsdom tests.
// The options each font factory receives are kept so tests can assert the font setup.
const fontOptions = vi.hoisted(() => ({}) as Record<string, Record<string, unknown>>);
vi.mock("next/font/google", () => {
  const font = (name: string) => (options: Record<string, unknown>) => {
    fontOptions[name] = options;
    return { variable: "font-var", className: "font-class" };
  };
  return { Geist: font("Geist"), Geist_Mono: font("Geist_Mono"), Newsreader: font("Newsreader") };
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

describe("typefaces", () => {
  it("loads Newsreader with its optical-size axis so large headlines get the refined display cut", () => {
    expect(fontOptions.Newsreader.axes).toEqual(["opsz"]);
    expect(fontOptions.Newsreader.style).toEqual(["normal", "italic"]);
  });
});

describe("layout metadata", () => {
  it("defaults the title and description to the site meta of the route locale", async () => {
    expect(await layoutModule.generateMetadata(params({ lang: "en" }))).toMatchObject({
      title: "Vladimir Guzmán | A builder’s journey",
      description: expect.stringMatching(/founder of Gingga/),
    });
    expect(await layoutModule.generateMetadata(params({ lang: "es" }))).toMatchObject({
      title: "Vladimir Guzmán | El camino de un constructor",
      description: expect.stringMatching(/fundador de Gingga/),
    });
  });

  it("resolves canonical and hreflang URLs against an absolute site URL", async () => {
    for (const lang of ["en", "es"]) {
      const meta = await layoutModule.generateMetadata(params({ lang }));
      expect(String(meta.metadataBase)).toBe("https://vlaguzman.com/");
    }
  });

  it("keeps the viewport and theme colour", () => {
    expect(layoutModule.viewport).toMatchObject({ width: "device-width", themeColor: "#172033" });
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

  it("localises the title and description of the journey", async () => {
    const metaEn = await journey.generateMetadata(params({ lang: "en" }));
    const metaEs = await journey.generateMetadata(params({ lang: "es" }));
    expect(metaEn.title).toBe("The journey | Vladimir Guzmán");
    expect(metaEs.title).toBe("Mi trayectoria | Vladimir Guzmán");
    expect(metaEs.description).not.toBe(metaEn.description);
  });

  it("localises the title and description of speaking, work together and the essays hub", async () => {
    const titles = {
      "/speaking": ["Speaking | Vladimir Guzmán", "Charlas | Vladimir Guzmán"],
      "/work-together": ["Work together | Vladimir Guzmán", "Trabajemos juntos | Vladimir Guzmán"],
      "/essays": ["Essays | Vladimir Guzmán", "Ensayos | Vladimir Guzmán"],
    } as const;
    const generators = {
      "/speaking": speaking.generateMetadata,
      "/work-together": workTogether.generateMetadata,
      "/essays": essays.generateMetadata,
    } as const;
    for (const [path, [en, es]] of Object.entries(titles) as [keyof typeof titles, readonly [string, string]][]) {
      const metaEn = await generators[path](params({ lang: "en" }));
      const metaEs = await generators[path](params({ lang: "es" }));
      expect(metaEn.title).toBe(en);
      expect(metaEs.title).toBe(es);
      expect(metaEs.description).not.toBe(metaEn.description);
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
    expect(metadata.title).toContain(ESSAYS[0]!.title);
  });

  it("english essay pages use the translated title and excerpt, with the same alternates", async () => {
    for (const [i, translation] of getEssays("en").entries()) {
      const slug = ESSAYS[i]!.slug;
      const metadata = await essay.generateMetadata(params({ lang: "en", slug }));
      expect(metadata.title).toBe(`${translation.title} | Vladimir Guzmán`);
      expect(metadata.title).not.toContain(ESSAYS[i]!.title);
      expect(metadata.description).toBe(excerpt(translation.sections, 160));
      expect(metadata.alternates).toEqual(alternatesFor("en", `/essays/${slug}`));
      expect(metadata.openGraph).toMatchObject({ locale: "en", title: translation.title });
    }
  });

  it("spanish essay pages keep the original title and locale", async () => {
    const metadata = await essay.generateMetadata(params({ lang: "es", slug: ESSAYS[0]!.slug }));
    expect(metadata.openGraph).toMatchObject({ locale: "es", title: ESSAYS[0]!.title });
  });
});
