import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Speaking } from "@/components/landing/Speaking";
import { getSpeaking } from "@/data/speaking";
import { alternatesFor, hasLocale } from "@/i18n/config";

type Props = Pick<PageProps<"/[lang]/speaking">, "params">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    ...getSpeaking(lang).meta,
    alternates: alternatesFor(lang, "/speaking"),
  };
}

export default async function SpeakingPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Header lang={lang} currentPath="/speaking" />
      <main id="home">
        <Speaking lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
