import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BELIEFS } from "@/data/beliefs";
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

  it("closes with a soft CTA to the contact section", () => {
    render(<Beliefs />);
    expect(screen.getByText(/If this resonates/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /let.s talk/i })).toHaveAttribute("href", "#contact");
  });
});
