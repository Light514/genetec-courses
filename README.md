# Genetec Training Courses Directory

## Project Overview

Redesign the training courses list page. Current version uses blog templates - need proper course catalog.

**Tech Stack:**
- Next.js (App Router)
- Tailwind CSS
- Framer Motion (for smooth animations)
- Vercel deployment

**Workflow:**
- We use the **Hybrid Documentation System** (Manus + Stack-based)
- See `hybrid_documentation_system.md` for full workflow details
- Always maintain NOW.md, STACK.md, and task folders in docs/active/

**Scope:**
- List page only (not single course detail page)
- Cards link to "Under Construction" page

---

## Branding

**Use existing Genetec branding:**
- Check `current-page.png` for current styles/colors
- Match current page aesthetic (dark gray filters, light gray cards, etc.)
- No navbar or footer needed

**Fonts:**
- **Garamond Premier Pro** - Page heading ("Training courses")
- **Circular Pro** - Everything else (body text, cards, filters)

---

## Data Structure

**Source:** `LIST_PAGE_metadata.csv` (43 courses)

**Fields per course:**
```
Code: "SC-OTC-001"
Title: "Omnicast™ Administrator Certification Training"
Certification: "Yes" | "No"
Delivery type: "Self-paced" | "Instructor-led" | "Instructor-led & Self-paced"
Level: "Fundamentals" | "Advanced"
Audience: "Administrator" | "Operator" | "Power user"
Product line: "Omnicast" | "Security Center" | etc.
Product Category: "Video management" | "Access control" | etc.
Languages available: "English, French, Spanish" (comma-separated)
Icon: "omnicast.svg" (filename in /assets/icons/)
```

---

## Course Cards Display

**Show on each card:**
1. **Product line icon** (logo)
2. **Title**
3. **Level** badge
4. **Certification** badge (if Yes)
5. **Languages** (flags or text: EN, FR, ES)

**Layout:**
- 3 columns on desktop
- 2 columns on tablet
- 1 column on mobile

---

## Filters System

**7 filters** (same style as current - dark gray buttons):

1. **Delivery type** (3 options)
2. **Certification** (2 options: Yes, No)
3. **Audience** (3 options)
4. **Product category** (9 options)
5. **Product line** (9 options)
6. **Level** (2 options)
7. **Languages** (3 options: English, French, Spanish) ← NEW

**See `FILTERS.json` for all options and counts.**

**Behavior:**
- Multi-select (can select multiple per filter)
- AND logic (course must match ALL selected filters)
- Update results in real-time

---

## Search Bar

- Top right (like current page)
- Filters courses by title in real-time
- Works together with filters

---

## Load More

- Show first 12-15 courses initially
- "Load More" button to show next batch
- No numbered pagination (1,2,3...)

---

## Product Line Icons

**9 SVG icons in `/assets/icons/`:**
- autovu.svg
- clearance.svg
- kiwivision.svg
- mission-control.svg
- omnicast.svg
- security-center.svg
- security-center-saas.svg
- sipelia.svg
- synergis.svg

**Mapping:** Use `Product line` field to determine which icon to show.

---

## Sort

Default: "Name: A to Z" (same as current page)

---

## Files Structure

```
/project
  /assets
    /fonts
      - GaramondPremierPro (files)
      - CircularPro (files)
    /icons
      - [9 product line SVG icons]
  /app (Next.js App Router)
  /components
  /data
    - LIST_PAGE_metadata.csv
    - FILTERS.json
  - current-page.png (for branding reference)
  - README.md (this file)
```

---

## Animations

Use **Framer Motion** for smooth interactions:
- Card hover effects
- Filter dropdown open/close
- Course cards appearing (stagger effect)
- Load more transition
- Search filtering transition

Keep animations subtle and professional.

---

## What NOT to Include

- Duration, pricing, prerequisites (we don't have this data)
- Single course detail pages (future phase)
- User authentication
- Shopping cart/enrollment
- Backend/API

---

## Design Notes

- Match current page styling (check `current-page.html`)
- Clean, professional, scannable cards
- Clear visual hierarchy
- Subtle shadows on cards (like current)
- Dark navy/gray header and filters
- Light gray/white card backgrounds

---

## Questions?

Ask before assuming. Don't fill gaps with invented features or data.
