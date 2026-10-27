import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getBeliefs } from "@/data/beliefs";
import { LOCALES } from "@/i18n/config";
import { Beliefs } from "./Beliefs";

describe.each(LOCALES)("Beliefs (%s)", (lang) => {
  const { items, intro } = getBeliefs(lang);

  it("renders the section heading and every principle", () => {
    const { container } = render(<Beliefs lang={lang} />);
    expect(container.querySelector("section#beliefs")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(lang === "en" ? "What I believe" : "En qué creo");
    expect(container.querySelector("h2 em")).toHaveTextContent(lang === "en" ? "believe" : "creo");
    for (const b of items) {
      expect(screen.getByRole("heading", { level: 3, name: b.title })).toBeInTheDocument();
      expect(screen.getByText(b.text)).toBeInTheDocument();
    }
  });

  it("opens with the one-line philosophy and its intro", () => {
    render(<Beliefs lang={lang} />);
    expect(screen.getByText(intro.statement)).toBeInTheDocument();
    expect(screen.getByText(intro.text)).toBeInTheDocument();
  });

  it("numbers the five convictions in order", () => {
    render(<Beliefs lang={lang} />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(5);
    expect(listItems[0]).toHaveTextContent("01");
    expect(listItems[4]).toHaveTextContent("05");
  });

  it("shows only the titles at first, with each detail behind a closed disclosure", () => {
    const { container } = render(<Beliefs lang={lang} />);
    const disclosures = container.querySelectorAll("details");
    expect(disclosures).toHaveLength(5);
    for (const [i, d] of disclosures.entries()) {
      expect(d.open).toBe(false);
      expect(d.querySelector("summary h3")).toHaveTextContent(items[i].title);
      expect(d.querySelector("summary")).not.toHaveTextContent(items[i].text);
    }
  });

  it("opens one detail at a time", () => {
    const { container } = render(<Beliefs lang={lang} />);
    const names = new Set([...container.querySelectorAll("details")].map((d) => d.getAttribute("name")));
    expect(names.size).toBe(1);
    expect(names.has(null)).toBe(false);
  });

  it("closes with a soft CTA to the contact section", () => {
    render(<Beliefs lang={lang} />);
    const { closing } = getBeliefs(lang);
    expect(screen.getByText(closing.lead)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(closing.cta.label) })).toHaveAttribute("href", "#contact");
  });
});

describe("Beliefs eyebrow", () => {
  it("is translated", () => {
    render(<Beliefs lang="es" />);
    expect(screen.getByText("PRINCIPIOS")).toBeInTheDocument();
  });
});
