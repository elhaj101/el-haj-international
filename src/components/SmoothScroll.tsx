"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // One signature ease and duration for the whole site — shared personality.
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read as state (not during render) so the static export and the hydrated
  // client agree on the first pass. Only an option changes, never the tree.
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  // Drive ScrollTrigger from Lenis so both run off one clock — without this
  // they drift and scroll animations stutter.
  const lenis = useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    if (!lenis) return;
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  useEffect(() => {
    // Marks the document as "JS is running", which is what allows elements to
    // start at opacity:0. Without JS the page stays fully readable.
    document.documentElement.classList.add("js-ready");

    // ScrollTrigger measures too early if fonts or images land afterwards.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <ReactLenis
      root
      options={{ duration: 1.1, smoothWheel: !reduced }}
    >
      {children}
    </ReactLenis>
  );
}
