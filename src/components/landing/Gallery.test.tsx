import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Gallery } from "./Gallery";

const images = [
  { src: "/images/journey/a.jpg", alt: "First photo" },
  { src: "/images/journey/b.jpg", alt: "Second photo" },
  { src: "/images/journey/c.jpg", alt: "Third photo" },
];

const open = (name: string) => fireEvent.click(screen.getByRole("button", { name }));

describe("Gallery", () => {
  it("renders every image inside a button, lazily loaded, as a bento grid", () => {
    const { container } = render(<Gallery lang="en" images={images} />);
    expect(container.querySelector(".gallery")).not.toHaveClass("single");
    const imgs = container.querySelectorAll(".gallery img");
    expect(imgs).toHaveLength(3);
    for (const img of imgs) {
      expect(img).toHaveAttribute("loading", "lazy");
      expect(img.closest("button")).not.toBeNull();
    }
    expect(container.querySelectorAll(".gallery-item")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "First photo" })).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("marks a lone image as single", () => {
    const { container } = render(<Gallery lang="en" images={[images[0]]} />);
    expect(container.querySelector(".gallery")).toHaveClass("single");
  });

  it("opens an accessible modal lightbox and moves focus into it", () => {
    render(<Gallery lang="en" images={images} />);
    open("Second photo");
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog.querySelector("img")).toHaveAttribute("src", "/images/journey/b.jpg");
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Close photo viewer" }));
  });

  it("closes on Escape and returns focus to the trigger", () => {
    render(<Gallery lang="en" images={images} />);
    const trigger = screen.getByRole("button", { name: "Third photo" });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("closes with the close button and when clicking the backdrop", () => {
    render(<Gallery lang="en" images={images} />);
    open("First photo");
    fireEvent.click(screen.getByRole("button", { name: "Close photo viewer" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    open("First photo");
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("traps Tab inside the dialog", () => {
    render(<Gallery lang="en" images={images} />);
    open("First photo");
    const dialog = screen.getByRole("dialog");
    const focusable = dialog.querySelectorAll<HTMLElement>("button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(first);
    first.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it("navigates with the arrow keys and wraps around", () => {
    render(<Gallery lang="en" images={images} />);
    open("First photo");
    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(screen.getByRole("dialog").querySelector("img")).toHaveAttribute("src", "/images/journey/b.jpg");
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(screen.getByRole("dialog").querySelector("img")).toHaveAttribute("src", "/images/journey/c.jpg");
  });

  it("locks page scroll while open and restores it on close", () => {
    render(<Gallery lang="en" images={images} />);
    open("First photo");
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).toBe("");
  });

  it("labels the viewer and its controls in Spanish", () => {
    render(<Gallery lang="es" images={images} />);
    open("First photo");
    expect(screen.getByRole("dialog", { name: "Visor de fotos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cerrar visor de fotos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Foto anterior" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Foto siguiente" })).toBeInTheDocument();
  });

  it("hides navigation buttons for a single image", () => {
    render(<Gallery lang="en" images={[images[0]]} />);
    open("First photo");
    expect(screen.queryByRole("button", { name: "Next photo" })).toBeNull();
  });
});
