import type { Locale } from "@/i18n/config";
import type { ArcStage } from "./types";

/** The narrative arc of the journey, in the order it was lived. */
export const ARC: ArcStage[] = [
  { label: "Developer", text: "Hands-on development across Ruby, C++, Objective-C, Java and more, and now AI, to turn ideas into products." },
  { label: "Product", text: "Connecting business needs with technical delivery." },
  { label: "Founder", text: "From a restaurant in Chía to Y Combinator." },
  { label: "AI builder", text: "Gingga: AI-powered sales systems." },
];

const ARC_ES: ArcStage[] = [
  { label: "Desarrollador", text: "Desarrollo práctico en Ruby, C++, Objective-C, Java y más, y ahora IA, para convertir ideas en productos." },
  { label: "Producto", text: "Conectar las necesidades del negocio con la entrega técnica." },
  { label: "Fundador", text: "De un restaurante en Chía a Y Combinator." },
  { label: "Constructor de IA", text: "Gingga: sistemas de ventas con IA." },
];

/** The arc of a locale: `ARC` for `en`, its Spanish mirror for `es`. */
export function getArc(lang: Locale): ArcStage[] {
  return lang === "es" ? ARC_ES : ARC;
}
