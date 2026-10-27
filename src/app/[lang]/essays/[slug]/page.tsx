import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EssayArticle } from "@/components/landing/EssayArticle";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { getEssays } from "@/data/essays";
import { alternatesFor, hasLocale, LOCALES } from "@/i18n/config";
import { excerpt, getEssay, relatedEssays } from "@/lib/essays";

type Props = Pick<PageProps<"/[lang]/essays/[slug]">, "params">;

// Only published essays exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getEssays(lang).map(({ slug }) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const essay = getEssay(slug, getEssays(lang));
  if (!essay) return {};
  const description = excerpt(essay.sections, 160);
  return {
    title: `${essay.title} | Vladimir Guzmán`,
    description,
    alternates: alternatesFor(lang, `/essays/${slug}`),
    openGraph: { type: "article", title: essay.title, description, locale: essay.lang },
  };
}

export default async function EssayPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const essays = getEssays(lang);
  const essay = getEssay(slug, essays);
  if (!essay) notFound();
  // Only a Spanish original can point to its English translation, which shares its slug.
  const translationAvailable = essay.lang === "es" && getEssay(slug, getEssays("en")) !== undefined;

  return (
    <>
      <Header lang={lang} currentPath="/speaking" path={`/essays/${slug}`} />
      <main id="home" className="wrap">
        <EssayArticle lang={lang} essay={essay} related={relatedEssays(slug, essays, 3)} translationAvailable={translationAvailable} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
