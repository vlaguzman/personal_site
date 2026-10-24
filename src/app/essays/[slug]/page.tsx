import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EssayArticle } from "@/components/landing/EssayArticle";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ESSAYS } from "@/data/essays";
import { excerpt, getEssay, relatedEssays } from "@/lib/essays";

// Only published essays exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ESSAYS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/essays/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug, ESSAYS);
  if (!essay) return {};
  const description = excerpt(essay.sections, 160);
  return {
    title: `${essay.title} | Vladimir Guzmán`,
    description,
    openGraph: { type: "article", title: essay.title, description, locale: essay.lang },
  };
}

export default async function EssayPage({ params }: PageProps<"/essays/[slug]">) {
  const { slug } = await params;
  const essay = getEssay(slug, ESSAYS);
  if (!essay) notFound();

  return (
    <>
      <Header currentPath="/essays" />
      <main id="home" className="wrap">
        <EssayArticle essay={essay} related={relatedEssays(slug, ESSAYS, 3)} />
      </main>
      <Footer />
    </>
  );
}
