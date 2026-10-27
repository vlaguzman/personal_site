import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EssayBrowser } from "@/components/landing/EssayBrowser";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { StartHere } from "@/components/landing/StartHere";
import { ESSAYS, START_HERE_SLUG } from "@/data/essays";
import { NEWSLETTER, SITE } from "@/data/site";
import { alternatesFor, hasLocale } from "@/i18n/config";
import { getEssay } from "@/lib/essays";

type Props = Pick<PageProps<"/[lang]/essays">, "params">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: "Essays | Vladimir Guzmán",
    description:
      "Lessons on startups, strategy and building companies, collected from Vladimir Guzmán’s own ventures. Organised by topic, not by date.",
    alternates: alternatesFor(lang, "/essays"),
  };
}

export default async function EssaysPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const startHere = getEssay(START_HERE_SLUG, ESSAYS);

  return (
    <>
      <Header lang={lang} currentPath="/essays" />
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
        {startHere && <StartHere lang={lang} essay={startHere} />}
        <EssayBrowser lang={lang} essays={ESSAYS} />
        <NewsletterSignup endpoint={NEWSLETTER.endpoint} email={SITE.email} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
