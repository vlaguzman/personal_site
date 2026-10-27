import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Journey } from "@/components/landing/Journey";
import { ReadingProgress } from "@/components/landing/ReadingProgress";

export const metadata: Metadata = {
  title: "The journey | Vladimir Guzmán",
  description:
    "Building, learning and starting again since 2010: the ventures, failures and lessons behind Vladimir Guzmán, from a restaurant in Colombia to Y Combinator.",
};

export default function JourneyPage() {
  return (
    <>
      <Header currentPath="/journey" />
      <main id="home">
        <Journey />
      </main>
      <Footer />
      <ReadingProgress />
    </>
  );
}
