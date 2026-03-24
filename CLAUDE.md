# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Stack

- **Next.js 16.2.0** with the App Router (`src/app/`)
- **React 19.2.4**
- **Swiper 12** — used for the drone models carousel (custom nav buttons via `.custom-prev` / `.custom-next` class refs)
- Plain CSS Modules (`.module.css`) per component; global styles in `src/app/globals.css`
- Google Fonts loaded via `next/font/google` — Montserrat is the primary typeface (`--font-montserrat`)

## Architecture

### Layout

`src/app/layout.js` is the root layout. It loads fonts, applies them as CSS variables on `<html>`, and renders `<Footer>` globally. `<Header>` is rendered inside `page.js` within the banner section (not in layout).

### Page structure (`src/app/page.js`)

The entire homepage is a single client component (`"use client"`). All section data (why-choose cards, tech industries, drone cards, drone slider, insights) is defined as static arrays at the top of the file.

Key interactive behaviors:
- **Stats counters** — `IntersectionObserver` on `statsRef` triggers `setStartCount(true)`, which activates `<Counter>` animations
- **Tech Driving section** — `activeTech` state tracks the selected industry; clicking a sidebar `<li>` updates the displayed image and description
- **Drone slider** — Swiper with `Navigation` module; custom prev/next buttons are wired via CSS class selectors, not refs

### CSS conventions

Global utility classes defined in `globals.css`:
- `.container` — max-width 1290px, centered
- `.padding_left_only` — full-width with only left padding aligned to container (used for the Tech section to bleed right)
- `.common_section` — 120px vertical padding
- `.common_heading` — 48px uppercase heading
- `.common_btn` — icon + underlined text button with spinning fan icon animation on the rotating SVG (`.fan` class)
- `.sticky` — applied to sections intended for scroll-sticky behavior

### Components

- `Header` — logo + "Contact Us" button + hamburger menu button (no mobile menu implemented yet)
- `Footer` — includes a CTA section above the footer, four link columns, newsletter form, and copyright
- `Counter` — client component; animates a number from 0 to `end` over `duration`ms using `requestAnimationFrame`; only starts when `start` prop becomes `true`

### Images

All images are in `public/images/`. Next.js `<Image>` is used throughout except in the Tech Driving section where a plain `<img>` tag is used (intentional or oversight — check before changing).
