import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Purpose } from "./Purpose";

describe("Purpose", () => {
  it("renders the purpose statement", () => {
    render(<Purpose />);
    expect(screen.getByText(/My purpose is to help entrepreneurs/)).toHaveTextContent("make a living from their passion.");
    expect(screen.getByText("TECHNOLOGY + EDUCATION + PRACTICAL SUPPORT")).toBeInTheDocument();
  });
});
