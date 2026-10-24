import { TOPICS } from "@/data/essays";
import type { Essay, PostSection, Topic } from "@/data/types";

const WORDS_PER_MINUTE = 200;

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

/** Whole minutes (at least one) to read the body, counting headings and text. */
export function readingTimeMinutes(sections: readonly PostSection[]): number {
  const words = sections.reduce((n, s) => n + countWords(s.heading ?? "") + countWords(s.text), 0);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** First non-empty paragraph, cut at a word boundary within `max` characters. */
export function excerpt(sections: readonly PostSection[], max: number): string {
  const text = sections.map((s) => s.text.trim()).find(Boolean) ?? "";
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export function topicsInUse(list: readonly Essay[]): Topic[] {
  return TOPICS.filter((t) => list.some((e) => e.topic === t));
}

export function getEssay(slug: string, list: readonly Essay[]): Essay | undefined {
  return list.find((e) => e.slug === slug);
}

/** Same-topic essays first, then the rest in their original order. Never includes the essay itself. */
export function relatedEssays(slug: string, list: readonly Essay[], limit: number): Essay[] {
  const current = getEssay(slug, list);
  const others = list.filter((e) => e.slug !== slug);
  const sameTopic = others.filter((e) => current?.topic && e.topic === current.topic);
  const rest = others.filter((e) => !sameTopic.includes(e));
  return [...sameTopic, ...rest].slice(0, limit);
}

export function buildShareLinks(title: string, url: string) {
  const t = encodeURIComponent(title);
  const u = encodeURIComponent(url);
  return {
    x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  };
}
