"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import scrollConfig from "../config/scroll";

export default function LenisProvider() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;
    if (!scrollConfig.enableSmoothScroll) return;

    let lenis;
    let rafId;

    (async () => {
      const { default: Lenis } = await import("lenis");

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -5 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isAdmin]);

  return null;
}
