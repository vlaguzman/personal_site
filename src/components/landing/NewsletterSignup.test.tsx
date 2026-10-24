import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NewsletterSignup } from "./NewsletterSignup";

describe("NewsletterSignup", () => {
  it("falls back to an honest mailto CTA when no endpoint is configured", () => {
    render(<NewsletterSignup endpoint={null} email="me@example.com" />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /Email me/ });
    expect(cta.getAttribute("href")).toMatch(/^mailto:me@example\.com\?subject=/);
    expect(screen.getByText(/no mailing list yet/i)).toBeInTheDocument();
  });

  it("renders a real form posting to the configured endpoint", () => {
    const { container } = render(<NewsletterSignup endpoint="https://example.com/subscribe" email="me@example.com" />);
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("action", "https://example.com/subscribe");
    expect(form).toHaveAttribute("method", "post");
    expect(screen.getByLabelText("Email address")).toBeRequired();
    expect(screen.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Email me/ })).not.toBeInTheDocument();
  });
});
