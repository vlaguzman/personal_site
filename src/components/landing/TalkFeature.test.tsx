import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TALK } from "@/data/site";
import { TalkFeature } from "./TalkFeature";

describe("TalkFeature", () => {
  it("links the cover and view button to the slides PDF", () => {
    render(<TalkFeature />);
    expect(screen.getByRole("link", { name: "Open the Cambridge talk slides as a PDF" })).toHaveAttribute("href", TALK.pdf);
    expect(screen.getByRole("link", { name: /View slides/ })).toHaveAttribute("href", TALK.pdf);
  });

  it("offers the PDF as a download", () => {
    render(<TalkFeature />);
    const link = screen.getByRole("link", { name: /Download PDF/ });
    expect(link).toHaveAttribute("download", TALK.pdfName);
  });

  it("renders the cover image and themes", () => {
    render(<TalkFeature />);
    expect(screen.getByAltText(TALK.coverAlt)).toHaveAttribute("src", TALK.cover);
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual([...TALK.themes]);
  });

  it("can carry an anchor id so pages can link to it", () => {
    const { container } = render(<TalkFeature id="cambridge" />);
    expect(container.querySelector("article#cambridge")).not.toBeNull();
  });
});
