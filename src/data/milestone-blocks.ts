import type { Post } from "./types";

/** Builders shared by the English and Spanish milestone lists, so both stay structurally identical. */

export const gallery = (...images: [file: string, alt: string][]) => ({
  kind: "gallery" as const,
  images: images.map(([file, alt]) => ({ src: `/images/journey/${file}`, alt })),
});

/** The items are always the Spanish `Post` originals: they are the stable key of the essay shown for each locale. */
export const posts = (label: string, ...items: Post[]) => ({ kind: "posts" as const, label, items });

export const p = (text: string, variant?: "reflection" | "small") => ({ kind: "paragraph" as const, text, variant });
