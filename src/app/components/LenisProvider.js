"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import scrollConfig from "../config/scroll";

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
    };
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, isAdmin]);

  return null;
}
