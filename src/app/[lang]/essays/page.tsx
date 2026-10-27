import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EssayBrowser } from "@/components/landing/EssayBrowser";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { StartHere } from "@/components/landing/StartHere";
import { getEssays, START_HERE_SLUG } from "@/data/essays";
import { getEssaysUi } from "@/data/essays-ui";
import { NEWSLETTER, SITE } from "@/data/site";
import { alternatesFor, hasLocale } from "@/i18n/config";
import { getEssay } from "@/lib/essays";

type Props = Pick<PageProps<"/[lang]/essays">, "params">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    ...getEssaysUi(lang).meta,
    alternates: alternatesFor(lang, "/essays"),
  };
}

export default async function EssaysPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const ui = getEssaysUi(lang);
  const essays = getEssays(lang);
  const startHere = getEssay(START_HERE_SLUG, essays);

  return (
    <>
      <Header lang={lang} currentPath="/essays" />
      <main id="home" className="essays wrap">
        <div className="essays-intro">
          <span className="eyebrow">{ui.hub.eyebrow}</span>
          <h1>
            {ui.hub.titleLead} <em>{ui.hub.titleEmphasis}</em>
          </h1>
          <p>{ui.hub.intro}</p>
        </div>
        {startHere && <StartHere lang={lang} essay={startHere} />}
        <EssayBrowser lang={lang} essays={essays} />
        <NewsletterSignup lang={lang} endpoint={NEWSLETTER.endpoint} email={SITE.email} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
