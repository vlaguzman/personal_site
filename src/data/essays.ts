import { beingAnEntrepreneur, funkyLessons, fluvipThanks, sellingBeer, subscriptionBoxPoints } from "./posts";
import type { Essay, Topic } from "./types";

/** Canonical order of the topic filters. Only topics with essays are shown. */
export const TOPICS: readonly Topic[] = ["Startups", "Product", "Technology", "Strategy", "Fundraising"];

/**
 * Every blog post of the timeline, published as an in-site essay. Posts are
 * written in Spanish. A topic is only set when the title and body clearly
 * support it; the FLUVIP farewell and the beer-club story stay untagged.
 */
export const ESSAYS: readonly Essay[] = [
  { ...funkyLessons, slug: "lecciones-quiebra-restaurante", topic: "Startups", lang: "es" },
  { ...beingAnEntrepreneur, slug: "ser-emprendedor", topic: "Startups", lang: "es" },
  { ...subscriptionBoxPoints, slug: "negocio-caja-suscripcion", topic: "Strategy", lang: "es" },
  { ...fluvipThanks, slug: "gracias-fluvip", lang: "es" },
  { ...sellingBeer, slug: "vender-cerveza", lang: "es" },
];

/** The essay a founder should read first: the most complete lessons-learned piece. */
export const START_HERE_SLUG = "lecciones-quiebra-restaurante";
