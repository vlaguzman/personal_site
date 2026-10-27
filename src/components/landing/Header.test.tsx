import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAV_LINKS } from "@/data/site";
import { Header } from "./Header";

describe("Header", () => {
  it("links the wordmark to the top of the page", () => {
    render(<Header lang="en" />);
    const home = screen.getByRole("link", { name: /Vladimir Guzmán/ });
    expect(home).toHaveAttribute("href", "#home");
    expect(home).toHaveTextContent("ENTREPRENEUR & BUILDER");
  });

  it("renders every nav link pointing at its section", () => {
    render(<Header lang="en" />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav.querySelectorAll("a")).toHaveLength(NAV_LINKS.length);
    for (const { href, label } of NAV_LINKS) {
      const expected = href.startsWith("#") ? href : `/en${href}`;
      expect(screen.getByRole("link", { name: new RegExp(label) })).toHaveAttribute("href", expected);
    }
  });

  it("marks the connect arrow as decorative", () => {
    render(<Header lang="en" />);
    const link = screen.getByRole("link", { name: /Let’s connect/ });
    expect(link.querySelector("[aria-hidden='true']")).toHaveTextContent("↗");
  });

  it("prefixes every route link with the active locale", () => {
    render(<Header lang="es" />);
    expect(screen.getByRole("link", { name: "Speaking" })).toHaveAttribute("href", "/es/speaking");
    expect(screen.getByRole("link", { name: "Work together" })).toHaveAttribute("href", "/es/work-together");
    expect(screen.getByRole("link", { name: "Essays" })).toHaveAttribute("href", "/es/essays");
    expect(screen.getByRole("link", { name: /The journey/ })).toHaveAttribute("href", "/es/journey");
    expect(screen.getByRole("link", { name: "Now" })).toHaveAttribute("href", "/es/journey#now");
  });

  it("keeps in-page anchors on the home page", () => {
    render(<Header lang="es" />);
    expect(screen.getByRole("link", { name: /Let’s connect/ })).toHaveAttribute("href", "#contact");
  });

  describe("on a sub-page", () => {
    it("sends home anchors back to the locale home page", () => {
      render(<Header lang="en" currentPath="/essays" />);
      expect(screen.getByRole("link", { name: /Vladimir Guzmán/ })).toHaveAttribute("href", "/en#home");
      expect(screen.getByRole("link", { name: /Let’s connect/ })).toHaveAttribute("href", "/en#contact");
      expect(screen.getByRole("link", { name: /The journey/ })).toHaveAttribute("href", "/en/journey");
      expect(screen.getByRole("link", { name: "Essays" })).toHaveAttribute("href", "/en/essays");
    });

    it("keeps the Spanish locale in home anchors", () => {
      render(<Header lang="es" currentPath="/speaking" />);
      expect(screen.getByRole("link", { name: /Vladimir Guzmán/ })).toHaveAttribute("href", "/es#home");
      expect(screen.getByRole("link", { name: /Let’s connect/ })).toHaveAttribute("href", "/es#contact");
    });

    it("marks the journey page as current when on it", () => {
      render(<Header lang="en" currentPath="/journey" />);
      expect(screen.getByRole("link", { name: /The journey/ })).toHaveAttribute("aria-current", "page");
      expect(screen.getByRole("link", { name: "Now" })).not.toHaveAttribute("aria-current");
      expect(screen.getByRole("link", { name: "Now" })).toHaveAttribute("href", "/en/journey#now");
    });

    it("marks the current section with aria-current", () => {
      render(<Header lang="en" currentPath="/essays" />);
      expect(screen.getByRole("link", { name: "Essays" })).toHaveAttribute("aria-current", "page");
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
      render(<Header lang="es" currentPath="/essays" path="/essays/some-slug" />);
      expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/essays/some-slug");
      expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es/essays/some-slug");
      expect(screen.getByRole("link", { name: "Essays" })).toHaveAttribute("aria-current", "page");
    });

    it("flags the active language", () => {
      render(<Header lang="es" />);
      expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("aria-current", "true");
    });
  });
});
