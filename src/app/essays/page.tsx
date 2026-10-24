import type { Metadata } from "next";
import { EssayBrowser } from "@/components/landing/EssayBrowser";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { StartHere } from "@/components/landing/StartHere";
import { ESSAYS, START_HERE_SLUG } from "@/data/essays";
import { NEWSLETTER, SITE } from "@/data/site";
import { getEssay } from "@/lib/essays";

export const metadata: Metadata = {
  title: "Essays | Vladimir Guzmán",
  description:
    "Lessons on startups, strategy and building companies, collected from Vladimir Guzmán’s own ventures. Organised by topic, not by date.",
};

export default function EssaysPage() {
  const startHere = getEssay(START_HERE_SLUG, ESSAYS);

  return (
    <>
      <Header currentPath="/essays" />
      <main id="home" className="essays wrap">
        <div className="essays-intro">
          <span className="eyebrow">ESSAYS</span>
          <h1>
            Lessons from <em>building</em>
          </h1>
          <p>
            Notes on startups, strategy and building companies, written after the fact from my own ventures. Organised
            by topic rather than date, so you can read in whatever order serves you. The essays are in Spanish, the
            language I wrote them in.
          </p>
        </div>
        {startHere && <StartHere essay={startHere} />}
        <EssayBrowser essays={ESSAYS} />
        <NewsletterSignup endpoint={NEWSLETTER.endpoint} email={SITE.email} />
      </main>
      <Footer />
    </>
  );
}
