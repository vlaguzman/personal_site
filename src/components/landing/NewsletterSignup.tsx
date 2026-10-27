import { getEssaysUi } from "@/data/essays-ui";
import type { Locale } from "@/i18n/config";

type Props = {
  /** Form endpoint of a real newsletter service. While null, a mailto call to action is shown. */
  endpoint: string | null;
  email: string;
  lang: Locale;
};

export function NewsletterSignup({ endpoint, email, lang }: Props) {
  const { newsletter } = getEssaysUi(lang);

  return (
    <section className="essays-newsletter" aria-labelledby="essays-newsletter-title">
      <h2 id="essays-newsletter-title">{newsletter.title}</h2>
      {endpoint ? (
        <form action={endpoint} method="post">
          <label htmlFor="newsletter-email">{newsletter.emailLabel}</label>
          <input id="newsletter-email" name="email" type="email" autoComplete="email" required />
          <button type="submit">{newsletter.subscribe}</button>
        </form>
      ) : (
        <>
          <p>{newsletter.noList}</p>
          <a
            className="cta-primary"
            href={`mailto:${email}?subject=${encodeURIComponent(newsletter.mailtoSubject)}`}
          >
            {newsletter.mailtoLabel} <span aria-hidden="true">→</span>
          </a>
        </>
      )}
    </section>
  );
}
