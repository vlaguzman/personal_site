import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAV_LINKS } from "@/data/site";
import { Header } from "./Header";

describe("Header", () => {
  it("links the wordmark to the top of the page", () => {
    render(<Header />);
    const home = screen.getByRole("link", { name: /Vladimir Guzmán/ });
    expect(home).toHaveAttribute("href", "#home");
    expect(home).toHaveTextContent("ENTREPRENEUR & BUILDER");
  });

  it("renders every nav link pointing at its section", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav.querySelectorAll("a")).toHaveLength(NAV_LINKS.length);
    for (const { href, label } of NAV_LINKS) {
      expect(screen.getByRole("link", { name: new RegExp(label) })).toHaveAttribute("href", href);
    }
  });

  it("marks the connect arrow as decorative", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /Let’s connect/ });
    expect(link.querySelector("[aria-hidden='true']")).toHaveTextContent("↗");
  });

  it("links to the essays hub with a plain route", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Essays" })).toHaveAttribute("href", "/essays");
  });

  describe("on a sub-page", () => {
    it("sends home anchors back to the home page", () => {
      render(<Header currentPath="/essays" />);
      expect(screen.getByRole("link", { name: /Vladimir Guzmán/ })).toHaveAttribute("href", "/#home");
      expect(screen.getByRole("link", { name: /Let’s connect/ })).toHaveAttribute("href", "/#contact");
      expect(screen.getByRole("link", { name: /The journey/ })).toHaveAttribute("href", "/journey");
      expect(screen.getByRole("link", { name: "Essays" })).toHaveAttribute("href", "/essays");
    });

    it("marks the journey page as current when on it", () => {
      render(<Header currentPath="/journey" />);
      expect(screen.getByRole("link", { name: /The journey/ })).toHaveAttribute("aria-current", "page");
      expect(screen.getByRole("link", { name: "Now" })).not.toHaveAttribute("aria-current");
      expect(screen.getByRole("link", { name: "Now" })).toHaveAttribute("href", "/journey#now");
    });

    it("marks the current section with aria-current", () => {
      render(<Header currentPath="/essays" />);
      expect(screen.getByRole("link", { name: "Essays" })).toHaveAttribute("aria-current", "page");
      expect(screen.getByRole("link", { name: /Let’s connect/ })).not.toHaveAttribute("aria-current");
    });
  });
});
