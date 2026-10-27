import type { Locale } from "@/i18n/config";
import { beingAnEntrepreneur, funkyLessons, fluvipThanks, sellingBeer, subscriptionBoxPoints } from "./posts";
import { beingAnEntrepreneurEn, fluvipThanksEn, funkyLessonsEn, sellingBeerEn, subscriptionBoxPointsEn } from "./posts-en";
import type { Essay, Post, Topic } from "./types";

/** Canonical order of the topic filters. Only topics with essays are shown. */
export const TOPICS: readonly Topic[] = ["Startups", "Product", "Technology", "Strategy", "Fundraising"];

/**
 * Every blog post of the timeline, published as an in-site essay. These are the
 * Spanish originals, never edited. A topic is only set when the title and body clearly
 * support it; the FLUVIP farewell and the beer-club story stay untagged.
 */
export const ESSAYS: readonly Essay[] = [
  { ...funkyLessons, slug: "lecciones-quiebra-restaurante", topic: "Startups", lang: "es" },
  { ...beingAnEntrepreneur, slug: "ser-emprendedor", topic: "Startups", lang: "es" },
  { ...subscriptionBoxPoints, slug: "negocio-caja-suscripcion", topic: "Strategy", lang: "es" },
  { ...fluvipThanks, slug: "gracias-fluvip", lang: "es" },
  { ...sellingBeer, slug: "vender-cerveza", lang: "es" },
];

/** The English translation of each original, in the same order as `ESSAYS`. */
const TRANSLATIONS: readonly Post[] = [funkyLessonsEn, beingAnEntrepreneurEn, subscriptionBoxPointsEn, fluvipThanksEn, sellingBeerEn];

/**
 * The English translations, made with AI. Each one reuses the slug, topic and image
 * of its original, so `/en/essays/<slug>` is the translation of `/es/essays/<slug>`.
 */
const ESSAYS_EN: readonly Essay[] = ESSAYS.map((original, i) => ({
  ...TRANSLATIONS[i]!,
  slug: original.slug,
  topic: original.topic,
  ...(original.image && { image: original.image }),
  lang: "en",
  translatedWithAI: true,
}));

/** Every essay of a locale: the Spanish originals for `es`, the English translations for `en`. */
export function getEssays(lang: Locale): readonly Essay[] {
  return lang === "es" ? ESSAYS : ESSAYS_EN;
}

/** The essay a founder should read first: the most complete lessons-learned piece. */
export const START_HERE_SLUG = "lecciones-quiebra-restaurante";
