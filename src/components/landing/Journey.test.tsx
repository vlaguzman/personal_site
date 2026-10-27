import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { milestones } from "@/data/milestones";
import { Journey } from "./Journey";

describe("Journey", () => {
  it("is the page's main heading and anchor", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("section#journey")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Different ventures.One purpose.");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("titles every milestone with an h2, never skipping a heading level", () => {
    const { container } = render(<Journey />);
    expect(container.querySelectorAll("article.milestone > .story > h2")).toHaveLength(milestones.length);
    const levels = [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));
    expect(levels[0]).toBe(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level, `heading #${i} jumps from h${levels[i - 1]} to h${level}`).toBeLessThanOrEqual(levels[i - 1] + 1);
    });
  });

  it("renders every milestone as an article with its id and eyebrow", () => {
    const { container } = render(<Journey />);
    const articles = container.querySelectorAll("article.milestone");
    expect(articles).toHaveLength(milestones.length);
    for (const m of milestones) {
      const el = container.querySelector(`article#${m.id}`);
      expect(el).not.toBeNull();
      expect(el).toHaveTextContent(m.eyebrow);
      expect(el).toHaveTextContent(m.period);
    }
  });

  it("lists milestones from latest to earliest", () => {
    const { container } = render(<Journey />);
    const ids = [...container.querySelectorAll("article.milestone")].map((el) => el.id);
    expect(ids).toEqual(milestones.map((m) => m.id).reverse());
    expect(ids[0]).toBe("now");
    expect(ids.at(-1)).toBe("year2010");
  });

  it("places each blog post under its venture", () => {
    const { container } = render(<Journey />);
    const titles = (id: string) =>
      [...container.querySelectorAll(`#${id} a.blog-post`)].map((el) => el.textContent);
    expect(titles("year2010")).toEqual([expect.stringContaining("12 cosas que aprendí de la quiebra de un restaurante")]);
    expect(titles("year2011")).toEqual([expect.stringContaining("Ser emprendedor, una difícil pero excelente decisión")]);
    expect(titles("year2017")).toEqual([
      expect.stringContaining("7 puntos claves a la hora de montar un negocio de caja suscripción"),
      expect.stringContaining("¿Y ahora te dedicas a vender cerveza?"),
    ]);
    expect(titles("year2014-fluvip")).toEqual([expect.stringContaining("Gracias FLUVIP")]);
  });

  it("links each blog post to its in-site essay instead of inlining the body", () => {
    const { container } = render(<Journey />);
    const post = container.querySelector("#year2010 a.blog-post")!;
    expect(post).toHaveAttribute("href", "/essays/lecciones-quiebra-restaurante");
    expect(post).toHaveAttribute("lang", "es");
    expect(container.querySelectorAll("details.blog-post")).toHaveLength(0);
    const hrefs = [...container.querySelectorAll("a.blog-post")].map((a) => a.getAttribute("href"));
    expect(hrefs).toHaveLength(5);
    hrefs.forEach((h) => expect(h).toMatch(/^\/essays\/[a-z-]+$/));
  });

  it("keeps the blog posts as the last block of the milestone story", () => {
    const { container } = render(<Journey />);
    const story = container.querySelector("#year2014-fluvip .story")!;
    expect(story.lastElementChild).toHaveClass("blog-posts");
  });

  it("renders a photo gallery under the right milestones", () => {
    const { container } = render(<Journey />);
    const count = (id: string) => container.querySelectorAll(`#${id} .gallery img`).length;
    expect(count("year2010")).toBe(0);
    expect(count("year2014-fluvip")).toBe(1);
    expect(count("year2017")).toBe(9);
    expect(count("year2019")).toBe(1);
    expect(count("year2022")).toBe(1);
    expect(count("year2023-community")).toBe(4);
    for (const img of container.querySelectorAll(".gallery img")) {
      expect(img.getAttribute("alt"), img.getAttribute("src")!).toBeTruthy();
      expect(img).toHaveAttribute("loading", "lazy");
      expect(img.getAttribute("src")).toMatch(/^\/images\/journey\//);
    }
  });

  it("shows a lone photo uncropped instead of as a grid cell", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("#year2022 .gallery")).toHaveClass("single");
    expect(container.querySelector("#year2017 .gallery")).not.toHaveClass("single");
  });

  it("shows the gallery before the blog posts", () => {
    const { container } = render(<Journey />);
    const story = container.querySelector("#year2017 .story")!;
    const kids = [...story.children];
    const gallery = kids.findIndex((el) => el.classList.contains("gallery"));
    expect(gallery).toBeGreaterThan(-1);
    expect(gallery).toBeLessThan(kids.findIndex((el) => el.classList.contains("blog-posts")));
    expect(story.lastElementChild).toHaveClass("blog-posts");
  });

  it("marks only the Now milestone as current", () => {
    const { container } = render(<Journey />);
    const current = container.querySelectorAll("article.current");
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("id", "now");
    expect(current[0].querySelector(".year i")).not.toBeNull();
  });

  it("renders the Dfounders venture tree linking to its ventures", () => {
    const { container } = render(<Journey />);
    const tree = screen.getByLabelText("Ventures that emerged from Dfounders");
    expect(container.querySelector("#year2016")).toHaveClass("company-builder");
    expect(tree.querySelector("a[href='#year2017']")).toHaveTextContent("Beer Happy Club");
    expect(tree.querySelector("a[href='#year2019']")).toHaveTextContent("HoyTrabajas");
    expect(tree).toHaveTextContent("Other initiatives");
  });

  it("renders origin links first inside the story", () => {
    const { container } = render(<Journey />);
    const story = container.querySelector("#year2017 .story")!;
    expect(story.firstElementChild).toHaveClass("venture-origin");
    expect(story.firstElementChild).toHaveAttribute("href", "#year2016");
  });

  it("renders facts, details, roles, YC badge and the Gingga button", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("#year2014-fluvip .fact")).toHaveTextContent("4people in the team at the beginning20developers led");
    expect(container.querySelector("#year2014-fluvip details summary")).toHaveTextContent("Building for international growth +");
    expect(container.querySelectorAll("#year2023-community .role-history > div")).toHaveLength(2);
    expect(container.querySelector("#year2022 .yc")).toHaveTextContent("Y Combinator");
    const button = screen.getByRole("link", { name: /Explore Gingga/ });
    expect(button).toHaveAttribute("href", "https://gingga.com/");
    expect(button).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("embeds the Consulate documentary from privacy-friendly YouTube", () => {
    const { container } = render(<Journey />);
    const frame = container.querySelector("#year2023-community iframe.video-embed");
    expect(frame).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/mp1-CpcOQUE");
    expect(frame).toHaveAttribute("title", expect.stringMatching(/documentary/i));
    expect(frame).toHaveAttribute("loading", "lazy");
    expect(screen.getByRole("link", { name: /Watch on YouTube/ })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=mp1-CpcOQUE",
    );
  });

  it("uses the smaller year style for ranges", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("#year2012 .year")).toHaveClass("words");
    expect(container.querySelector("#year2010 .year")).not.toHaveClass("words");
  });

  it("introduces the narrative arc from developer to AI builder, in order", () => {
    render(<Journey />);
    const arc = screen.getByRole("list", { name: "The arc of the journey" });
    const labels = [...arc.querySelectorAll("li strong")].map((el) => el.textContent);
    expect(labels).toEqual(["Developer", "Product", "Founder", "AI builder"]);
  });

  it("renders the learned callout only for milestones that define it, before gallery and posts", () => {
    const { container } = render(<Journey />);
    const callouts = container.querySelectorAll("aside.learned");
    expect(callouts).toHaveLength(milestones.filter((m) => m.learned).length);
    for (const m of milestones) {
      const el = container.querySelector(`#${m.id} aside.learned`);
      if (!m.learned) {
        expect(el, m.id).toBeNull();
        continue;
      }
      expect(el).toHaveTextContent("What I learned");
      expect(el).toHaveTextContent(m.learned);
    }
    const story = container.querySelector("#year2017 .story")!;
    const kids = [...story.children];
    const learned = kids.findIndex((el) => el.classList.contains("learned"));
    expect(learned).toBeGreaterThan(-1);
    expect(learned).toBeLessThan(kids.findIndex((el) => el.classList.contains("gallery")));
  });

  it("wraps gallery photos in buttons that open the lightbox", () => {
    const { container } = render(<Journey />);
    expect(container.querySelectorAll(".gallery img")).toHaveLength(16);
    expect(container.querySelectorAll(".gallery button img")).toHaveLength(16);
    expect(container.querySelectorAll(".gallery a")).toHaveLength(0);
  });

  it("gives the Now milestone a labelled marker for the accent treatment", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("#now .year i")).toHaveAttribute("aria-hidden", "true");
  });
});
