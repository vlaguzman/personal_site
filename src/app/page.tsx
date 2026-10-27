import { Beliefs } from "@/components/landing/Beliefs";
import { Contact } from "@/components/landing/Contact";
import { Experience } from "@/components/landing/Experience";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Ideas } from "@/components/landing/Ideas";
import { Intro } from "@/components/landing/Intro";
import { Purpose } from "@/components/landing/Purpose";
import { ReadingProgress } from "@/components/landing/ReadingProgress";
import { Talks } from "@/components/landing/Talks";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Ideas />
        <Experience />
        <Beliefs />
        <Purpose />
        <Talks />
        <Contact />
      </main>
      <Footer />
      <ReadingProgress />
    </>
  );
}
