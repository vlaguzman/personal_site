import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Beliefs } from "@/components/landing/Beliefs";
import { Contact } from "@/components/landing/Contact";
import { Conversations } from "@/components/landing/Conversations";
import { Experience } from "@/components/landing/Experience";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Ideas } from "@/components/landing/Ideas";
import { Intro } from "@/components/landing/Intro";
import { Purpose } from "@/components/landing/Purpose";
import { ReadingProgress } from "@/components/landing/ReadingProgress";
import { alternatesFor, hasLocale } from "@/i18n/config";

type Props = Pick<PageProps<"/[lang]">, "params">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { alternates: alternatesFor(lang, "/") };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <Intro />
        <Ideas lang={lang} />
        <Experience lang={lang} />
        <Beliefs />
        <Purpose />
        <Conversations lang={lang} />
        <Contact />
      </main>
      <Footer lang={lang} />
      <ReadingProgress />
    </>
  );
}
