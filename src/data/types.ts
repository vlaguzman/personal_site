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
  blocks: Block[];
};
