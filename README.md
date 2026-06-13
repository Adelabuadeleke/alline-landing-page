# Alline Hero Section

React + Vite hero section for the Alline AI design platform for AEC.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
src/
├── components/
│   ├── Nav/
│   │   ├── Nav.jsx              # Navigation (desktop + mobile)
│   │   └── Nav.module.css
│   └── Hero/
│       ├── Hero.jsx             # Main hero orchestrator
│       ├── Hero.module.css
│       ├── HeroGrid.jsx         # Full-viewport grid background
│       ├── HeroGrid.module.css
│       ├── HeroVisual.jsx       # Swappable visual component (3 states)
│       └── HeroVisual.module.css
├── hooks/
│   └── useHeroAnimation.js      # All GSAP animation logic
├── styles/
│   └── global.css               # Design tokens, reset
└── App.jsx
```

---

## Hero States

### State 1 — Blueprint (current, fully implemented)
- Alline SVG logo draws itself using GSAP stroke animation
- Grid fades in behind it
- Headline → Description → CTA cascade up

### State 2 — Wireframe 3D (slot ready, needs asset)
Drop your isometric wireframe SVG into:
```
src/components/Hero/HeroVisual.jsx → WireframeVersion component
```
Or mount a React Three Fiber canvas for the 3D version.

### State 3 — Rendered + Hover Reveal (slot ready, needs asset)
Drop your rendered building photo into:
```
src/components/Hero/HeroVisual.jsx → RenderedVersion component
```
The cursor-following `circle()` clip-path reveal is already wired.

---

## Switching States

In `Hero.jsx`, set `HERO_CONFIG.visualMode`:

```js
const HERO_CONFIG = {
  visualMode: 'svg',        // 'svg' | 'wireframe' | 'rendered'
  autoTransition: false,    // auto-advance after delay
  transitionDelay: 4500,    // ms
  scrollTransition: false,  // trigger on scroll
  scrollThreshold: 80,      // px
}
```

In development, a floating state switcher (bottom-right) lets you preview all 3 states.

---

## Future: Three.js / React Three Fiber

`HeroVisual.jsx` is designed for zero-friction 3D upgrade:

```jsx
// Before
<HeroVisual mode="svg" />

// After (mount your R3F canvas in ThreeVersion)
<HeroVisual mode="3d" />
```

The `Hero.jsx` layout doesn't change at all — only the visual slot swaps.

---

## Customisation

| Thing | Where |
|---|---|
| Design tokens (colors, spacing) | `src/styles/global.css` |
| Animation timings | `src/hooks/useHeroAnimation.js` |
| Transition config | `HERO_CONFIG` in `src/components/Hero/Hero.jsx` |
| Grid density | `HeroGrid.jsx` → pattern width/height |
| Breakpoints | `Hero.module.css` → media queries |
| Logo paths | `HeroVisual.jsx` → `SVGVersion` |
