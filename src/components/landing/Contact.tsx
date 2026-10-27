import { getContact } from "@/data/contact";
import { FOUNDER_PROFILE_PDF, SITE } from "@/data/site";
import type { Locale } from "@/i18n/config";

export function Contact({ lang }: { lang: Locale }) {
  const contact = getContact(lang);
  return (
    <section id="contact" className="contact wrap">
      <div>
        <span className="eyebrow">{contact.eyebrow}</span>
        <h2>
          {contact.titleLead} <br />
          <em>{contact.titleEmphasis}</em>
        </h2>
      </div>
      <div>
        <p>{contact.text}</p>
        <a className="email" href={SITE.calendly} target="_blank" rel="noopener noreferrer">
          {contact.booking.label} <span>↗</span>
        </a>
        <div className="contact-links">
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            {contact.linkedin.label} ↗
          </a>
          <a href={FOUNDER_PROFILE_PDF} download="founder-profile.pdf">
            {contact.profile.label} ↓
          </a>
        </div>
      </div>
    </section>
  );
}
