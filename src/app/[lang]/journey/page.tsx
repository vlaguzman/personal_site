import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Journey } from "@/components/landing/Journey";
import { ReadingProgress } from "@/components/landing/ReadingProgress";
import { getJourneyUi } from "@/data/journey-ui";
import { alternatesFor, hasLocale } from "@/i18n/config";

type Props = Pick<PageProps<"/[lang]/journey">, "params">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    ...getJourneyUi(lang).meta,
    alternates: alternatesFor(lang, "/journey"),
  };
}

export default async function JourneyPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Header lang={lang} currentPath="/journey" />
      <main id="home">
        <Journey lang={lang} />
      </main>
      <Footer lang={lang} />
      <ReadingProgress />
    </>
  );
}
