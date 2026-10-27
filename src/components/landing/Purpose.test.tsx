import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Purpose } from "./Purpose";

describe("Purpose", () => {
  it("renders the purpose statement", () => {
    render(<Purpose lang="en" />);
    expect(screen.getByText(/My purpose is to help entrepreneurs/)).toHaveTextContent("make a living from their passion.");
    expect(screen.getByText("TECHNOLOGY + EDUCATION + PRACTICAL SUPPORT")).toBeInTheDocument();
  });

  it("wraps the whole quote in curly quotation marks", () => {
    render(<Purpose lang="en" />);
    expect(screen.getByText(/My purpose is to help entrepreneurs/)).toHaveTextContent(
      "“My purpose is to help entrepreneurs make a living from their passion.”",
    );
  });
});

describe("Purpose with the Spanish locale", () => {
  it("renders the purpose statement in Spanish", () => {
    const { container } = render(<Purpose lang="es" />);
    expect(screen.getByText(/Mi propósito es ayudar a los emprendedores/)).toHaveTextContent(
      "“Mi propósito es ayudar a los emprendedores a vivir de su pasión.”",
    );
    expect(container.querySelector("em")).toHaveTextContent("vivir de su pasión.");
    expect(screen.getByText("LO QUE LO CONECTA TODO")).toBeInTheDocument();
    expect(screen.getByText("TECNOLOGÍA + EDUCACIÓN + APOYO PRÁCTICO")).toBeInTheDocument();
    expect(screen.getByText("Vladimir Guzmán")).toBeInTheDocument();
  });
});
