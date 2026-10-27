import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getChrome } from "@/data/chrome";
import { NAV_LINKS } from "@/data/site";
import { Header } from "./Header";

describe("Header", () => {
  it("links the wordmark to the top of the page", () => {
    render(<Header lang="en" />);
    const home = screen.getByRole("link", { name: /Vladimir Guzmán/ });
    expect(home).toHaveAttribute("href", "#home");
    expect(home).toHaveTextContent("ENTREPRENEUR & BUILDER");
  });

  it("shows both surnames in the wordmark", () => {
    render(<Header lang="en" />);
    expect(screen.getByRole("link", { name: /Vladimir Guzmán Mendoza/ })).toBeInTheDocument();
  });

  it("renders every nav link pointing at its section", () => {
    render(<Header lang="en" />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav.querySelectorAll("a")).toHaveLength(NAV_LINKS.length);
    for (const { href, label } of getChrome("en").nav) {
      const expected = href.startsWith("#") ? href : `/en${href}`;
      expect(screen.getByRole("link", { name: new RegExp(label) })).toHaveAttribute("href", expected);
    }
  });

  it("has exactly four links, in order, in both languages", () => {
    const expected = {
      en: ["The journey", "Speaking & writing", "Work together", "Let’s connect ↗"],
      es: ["Mi trayectoria", "Charlas y escritos", "Trabajemos juntos", "Conectemos ↗"],
    };
    for (const lang of ["en", "es"] as const) {
      render(<Header lang={lang} />);
      const nav = screen.getByRole("navigation", { name: getChrome(lang).navLabel });
      const links = [...nav.querySelectorAll("a")];
      expect(links.map((a) => a.textContent?.trim())).toEqual(expected[lang]);
      expect(links.map((a) => a.getAttribute("href"))).toEqual([
        `/${lang}/journey`,
        `/${lang}/speaking`,
        `/${lang}/work-together`,
        "#contact",
      ]);
      cleanup();
    }
  });

  it("lists the nav links in the same order and with the same hrefs in both languages", () => {
    for (const lang of ["en", "es"] as const) {
      render(<Header lang={lang} />);
      const nav = screen.getByRole("navigation", { name: getChrome(lang).navLabel });
      const hrefs = [...nav.querySelectorAll("a")].map((a) => a.getAttribute("href"));
      expect(hrefs).toEqual(NAV_LINKS.map(({ href }) => (href.startsWith("#") ? href : `/${lang}${href}`)));
      cleanup();
    }
  });

  it("marks the connect arrow as decorative", () => {
    render(<Header lang="en" />);
    const link = screen.getByRole("link", { name: /Let’s connect/ });
    expect(link.querySelector("[aria-hidden='true']")).toHaveTextContent("↗");
  });

  it("prefixes every route link with the active locale", () => {
    render(<Header lang="es" />);
    expect(screen.getByRole("link", { name: "Charlas y escritos" })).toHaveAttribute("href", "/es/speaking");
    expect(screen.getByRole("link", { name: "Trabajemos juntos" })).toHaveAttribute("href", "/es/work-together");
    expect(screen.getByRole("link", { name: /Mi trayectoria/ })).toHaveAttribute("href", "/es/journey");
    expect(screen.queryByRole("link", { name: "Ahora" })).toBeNull();
  });

  it("keeps in-page anchors on the home page", () => {
    render(<Header lang="es" />);
    expect(screen.getByRole("link", { name: /Conectemos/ })).toHaveAttribute("href", "#contact");
  });

  it("translates the wordmark subtitle and the navigation labels", () => {
    render(<Header lang="es" />);
    expect(screen.getByRole("link", { name: /Vladimir Guzmán/ })).toHaveTextContent("EMPRENDEDOR Y CONSTRUCTOR");
    expect(screen.getByRole("navigation", { name: "Navegación principal" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Idioma" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Main navigation" })).toBeNull();
  });

  describe("on a sub-page", () => {
    it("sends home anchors back to the locale home page", () => {
      render(<Header lang="en" currentPath="/speaking" />);
      expect(screen.getByRole("link", { name: /Vladimir Guzmán/ })).toHaveAttribute("href", "/en#home");
      expect(screen.getByRole("link", { name: /Let’s connect/ })).toHaveAttribute("href", "/en#contact");
      expect(screen.getByRole("link", { name: /The journey/ })).toHaveAttribute("href", "/en/journey");
      expect(screen.getByRole("link", { name: "Speaking & writing" })).toHaveAttribute("href", "/en/speaking");
    });

    it("keeps the Spanish locale in home anchors", () => {
      render(<Header lang="es" currentPath="/speaking" />);
      expect(screen.getByRole("link", { name: /Vladimir Guzmán/ })).toHaveAttribute("href", "/es#home");
      expect(screen.getByRole("link", { name: /Conectemos/ })).toHaveAttribute("href", "/es#contact");
    });

    it("marks the journey page as current when on it", () => {
      render(<Header lang="en" currentPath="/journey" />);
      expect(screen.getByRole("link", { name: /The journey/ })).toHaveAttribute("aria-current", "page");
      expect(screen.queryByRole("link", { name: "Now" })).toBeNull();
    });

    it("marks the current section with aria-current", () => {
      render(<Header lang="en" currentPath="/speaking" />);
      expect(screen.getByRole("link", { name: "Speaking & writing" })).toHaveAttribute("aria-current", "page");
      expect(screen.getByRole("link", { name: /Let’s connect/ })).not.toHaveAttribute("aria-current");
    });
  });

  describe("language switcher", () => {
    it("sits outside the main navigation", () => {
      render(<Header lang="en" />);
      const main = screen.getByRole("navigation", { name: "Main navigation" });
      const switcher = screen.getByRole("navigation", { name: "Language" });
      expect(main.contains(switcher)).toBe(false);
      expect(main.querySelectorAll("a")).toHaveLength(NAV_LINKS.length);
    });

    it("points at the home page of each language from the home page", () => {
      render(<Header lang="en" />);
      expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en");
      expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es");
    });

    it("keeps the equivalent page, defaulting to the current path", () => {
      render(<Header lang="en" currentPath="/speaking" />);
      expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/speaking");
      expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es/speaking");
    });

    it("uses the explicit page path for nested pages such as an essay", () => {
      render(<Header lang="es" currentPath="/speaking" path="/essays/some-slug" />);
      expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/essays/some-slug");
      expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es/essays/some-slug");
      expect(screen.getByRole("link", { name: "Charlas y escritos" })).toHaveAttribute("aria-current", "page");
    });

    it("flags the active language", () => {
      render(<Header lang="es" />);
      expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("aria-current", "true");
    });
  });

  it.each(["en", "es"] as const)("styles the main nav through a class, never through its translated label (%s)", (lang) => {
    render(<Header lang={lang} />);
    const nav = screen.getByRole("navigation", { name: lang === "en" ? "Main navigation" : "Navegación principal" });
    expect(nav).toHaveClass("site-nav");
  });
});
