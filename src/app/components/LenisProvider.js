"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import scrollConfig from "../config/scroll";
import { scrollToSection } from "../utils/scrollToSection";

export default function LenisProvider() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const lenisRef = useRef(null);

  useEffect(() => {
    if (isAdmin) return;
    if (!scrollConfig.enableSmoothScroll) return;

    let lenis;
    let rafId;

    (async () => {
      const { default: Lenis } = await import("lenis");

      lenis = new Lenis({
        duration: 3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;
      window.lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
      lenisRef.current = null;
      if (window.lenis === lenis) window.lenis = null;
    };
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;

    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      // Target section may not be mounted yet right after navigation, so
      // retry briefly until it appears (or give up after ~2s).
      let attempts = 0;
      let timeoutId;
      const tryScroll = () => {
        if (scrollToSection(hash) || attempts++ >= 20) return;
        timeoutId = setTimeout(tryScroll, 100);
      };
      tryScroll();
      return () => clearTimeout(timeoutId);
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, isAdmin]);

  return null;
}
