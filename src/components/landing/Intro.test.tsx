import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Intro } from "./Intro";

describe("Intro", () => {
  it("is a labelled section so assistive tech can jump to it", () => {
    render(<Intro />);
    expect(screen.getByRole("region", { name: /I’ve built businesses/ })).toBeInTheDocument();
  });

  it("leads with the statement as a heading", () => {
    render(<Intro />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "I’ve built businesses, led technology teams, experienced failure and started again.",
    );
  });

  it("follows with the supporting story", () => {
    render(<Intro />);
    expect(screen.getByText(/restaurant in Colombia to building a Y Combinator-backed company/)).toBeInTheDocument();
  });
});
