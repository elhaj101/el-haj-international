import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import HowItWorks from "@/components/HowItWorks";
import WhatWeMove from "@/components/WhatWeMove";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Statement />
        <HowItWorks />
        <WhatWeMove />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
