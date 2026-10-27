import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

const params = (lang: string) => ({ params: Promise.resolve({ lang }) });

describe("Home page", () => {
  it("keeps the full timeline off the home page; it lives at /journey", async () => {
    const { container } = render(await Home(params("en")));
    expect(container.querySelector("section#journey")).toBeNull();
    expect(container.querySelectorAll("article.milestone")).toHaveLength(0);
  });

  it("keeps the Cambridge talk off the home page; it lives at /speaking", async () => {
    const { container } = render(await Home(params("en")));
    expect(container.querySelector(".talk-feature")).toBeNull();
  });

  it("orders the sections so the dark ones never touch", async () => {
    const { container } = render(await Home(params("en")));
    const order = [...container.querySelectorAll("main > *")].map((el) => el.id || el.className.split(" ")[0]);
    expect(order).toEqual(["home", "intro", "experience", "ideas", "beliefs", "purpose", "conversations", "contact"]);
  });

  it("renders the same sections for the Spanish locale", async () => {
    const { container } = render(await Home(params("es")));
    const order = [...container.querySelectorAll("main > *")].map((el) => el.id || el.className.split(" ")[0]);
    expect(order).toEqual(["home", "intro", "experience", "ideas", "beliefs", "purpose", "conversations", "contact"]);
  });

  it("answers 404 for an unsupported locale", async () => {
    await expect(Home(params("fr"))).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404|NEXT_NOT_FOUND/);
  });
});
