import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FOUNDER_PROFILE_PDF, SITE, TALK } from "@/data/site";
import { Speaking } from "./Speaking";

describe("Speaking", () => {
  it("leads with the page title and an invitation to speak", () => {
    render(<Speaking />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Challenge assumptions.Start better conversations.");
    const cta = screen.getAllByRole("link", { name: /Invite me to speak/ })[0];
    expect(cta).toHaveAttribute("href", SITE.calendly);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(cta).toHaveClass("cta-primary");
  });

  it("opens with a real photo of him speaking", () => {
    render(<Speaking />);
    const photo = screen.getByRole("img", { name: "Vladimir Guzmán presenting at Clare Hall, Cambridge" });
    expect(photo.getAttribute("src")).toContain("hero-cambridge-talk.jpg");
  });

  it("lists the three speaking topics", () => {
    render(<Speaking />);
    const list = screen.getByRole("list", { name: "Speaking topics" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
    expect(within(list).getByRole("heading", { level: 3, name: "Technology beyond the hype" })).toBeInTheDocument();
  });

  it("features the Cambridge talk with its slides", () => {
    const { container } = render(<Speaking />);
    expect(container.querySelector("#cambridge")).not.toBeNull();
    expect(screen.getByRole("link", { name: /View slides/ })).toHaveAttribute("href", TALK.pdf);
    expect(screen.getByAltText(TALK.coverAlt)).toBeInTheDocument();
  });

  it("documents the Consulate programmes with the video, the photos and the figures", () => {
    const { container } = render(<Speaking />);
    expect(screen.getByTitle(/Documentary of the first Entrepreneurship programme/)).toHaveAttribute(
      "src",
      expect.stringContaining("mp1-CpcOQUE"),
    );
    expect(container.querySelectorAll(".gallery-item")).toHaveLength(4);
    expect(screen.getByText("270+")).toBeInTheDocument();
  });

  it("offers a short bio and the founder profile to download", () => {
    render(<Speaking />);
    expect(screen.getByRole("heading", { level: 2, name: /About/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download founder profile/ })).toHaveAttribute("href", FOUNDER_PROFILE_PDF);
  });

  it("closes with a second invitation", () => {
    render(<Speaking />);
    expect(screen.getAllByRole("link", { name: /Invite me to speak/ })).toHaveLength(2);
  });

  it("never skips a heading level and keeps ids unique", () => {
    const { container } = render(<Speaking />);
    const levels = [...container.querySelectorAll("h1, h2, h3, h4")].map((h) => Number(h.tagName[1]));
    expect(levels[0]).toBe(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level, `heading #${i}`).toBeLessThanOrEqual(levels[i - 1] + 1);
    });
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
