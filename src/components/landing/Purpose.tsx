import { getPurpose } from "@/data/purpose";
import type { Locale } from "@/i18n/config";

export function Purpose({ lang }: { lang: Locale }) {
  const purpose = getPurpose(lang);
  return (
    <section className="purpose">
      <div className="wrap">
        <span className="eyebrow">{purpose.eyebrow}</span>
        <p>
          “{purpose.quoteLead}
          <em>{purpose.quoteEmphasis}</em>”
        </p>
        <div className="purpose-bottom">
          <span>{purpose.name}</span>
          <span>{purpose.tagline}</span>
        </div>
      </div>
    </section>
  );
}
