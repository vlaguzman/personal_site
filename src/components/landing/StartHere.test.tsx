import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Essay } from "@/data/types";
import { StartHere } from "./StartHere";

const essay: Essay = {
  slug: "primero",
  title: "Primero lee esto",
  topic: "Startups",
  lang: "es",
  sections: [{ text: "Un párrafo inicial. ".repeat(40).trim() }],
};

describe("StartHere", () => {
  it("highlights the essay with a Start here label, reading time, excerpt and link", () => {
    render(<StartHere essay={essay} />);
    expect(screen.getByText("Start here")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Primero lee esto/ });
    expect(link).toHaveAttribute("href", "/essays/primero");
    expect(screen.getByText("1 min read")).toBeInTheDocument();
    expect(screen.getByText(/Un párrafo inicial\./)).toHaveAttribute("lang", "es");
  });
});
