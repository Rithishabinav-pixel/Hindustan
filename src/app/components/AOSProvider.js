"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function initObserver() {
  document.body.classList.add("aos-initialized");

  const elements = document.querySelectorAll("[data-animate]:not(.aos-animate)");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = Number(el.getAttribute("data-animate-delay")) || 0;
          setTimeout(() => {
            el.classList.add("aos-animate");
          }, delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
  return observer;
}

export default function AOSProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = initObserver();
    return () => observer.disconnect();
  }, [pathname]);

  // Listen for manual refresh requests from async pages (e.g. dynamic service pages)
  useEffect(() => {
    function handleRefresh() {
      initObserver();
    }
    window.addEventListener("aos:refresh", handleRefresh);
    return () => window.removeEventListener("aos:refresh", handleRefresh);
  }, []);

  return null;
}
