"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // One signature ease and duration for the whole site — shared personality.
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCE_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCE_MOTION_QUERY).matches;
}

// Always false during the static export / before hydration — matches what
// the previous useState(false) default rendered, so the client's first pass
// still agrees with the server and there's no hydration mismatch.
function getReducedMotionServerSnapshot() {
  return false;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  // useSyncExternalStore rather than state-set-in-an-effect: it has the same
  // SSR-safe "false until hydrated" first paint, but the correction to the
  // real value happens through React's own snapshot mechanism instead of an
  // extra render pass, and it keeps listening — so it also picks up the OS
  // setting changing while the tab is already open, which the one-time
  // effect this replaced never did.
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

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
