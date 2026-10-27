import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getMilestones, milestones } from "@/data/milestones";
import {
  beingAnEntrepreneurEn,
  fluvipThanksEn,
  funkyLessonsEn,
  sellingBeerEn,
  subscriptionBoxPointsEn,
} from "@/data/posts-en";
import { Journey } from "./Journey";
import { Milestone } from "./Milestone";

describe("Journey", () => {
  it("is the page's main heading and anchor", () => {
    const { container } = render(<Journey lang="en" />);
    expect(container.querySelector("section#journey")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Different ventures.One purpose.");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("titles every milestone with an h2, never skipping a heading level", () => {
    const { container } = render(<Journey lang="en" />);
    expect(container.querySelectorAll("article.milestone > .story > h2")).toHaveLength(milestones.length);
    const levels = [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));
    expect(levels[0]).toBe(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level, `heading #${i} jumps from h${levels[i - 1]} to h${level}`).toBeLessThanOrEqual(levels[i - 1] + 1);
    });
  });

  it("renders every milestone as an article with its id and eyebrow", () => {
    const { container } = render(<Journey lang="en" />);
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
    const { container } = render(<Journey lang="en" />);
    const ids = [...container.querySelectorAll("article.milestone")].map((el) => el.id);
    expect(ids).toEqual(milestones.map((m) => m.id).reverse());
    expect(ids[0]).toBe("now");
    expect(ids.at(-1)).toBe("year2010");
  });

  it("places each blog post under its venture", () => {
    const { container } = render(<Journey lang="en" />);
    const titles = (id: string) =>
      [...container.querySelectorAll(`#${id} a.blog-post`)].map((el) => el.textContent);
    expect(titles("year2010")).toEqual([expect.stringContaining(funkyLessonsEn.title)]);
    expect(titles("year2011")).toEqual([expect.stringContaining(beingAnEntrepreneurEn.title)]);
    expect(titles("year2017")).toEqual([
      expect.stringContaining(subscriptionBoxPointsEn.title),
      expect.stringContaining(sellingBeerEn.title),
    ]);
    expect(titles("year2014-fluvip")).toEqual([expect.stringContaining(fluvipThanksEn.title)]);
  });

  it("shows the translated English titles, marked as translated with AI", () => {
    const { container } = render(<Journey lang="en" />);
    const post = container.querySelector("#year2010 a.blog-post")!;
    expect(post).toHaveAttribute("lang", "en");
    expect(post.textContent).not.toContain("12 cosas que aprendí");
    expect(container.querySelector("#year2010 .blog-posts .eyebrow")).toHaveTextContent("FROM MY BLOG · TRANSLATED WITH AI");
  });

  it("links each blog post to its in-site essay instead of inlining the body", () => {
    const { container } = render(<Journey lang="en" />);
    const post = container.querySelector("#year2010 a.blog-post")!;
    expect(post).toHaveAttribute("href", "/en/essays/lecciones-quiebra-restaurante");
    expect(post).toHaveAttribute("lang", "en");
    expect(container.querySelectorAll("details.blog-post")).toHaveLength(0);
    const hrefs = [...container.querySelectorAll("a.blog-post")].map((a) => a.getAttribute("href"));
    expect(hrefs).toHaveLength(5);
    hrefs.forEach((h) => expect(h).toMatch(/^\/en\/essays\/[a-z-]+$/));
  });

  it("keeps the blog posts as the last block of the milestone story", () => {
    const { container } = render(<Journey lang="en" />);
    const story = container.querySelector("#year2014-fluvip .story")!;
    expect(story.lastElementChild).toHaveClass("blog-posts");
  });

  it("renders a photo gallery under the right milestones", () => {
    const { container } = render(<Journey lang="en" />);
    const count = (id: string) => container.querySelectorAll(`#${id} .gallery img`).length;
    expect(count("year2010")).toBe(0);
    expect(count("year2014-fluvip")).toBe(1);
    expect(count("year2017")).toBe(9);
    expect(count("year2019")).toBe(1);
    expect(count("year2022")).toBe(1);
    expect(count("year2023-community")).toBe(4);
    expect(count("year2025-mentor-awards")).toBe(1);
    for (const img of container.querySelectorAll(".gallery img")) {
      expect(img.getAttribute("alt"), img.getAttribute("src")!).toBeTruthy();
      expect(img).toHaveAttribute("loading", "lazy");
      expect(img.getAttribute("src")).toMatch(/^\/images\/journey\//);
    }
  });

  it("shows a lone photo uncropped instead of as a grid cell", () => {
    const { container } = render(<Journey lang="en" />);
    expect(container.querySelector("#year2022 .gallery")).toHaveClass("single");
    expect(container.querySelector("#year2017 .gallery")).not.toHaveClass("single");
  });

  it("shows the gallery before the blog posts", () => {
    const { container } = render(<Journey lang="en" />);
    const story = container.querySelector("#year2017 .story")!;
    const kids = [...story.children];
    const gallery = kids.findIndex((el) => el.classList.contains("gallery"));
    expect(gallery).toBeGreaterThan(-1);
    expect(gallery).toBeLessThan(kids.findIndex((el) => el.classList.contains("blog-posts")));
    expect(story.lastElementChild).toHaveClass("blog-posts");
  });

  it("marks only the Now milestone as current", () => {
    const { container } = render(<Journey lang="en" />);
    const current = container.querySelectorAll("article.current");
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("id", "now");
    expect(current[0].querySelector(".year i")).not.toBeNull();
  });

  it("renders the Dfounders venture tree linking to its ventures", () => {
    const { container } = render(<Journey lang="en" />);
    const tree = screen.getByLabelText("Ventures that emerged from Dfounders");
    expect(container.querySelector("#year2016")).toHaveClass("company-builder");
    expect(tree.querySelector("a[href='#year2017']")).toHaveTextContent("Beer Happy Club");
    expect(tree.querySelector("a[href='#year2019']")).toHaveTextContent("HoyTrabajas");
    expect(tree).toHaveTextContent("Other initiatives");
  });

  it("renders origin links first inside the story", () => {
    const { container } = render(<Journey lang="en" />);
    const story = container.querySelector("#year2017 .story")!;
    expect(story.firstElementChild).toHaveClass("venture-origin");
    expect(story.firstElementChild).toHaveAttribute("href", "#year2016");
  });

  it("renders facts, details, roles, YC badge and the Gingga button", () => {
    const { container } = render(<Journey lang="en" />);
    expect(container.querySelector("#year2014-fluvip .fact")).toHaveTextContent("4people in the team at the beginning20developers led");
    expect(container.querySelector("#year2014-fluvip details summary")).toHaveTextContent("Building for international growth +");
    expect(container.querySelectorAll("#year2023-community .role-history > div")).toHaveLength(2);
    expect(container.querySelector("#year2022 .yc")).toHaveTextContent("Y Combinator");
    const button = screen.getByRole("link", { name: /Explore Gingga/ });
    expect(button).toHaveAttribute("href", "https://gingga.com/");
    expect(button).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("embeds the Consulate documentary from privacy-friendly YouTube", () => {
    const { container } = render(<Journey lang="en" />);
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
    const { container } = render(<Journey lang="en" />);
    expect(container.querySelector("#year2012 .year")).toHaveClass("words");
    expect(container.querySelector("#year2010 .year")).not.toHaveClass("words");
  });

  it("introduces the narrative arc from developer to AI builder, in order", () => {
    render(<Journey lang="en" />);
    const arc = screen.getByRole("list", { name: "The arc of the journey" });
    const labels = [...arc.querySelectorAll("li strong")].map((el) => el.textContent);
    expect(labels).toEqual(["Developer", "Product", "Founder", "AI builder"]);
  });

  it("does not turn every lesson into a duplicate landmark, and labels the venture tree as a group", () => {
    const { container } = render(<Journey lang="en" />);
    expect(container.querySelectorAll("aside")).toHaveLength(0);
    const tree = container.querySelector(".venture-tree");
    expect(tree).toHaveAttribute("role", "group");
    expect(tree).toHaveAttribute("aria-label");
  });

  it("renders the learned callout only for milestones that define it, before gallery and posts", () => {
    const { container } = render(<Journey lang="en" />);
    const callouts = container.querySelectorAll(".learned");
    expect(callouts).toHaveLength(milestones.filter((m) => m.learned).length);
    for (const m of milestones) {
      const el = container.querySelector(`#${m.id} .learned`);
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
    const { container } = render(<Journey lang="en" />);
    expect(container.querySelectorAll(".gallery img")).toHaveLength(17);
    expect(container.querySelectorAll(".gallery button img")).toHaveLength(17);
    expect(container.querySelectorAll(".gallery a")).toHaveLength(0);
  });

  it("gives the Now milestone a labelled marker for the accent treatment", () => {
    const { container } = render(<Journey lang="en" />);
    expect(container.querySelector("#now .year i")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Journey with the Spanish locale", () => {
  it("prefixes essay links with /es and keeps in-page anchors", () => {
    const { container } = render(<Journey lang="es" />);
    const posts = [...container.querySelectorAll("a.blog-post")].map((a) => a.getAttribute("href"));
    expect(posts.length).toBeGreaterThan(0);
    posts.forEach((h) => expect(h).toMatch(/^\/es\/essays\/[a-z-]+$/));
    const anchors = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    anchors.filter((h) => h.startsWith("#")).forEach((h) => expect(h).toMatch(/^#year/));
  });

  it("renders the Spanish heading, arc and milestone copy", () => {
    const { container } = render(<Journey lang="es" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Distintos proyectos.Un solo propósito.");
    const arc = screen.getByRole("list", { name: "El arco de la trayectoria" });
    expect([...arc.querySelectorAll("li strong")].map((el) => el.textContent)).toEqual([
      "Desarrollador",
      "Producto",
      "Fundador",
      "Constructor de IA",
    ]);
    const es = getMilestones("es");
    const ids = [...container.querySelectorAll("article.milestone")].map((el) => el.id);
    expect(ids).toEqual(es.map((m) => m.id).reverse());
    for (const m of es) {
      const el = container.querySelector(`article#${m.id}`)!;
      expect(el).toHaveTextContent(m.eyebrow);
      expect(el).toHaveTextContent(m.period);
      expect(el.querySelector("h2")).toHaveTextContent(m.titleLines[0]!);
    }
  });

  it("shows the Spanish original titles under the Spanish milestones", () => {
    const { container } = render(<Journey lang="es" />);
    const post = container.querySelector("#year2010 a.blog-post")!;
    expect(post).toHaveAttribute("lang", "es");
    expect(post).toHaveAttribute("href", "/es/essays/lecciones-quiebra-restaurante");
    expect(post.textContent).toContain("12 cosas que aprendí de la quiebra de un restaurante");
    expect(container.querySelector("#year2010 .blog-posts .eyebrow")).toHaveTextContent("DE MI BLOG");
  });

  it("labels the learned box, the venture tree and the Gingga button in Spanish", () => {
    const { container } = render(<Journey lang="es" />);
    expect(container.querySelector("#year2010 .learned")).toHaveTextContent("Lo que aprendí");
    expect(screen.getByLabelText("Emprendimientos que surgieron de Dfounders")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Conoce Gingga/ })).toHaveAttribute("href", "https://gingga.com/");
  });

  it("throws loudly when a timeline post has no matching essay", () => {
    // The lookup is by the Spanish original title, so a post without an essay must not render silently.
    const original = milestones.find((m) => m.id === "year2010")!;
    const stray = {
      ...original,
      blocks: original.blocks.map((b) =>
        b.kind === "posts" ? { ...b, items: [{ title: "Not an essay", sections: [{ text: "x" }] }] } : b,
      ),
    };
    expect(() => render(<Milestone milestone={stray} lang="en" />)).toThrow(/no matching essay/);
  });
});
