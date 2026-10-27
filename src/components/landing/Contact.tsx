import { FOUNDER_PROFILE_PDF, SITE } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="contact wrap">
      <div>
        <span className="eyebrow">THE NEXT CONVERSATION</span>
        <h2>
          What are
          <br />
          <em>you building?</em>
        </h2>
      </div>
      <div>
        <p>
          I’m open to thoughtful conversations about entrepreneurship, strategic technology and partnerships that help
          businesses move forward.
        </p>
        <a className="email" href={SITE.calendly} target="_blank" rel="noopener noreferrer">
          Book a conversation <span>↗</span>
        </a>
        <div className="contact-links">
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={FOUNDER_PROFILE_PDF} download="founder-profile.pdf">
            Download founder profile ↓
          </a>
        </div>
      </div>
    </section>
  );
}
