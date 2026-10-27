import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageSwitcher } from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renders its own labelled navigation with two links", () => {
    render(<LanguageSwitcher lang="en" path="/journey" />);
    const nav = screen.getByRole("navigation", { name: "Language" });
    expect(nav.querySelectorAll("a")).toHaveLength(2);
  });

  it("shows short visible labels with the language name as accessible name", () => {
    render(<LanguageSwitcher lang="en" path="/" />);
    expect(screen.getByRole("link", { name: "English" })).toHaveTextContent("EN");
    expect(screen.getByRole("link", { name: "Español" })).toHaveTextContent("ES");
  });

  it("keeps the equivalent page when switching language", () => {
    render(<LanguageSwitcher lang="en" path="/journey" />);
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/journey");
    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es/journey");
  });

  it("keeps an essay when switching language", () => {
    render(<LanguageSwitcher lang="es" path="/essays/some-slug" />);
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/essays/some-slug");
    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es/essays/some-slug");
  });

  it("links to the locale home from the home page", () => {
    render(<LanguageSwitcher lang="en" path="/" />);
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es");
  });

  it("marks only the active language with aria-current", () => {
    render(<LanguageSwitcher lang="es" path="/" />);
    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "English" })).not.toHaveAttribute("aria-current");
  });

  it("declares the language of each link", () => {
    render(<LanguageSwitcher lang="en" path="/" />);
    const en = screen.getByRole("link", { name: "English" });
    const es = screen.getByRole("link", { name: "Español" });
    expect(en).toHaveAttribute("lang", "en");
    expect(en).toHaveAttribute("hreflang", "en");
    expect(es).toHaveAttribute("lang", "es");
    expect(es).toHaveAttribute("hreflang", "es");
  });

  it("translates the navigation label but keeps each language name in its own language", () => {
    render(<LanguageSwitcher lang="es" path="/" />);
    expect(screen.getByRole("navigation", { name: "Idioma" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "English" })).toHaveTextContent("EN");
    expect(screen.getByRole("link", { name: "Español" })).toHaveTextContent("ES");
  });
});
