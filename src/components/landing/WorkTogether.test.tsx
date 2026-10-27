import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SITE } from "@/data/site";
import { WorkTogether } from "./WorkTogether";

describe("WorkTogether", () => {
  it("leads with the page title and a way to start a conversation", () => {
    render(<WorkTogether lang="en" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Independent thinking.Practical experience.");
    const cta = screen.getAllByRole("link", { name: /Book a conversation/ })[0];
    expect(cta).toHaveAttribute("href", SITE.calendly);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(cta).toHaveClass("cta-primary");
  });

  it("lists the three kinds of work", () => {
    render(<WorkTogether lang="en" />);
    const list = screen.getByRole("list", { name: "Ways to work together" });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(within(items[0]).getByRole("heading", { level: 3 })).toHaveTextContent("Strategic advisory");
    expect(within(items[1]).getByRole("heading", { level: 3 })).toHaveTextContent("AI and technology strategy");
  });

  it("sends workshops to the speaking page", () => {
    render(<WorkTogether lang="en" />);
    expect(screen.getByRole("link", { name: /See speaking/ })).toHaveAttribute("href", "/en/speaking");
  });

  it("says engagements are considered individually", () => {
    render(<WorkTogether lang="en" />);
    expect(screen.getByText(/Engagements are considered individually/)).toBeInTheDocument();
  });

  it("keeps Gingga clearly separate and links to its own site", () => {
    render(<WorkTogether lang="en" />);
    expect(screen.getByRole("heading", { level: 2, name: /Gingga/ })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Visit Gingga/ });
    expect(link).toHaveAttribute("href", "https://gingga.com/");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("closes with a second invitation", () => {
    render(<WorkTogether lang="en" />);
    expect(screen.getAllByRole("link", { name: /Book a conversation/ })).toHaveLength(2);
  });

  it("never skips a heading level and keeps ids unique", () => {
    const { container } = render(<WorkTogether lang="en" />);
    const levels = [...container.querySelectorAll("h1, h2, h3, h4")].map((h) => Number(h.tagName[1]));
    expect(levels[0]).toBe(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level, `heading #${i}`).toBeLessThanOrEqual(levels[i - 1] + 1);
    });
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("WorkTogether links", () => {
  it("prefixes the internal links with the active locale", () => {
    render(<WorkTogether lang="es" />);
    expect(screen.getByRole("link", { name: /See speaking/ })).toHaveAttribute("href", "/es/speaking");
    expect(screen.getByRole("link", { name: /See the experience behind it/ })).toHaveAttribute("href", "/es/journey");
  });

  it("leaves the external booking and Gingga links untouched", () => {
    render(<WorkTogether lang="es" />);
    for (const link of screen.getAllByRole("link", { name: /Book a conversation/ })) {
      expect(link).toHaveAttribute("href", SITE.calendly);
    }
  });
});
