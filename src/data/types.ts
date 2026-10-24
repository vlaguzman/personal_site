export type Fact = { value: string; label: string };

export type Role = { period: string; title: string; description: string };

export type Venture = { href: string; name: string; note: string };

export type PostSection = { heading?: string; text: string };

/** A blog entry, written in Spanish. */
export type Post = { title: string; sections: PostSection[] };

export type GalleryImage = { src: string; alt: string };

export type Block =
  | { kind: "paragraph"; text: string; variant?: "reflection" | "small" }
  | { kind: "facts"; items: Fact[] }
  | { kind: "details"; summary: string; text: string }
  | { kind: "roles"; items: Role[] }
  | { kind: "origin"; href: string; label: string }
  | { kind: "ventureTree"; ariaLabel: string; root: { eyebrow: string; name: string; tagline: string }; ventures: Venture[]; experiments: { name: string; note: string } }
  | { kind: "yc"; label: string; season: string }
  | { kind: "gallery"; images: GalleryImage[] }
  | { kind: "posts"; label: string; items: Post[] }
  | { kind: "button"; label: string; href: string };

export type Milestone = {
  id: string;
  year: string;
  /** Year slot holds words/ranges, rendered in a smaller size. */
  yearIsRange?: boolean;
  period: string;
  eyebrow: string;
  /** Title lines, rendered separated by line breaks. */
  titleLines: string[];
  /** Optional emphasised last title line, rendered in <em>. */
  titleEmphasis?: string;
  /** The "Now" milestone gets the current marker. */
  current?: boolean;
  /** Dfounders milestone gets the bigger company-builder marker. */
  companyBuilder?: boolean;
  /** One lesson, paraphrased from what the milestone copy already says. Omit when the copy states none. */
  learned?: string;
  blocks: Block[];
};

export type Credential = { value: string; label: string };

export type Belief = { title: string; text: string };

/** A stage of the narrative arc shown above the timeline. */
export type ArcStage = { label: string; text: string };

export type Topic = "Startups" | "Product" | "Technology" | "Strategy" | "Fundraising";

/** An essay published on the site. `sections` is the full body, in the language given by `lang`. */
export type Essay = {
  slug: string;
  title: string;
  /** Omitted when the title and body do not clearly belong to one topic. */
  topic?: Topic;
  lang: "es" | "en";
  sections: PostSection[];
  image?: { src: string; alt: string; width: number; height: number };
};
