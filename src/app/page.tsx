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
        <Conversations />
        <Contact />
      </main>
      <Footer />
      <ReadingProgress />
    </>
  );
}
