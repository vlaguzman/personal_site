import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the builder headline and the home anchor", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("section#home")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Builder.Founder.YC alumnus.");
  });

  it("introduces him by his former CTO roles", () => {
    render(<Hero />);
    expect(screen.getByText(/Former CTO at HoyTrabajas\.com \(YC W22\) & FLUVIP/)).toBeInTheDocument();
  });

  it("shows the Cambridge talk photo with a meaningful alt text", () => {
    render(<Hero />);
    const img = screen.getByRole("img", { name: "Vladimir Guzmán presenting at Clare Hall, Cambridge" });
    expect(img.getAttribute("src")).toContain("hero-cambridge-talk.jpg");
  });

  it("has a primary CTA to the essays hub and a secondary CTA to contact", () => {
    render(<Hero />);
    const primary = screen.getByRole("link", { name: /Read my essays/ });
    expect(primary).toHaveAttribute("href", "/essays");
    expect(primary).toHaveClass("cta-primary");
    const secondary = screen.getByRole("link", { name: /Work with me/ });
    expect(secondary).toHaveAttribute("href", "#contact");
    expect(secondary).toHaveClass("cta-secondary");
  });

  it("does not use consultant language", () => {
    const { container } = render(<Hero />);
    expect(container.textContent).not.toMatch(/consultant|expert/i);
  });
});
