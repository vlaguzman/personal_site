import { describe, expect, it } from "vitest";
import { getExperience } from "./experience";
import { milestones } from "./milestones";

const factValues = milestones.flatMap((m) => m.blocks).flatMap((b) => (b.kind === "facts" ? b.items.map((f) => f.value) : []));

/** Figures supplied by the author that no milestone repeats. Keep this list short. */
const AUTHOR_FIGURES = ["20+"];

const now = new Date("2026-06-01");

describe("getExperience", () => {
  const experience = getExperience("en", now);
  const es = getExperience("es", now);

  it("computes the years of experience from the earliest milestone", () => {
    expect(experience.paragraphs[0]).toBe(
      "I’ve spent 16 years working across entrepreneurship, software, product development and technology leadership.",
    );
    expect(es.paragraphs[0]).toBe(
      "Llevo 16 años entre el emprendimiento, el desarrollo de software, los productos digitales y el liderazgo tecnológico.",
    );
  });

  it("links the ventures that failed to the ones that raised millions", () => {
    expect(experience.paragraphs[1]).toBe(
      "From early ventures that failed to companies that raised millions, every chapter has challenged how I think about business, success and leadership.",
    );
    expect(es.paragraphs[1]).toBe(
      "He participado en negocios que cerraron, empresas que crecieron internacionalmente y proyectos que levantaron millones en inversión. Cada experiencia ha cambiado mi manera de entender el éxito.",
    );
  });

  it("models the heading as a lead plus an emphasised word", () => {
    expect([experience.eyebrow, experience.titleLead, experience.titleEmphasis]).toEqual([
      "THE TRACK RECORD",
      "Built through",
      "experience",
    ]);
    expect([es.eyebrow, es.titleLead, es.titleEmphasis]).toEqual(["LA TRAYECTORIA", "Aprender", "construyendo"]);
  });

  it("labels the two lists for assistive tech in each language", () => {
    expect([experience.rolesLabel, experience.figuresLabel]).toEqual(["Experience", "Track record"]);
    expect([es.rolesLabel, es.figuresLabel]).toEqual(["Experiencia", "Trayectoria en cifras"]);
  });

  it("lists five roles, each with a title and context", () => {
    expect(experience.roles.map((r) => r.title)).toEqual([
      "Co-founder and former CTO",
      "Former technology leader",
      "Founder of multiple ventures",
      "Entrepreneurship programmes and workshops",
      "Speaker",
    ]);
    for (const role of experience.roles) expect(role.context.length).toBeGreaterThan(0);
    expect(experience.roles[0].context).toBe("HoyTrabajas · Y Combinator W22");
    expect(es.roles).toEqual([
      { title: "Cofundador y ex-CTO", context: "HoyTrabajas · Y Combinator W22" },
      { title: "Exlíder tecnológico", context: "FLUVIP" },
      { title: "Fundador de distintos emprendimientos", context: "Incluidos algunos que no funcionaron" },
      { title: "Formación y acompañamiento a emprendedores", context: "Londres" },
      { title: "Conferencista", context: "IA, emprendimiento y potencial humano" },
    ]);
  });

  it("sends readers to the journey", () => {
    expect(experience.cta).toEqual({ label: "Explore my journey", href: "/journey" });
    expect(es.cta).toEqual({ label: "Conoce mi trayectoria", href: "/journey" });
  });

  it("backs the story with the money raised and two operating figures", () => {
    for (const data of [experience, es]) {
      expect(data.figures.map((f) => f.value)).toEqual(["US$4.5m", "US$5m", "20+", "270+"]);
      const text = [...data.paragraphs, ...data.roles.flatMap((r) => [r.title, r.context])].join(" ");
      for (const figure of data.figures) {
        expect(text).not.toContain(figure.value);
        expect(figure.label.length).toBeGreaterThan(0);
      }
    }
  });

  it("describes 20+ as the size of the teams he has led, not a number of companies", () => {
    const figure = experience.figures.find((f) => f.value === "20+");
    expect(figure?.label).toBe("people in the teams I have led across my companies");
    expect(es.figures.find((f) => f.value === "20+")?.label).toBe("personas en los equipos que he liderado en mis empresas");
  });

  it("labels every figure in each language", () => {
    expect(experience.figures.map((f) => f.label)).toEqual([
      "Series A at FLUVIP, 2018",
      "Seed round at HoyTrabajas, 2022",
      "people in the teams I have led across my companies",
      "entrepreneurs reached at the Colombian Consulate in London",
    ]);
    expect(es.figures.map((f) => f.label)).toEqual([
      "Serie A en FLUVIP, 2018",
      "Ronda semilla en HoyTrabajas, 2022",
      "personas en los equipos que he liderado en mis empresas",
      "emprendedores alcanzados en el Consulado de Colombia en Londres",
    ]);
  });

  it("cites the same press for the money raised in both languages", () => {
    const sources = [
      {
        label: "LatamList",
        href: "https://latamlist.com/colombian-marketing-startup-fluvip-receives-us4-5m-series-a-investment/",
      },
      {
        label: "Forbes Colombia",
        href: "https://forbes.co/emprendedores/plataforma-de-empleos-hoytrabajas-capta-us5-millones-en-ronda-semilla",
      },
    ];
    for (const data of [experience, es]) {
      const raised = data.figures.filter((f) => f.source);
      expect(raised.map((f) => f.source)).toEqual(sources);
    }
    expect(experience.figures.filter((f) => f.source).map((f) => f.label)).toEqual([
      "Series A at FLUVIP, 2018",
      "Seed round at HoyTrabajas, 2022",
    ]);
  });

  it("only uses uncited figures that already appear in the milestone facts", () => {
    for (const figure of experience.figures) {
      if (figure.source) continue;
      expect([...factValues, ...AUTHOR_FIGURES], figure.value).toContain(figure.value);
    }
  });
});
