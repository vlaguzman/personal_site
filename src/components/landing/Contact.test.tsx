import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SITE } from "@/data/site";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("renders the mailto link", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: new RegExp(SITE.email) })).toHaveAttribute("href", `mailto:${SITE.email}`);
  });

  it("opens LinkedIn safely in a new tab", () => {
    render(<Contact />);
    const link = screen.getByRole("link", { name: /LinkedIn/ });
    expect(link).toHaveAttribute("href", SITE.linkedin);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("downloads the founder profile", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /Download founder profile/ })).toHaveAttribute("href", "/docs/founder-profile.pdf");
  });
});
