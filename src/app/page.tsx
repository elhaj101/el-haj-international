import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Marquee from "@/components/Marquee";
import HowItWorks from "@/components/HowItWorks";
import WhatWeMove from "@/components/WhatWeMove";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Marquee />
        <HowItWorks />
        <WhatWeMove />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
