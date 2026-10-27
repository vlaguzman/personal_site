import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { WorkTogether } from "@/components/landing/WorkTogether";
import { getWork } from "@/data/work";
import { alternatesFor, hasLocale } from "@/i18n/config";

type Props = Pick<PageProps<"/[lang]/work-together">, "params">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    ...getWork(lang).meta,
    alternates: alternatesFor(lang, "/work-together"),
  };
}

export default async function WorkTogetherPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Header lang={lang} currentPath="/work-together" />
      <main id="home">
        <WorkTogether lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
