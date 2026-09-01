# NORTH & KEY — Premium Editorial Real Estate Website

> *"Find the place that moves you."*

A modern, responsive, high-end editorial real-estate website inspired by luxury magazines, architectural monographs, and contemporary design agencies.

---

## 🏛️ Creative Direction & Brand Identity

- **Brand Name**: **NORTH & KEY**
- **Aesthetic**: Minimal, editorial, cinematic, human, and modern.
- **Color Palette**:
  - **Canvas / Background**: `#F5F3EE` (warm editorial off-white)
  - **Ink / Primary**: `#151515` (charcoal black)
  - **Slate / Secondary**: `#77736B` (tactile warm stone grey)
  - **Forest / Accent**: `#66705A` (muted olive)
  - **Clay / Accent**: `#B85D38` (warm terracotta)
  - **Surface Light**: `#EDE9E1` / `#FAF9F6` (hairline alabaster borders)
  - **Dark Surface**: `#121211` (rich dark footer)
- **Typography System**:
  - **Display Serif**: *Playfair Display* (Google Fonts)
  - **Modern Sans**: *Inter* (Google Fonts)
  - Fluid responsive clamp typography with tight editorial line-heights.

---

## 🌟 Key Features

1. **Cinematic Hero**:
   - Smooth `clip-path` mask reveal over 1.4s.
   - Initial image held at `scale(1.08)` and de-scaling to `scale(1.0)`.
   - Staggered line-by-line heading entrance (*"Find the / place that / moves you."*).
   - Supporting narrative and CTA sequence with delayed scroll cue fade-in.
   - Restrained GSAP ScrollTrigger parallax (`yPercent: -8`).

2. **First Scroll Continuous Cinematic Transition**:
   - Connected via `ScrollTrigger` with `scrub`.
   - Hero content slowly moves upward and softens in opacity without abrupt cuts.
   - Second section reveals an architectural image with `clip-path` and subtle scale (`1.05 → 1.0`), alongside staggered typography.

3. **Interactive Property Discovery (`properties.html`)**:
   - Real-time search across locations, neighborhoods, and architects.
   - Filter pills for Buy / Rent, Price Range, Property Type, and Bedrooms.
   - Desktop split-screen layout with an interactive architectural vector map.
   - Synchronized map coordinate pins with card hover and click previews.
   - Mobile floating view toggle between Map and List view.

4. **Editorial Monograph Pages (`property-detail.html`)**:
   - Dynamic catalog lookup via URL query parameters (`?id=casa-verde`, etc.).
   - Full-bleed architectural imagery, detailed architectural specifications grid, and materials checklist.
   - Asymmetric photo gallery grid.
   - Interactive modal to schedule private viewings with date/time pickers and immediate confirmation.

5. **Agency Story & Ethos (`about.html`)**:
   - The Three Standards of North & Key (Curation Over Volume, Monograph Approach, Radical Discretion).
   - Profiles of founding partners and global atelier locations (Malibu, Aspen, New York, London).

6. **Publication Journal (`journal.html`)**:
   - Curated architectural essays and market insights with reading times and author credits.
   - Biannual print monograph subscription banner.

7. **Private Client Desk (`contact.html`)**:
   - Private inquiry form with inquiry type, primary market, and budget selectors.
   - Direct line: `+1 (212) 555-0190` & email: `advisory@northandkey.com`.

8. **Fluid Motion & Accessibility**:
   - Momentum scrolling powered by **Lenis**.
   - Custom dynamic cursor badge on desktop (`data-cursor="view"`).
   - Full accessibility compliance with `prefers-reduced-motion` in both CSS and JavaScript.

---

## 📁 Project Structure

```
demo-website/
├── index.html              # Homepage
├── properties.html         # Interactive search & split-screen map
├── property-detail.html    # Monograph property detail page & viewing modal
├── about.html              # Agency philosophy & partner profiles
├── journal.html            # Editorial publication & essays
├── contact.html            # Private client inquiry form & ateliers
├── css/
│   └── style.css           # Complete bespoke editorial design system
└── js/
    ├── data.js             # Curated property catalog & journal articles
    ├── main.js             # Lenis, GSAP, cursor, and scroll animations
    ├── properties.js       # Search filtering, sorting & map pin synchronization
    └── property-detail.js  # Dynamic monograph population & booking modal
```

---

## 🚀 Running Locally

Serve the files with any local HTTP server:

```bash
# Using Python 3
python3 -m http.server 3000

# Or using Node
npx serve .
```

Open `http://localhost:3000` in your browser.

---

## 📜 License & Credits

Designed and developed for **North & Key**. Photography sourced via Unsplash Architectural Collections.
