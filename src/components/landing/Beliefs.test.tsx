import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BELIEFS, BELIEFS_INTRO } from "@/data/beliefs";
import { Beliefs } from "./Beliefs";

describe("Beliefs", () => {
  it("renders the section heading and every principle", () => {
    const { container } = render(<Beliefs />);
    expect(container.querySelector("section#beliefs")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("What I believe");
    for (const b of BELIEFS) {
      expect(screen.getByRole("heading", { level: 3, name: b.title })).toBeInTheDocument();
      expect(screen.getByText(b.text)).toBeInTheDocument();
    }
  });

  it("opens with the one-line philosophy and its intro", () => {
    render(<Beliefs />);
    expect(screen.getByText(BELIEFS_INTRO.statement)).toBeInTheDocument();
    expect(screen.getByText(BELIEFS_INTRO.text)).toBeInTheDocument();
  });

  it("numbers the five convictions in order", () => {
    render(<Beliefs />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent("01");
    expect(items[4]).toHaveTextContent("05");
  });

  it("shows only the titles at first, with each detail behind a closed disclosure", () => {
    const { container } = render(<Beliefs />);
    const disclosures = container.querySelectorAll("details");
    expect(disclosures).toHaveLength(5);
    for (const [i, d] of disclosures.entries()) {
      expect(d.open).toBe(false);
      expect(d.querySelector("summary h3")).toHaveTextContent(BELIEFS[i].title);
      expect(d.querySelector("summary")).not.toHaveTextContent(BELIEFS[i].text);
    }
  });

  it("opens one detail at a time", () => {
    const { container } = render(<Beliefs />);
    const names = new Set([...container.querySelectorAll("details")].map((d) => d.getAttribute("name")));
    expect(names.size).toBe(1);
    expect(names.has(null)).toBe(false);
  });

  it("closes with a soft CTA to the contact section", () => {
    render(<Beliefs />);
    expect(screen.getByText(/If this resonates/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /let.s talk/i })).toHaveAttribute("href", "#contact");
  });
});
