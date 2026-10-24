type Props = {
  /** Form endpoint of a real newsletter service. While null, a mailto call to action is shown. */
  endpoint: string | null;
  email: string;
};

export function NewsletterSignup({ endpoint, email }: Props) {
  return (
    <section className="essays-newsletter" aria-labelledby="essays-newsletter-title">
      <h2 id="essays-newsletter-title">New essays, when they’re ready</h2>
      {endpoint ? (
        <form action={endpoint} method="post">
          <label htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" name="email" type="email" autoComplete="email" required />
          <button type="submit">Subscribe</button>
        </form>
      ) : (
        <>
          <p>There is no mailing list yet. Email me and I’ll note you down for the next essay.</p>
          <a
            className="cta-primary"
            href={`mailto:${email}?subject=${encodeURIComponent("Notify me about new essays")}`}
          >
            Email me to be notified <span aria-hidden="true">→</span>
          </a>
        </>
      )}
    </section>
  );
}
