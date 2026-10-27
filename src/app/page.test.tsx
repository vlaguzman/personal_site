import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("keeps the full timeline off the home page; it lives at /journey", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("section#journey")).toBeNull();
    expect(container.querySelectorAll("article.milestone")).toHaveLength(0);
  });

  it("orders the sections so the dark ones never touch", () => {
    const { container } = render(<Home />);
    const order = [...container.querySelectorAll("main > *")].map((el) => el.id || el.className.split(" ")[0]);
    expect(order).toEqual(["home", "intro", "ideas", "experience", "beliefs", "purpose", "talks", "contact"]);
  });
});
