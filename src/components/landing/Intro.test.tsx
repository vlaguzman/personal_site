import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Intro } from "./Intro";

describe("Intro", () => {
  it("is a labelled section so assistive tech can jump to it", () => {
    render(<Intro lang="en" />);
    expect(screen.getByRole("region", { name: /I’ve built businesses/ })).toBeInTheDocument();
  });

  it("leads with the statement as a heading", () => {
    render(<Intro lang="en" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "I’ve built businesses, led technology teams, experienced failure and started again.",
    );
  });

  it("follows with the supporting story", () => {
    render(<Intro lang="en" />);
    expect(screen.getByText(/restaurant in Colombia to building a Y Combinator-backed company/)).toBeInTheDocument();
  });
});

describe("Intro with the Spanish locale", () => {
  it("is a labelled section named after the Spanish statement", () => {
    render(<Intro lang="es" />);
    expect(screen.getByRole("region", { name: /He creado empresas/ })).toBeInTheDocument();
    expect(screen.getByText("DE DÓNDE VIENE ESTO")).toBeInTheDocument();
  });

  it("leads with the statement and follows with the supporting story in Spanish", () => {
    render(<Intro lang="es" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "He creado empresas, liderado equipos de tecnología, fracasado y vuelto a empezar.",
    );
    expect(screen.getByText(/abrir un restaurante en Colombia hasta construir una startup que llegó a Y Combinator/)).toBeInTheDocument();
  });
});
