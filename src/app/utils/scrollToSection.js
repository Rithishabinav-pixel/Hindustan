// Scrolls to an in-page section by id, using the active Lenis smooth-scroll
// instance when available (see LenisProvider) and falling back to native
// smooth scrolling otherwise. Returns true if the target element was found.
export function scrollToSection(id) {
  if (typeof window === "undefined") return false;

  const el = document.getElementById(id);
  if (!el) return false;

  if (window.lenis) {
    window.lenis.scrollTo(el);
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return true;
}
