import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TALK } from "@/data/site";
import { Talks } from "./Talks";

describe("Talks", () => {
  it("links the cover and view button to the slides PDF", () => {
    render(<Talks />);
    expect(screen.getByRole("link", { name: "Open the Cambridge talk slides as a PDF" })).toHaveAttribute("href", TALK.pdf);
    expect(screen.getByRole("link", { name: /View slides/ })).toHaveAttribute("href", TALK.pdf);
  });

  it("offers the PDF as a download", () => {
    render(<Talks />);
    const link = screen.getByRole("link", { name: /Download PDF/ });
    expect(link).toHaveAttribute("download", TALK.pdfName);
  });

  it("renders the cover image, themes and quote", () => {
    render(<Talks />);
    expect(screen.getByAltText(TALK.coverAlt)).toHaveAttribute("src", TALK.cover);
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual([...TALK.themes]);
    expect(screen.getByText(/The tragedy is not that the world lacks talent/)).toBeInTheDocument();
  });
});
