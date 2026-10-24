import { Beliefs } from "@/components/landing/Beliefs";
import { Contact } from "@/components/landing/Contact";
import { CredibilityStrip } from "@/components/landing/CredibilityStrip";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Journey } from "@/components/landing/Journey";
import { Purpose } from "@/components/landing/Purpose";
import { ReadingProgress } from "@/components/landing/ReadingProgress";
import { Talks } from "@/components/landing/Talks";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CredibilityStrip />
        <Journey />
        <Purpose />
        <Beliefs />
        <Talks />
        <Contact />
      </main>
      <Footer />
      <ReadingProgress />
    </>
  );
}
