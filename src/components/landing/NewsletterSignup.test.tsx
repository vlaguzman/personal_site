import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NewsletterSignup } from "./NewsletterSignup";

describe("NewsletterSignup", () => {
  it("falls back to an honest mailto CTA when no endpoint is configured", () => {
    render(<NewsletterSignup lang="en" endpoint={null} email="me@example.com" />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /Email me/ });
    expect(cta.getAttribute("href")).toMatch(/^mailto:me@example\.com\?subject=/);
    expect(screen.getByText(/no mailing list yet/i)).toBeInTheDocument();
  });

  it("renders a real form posting to the configured endpoint", () => {
    const { container } = render(
      <NewsletterSignup lang="en" endpoint="https://example.com/subscribe" email="me@example.com" />,
    );
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("action", "https://example.com/subscribe");
    expect(form).toHaveAttribute("method", "post");
    expect(screen.getByLabelText("Email address")).toBeRequired();
    expect(screen.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Email me/ })).not.toBeInTheDocument();
  });
});

describe("NewsletterSignup in Spanish", () => {
  it("falls back to a Spanish mailto CTA with a Spanish subject", () => {
    render(<NewsletterSignup lang="es" endpoint={null} email="me@example.com" />);
    expect(screen.getByRole("heading", { level: 2, name: "Nuevos ensayos, cuando estén listos" })).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /Escríbeme para que te avise/ });
    expect(cta.getAttribute("href")).toBe(
      `mailto:me@example.com?subject=${encodeURIComponent("Avísame de los nuevos ensayos")}`,
    );
    expect(screen.getByText(/Todavía no hay lista de correo/)).toBeInTheDocument();
  });

  it("translates the form", () => {
    render(<NewsletterSignup lang="es" endpoint="https://example.com/subscribe" email="me@example.com" />);
    expect(screen.getByLabelText("Correo electrónico")).toBeRequired();
    expect(screen.getByRole("button", { name: "Suscribirme" })).toBeInTheDocument();
  });
});
