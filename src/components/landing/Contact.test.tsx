import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SITE } from "@/data/site";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("links to the Calendly booking page in a new tab instead of email", () => {
    render(<Contact />);
    const link = screen.getByRole("link", { name: /Book a conversation/ });
    expect(link).toHaveAttribute("href", SITE.calendly);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByRole("link", { name: new RegExp(SITE.email) })).not.toBeInTheDocument();
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
