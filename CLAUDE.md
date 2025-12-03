# Genetec Training Courses Directory - Agent Guide v2.0

**Last Updated**: 2025-12-03
**Status**: ✅ Production Deployment Complete

## Project Overview

Fully functional Next.js 14+ training courses directory with 43 courses, 7 filters, search, and pagination.

**Live**: https://github.com/Light514/genetec-courses (deployed on Vercel)

---

## Critical Rules

### Architecture
- GREENFIELD PROJECT - built from scratch in genetec-courses/
- Next.js 14+ with App Router (NOT Pages Router)
- TypeScript strict mode
- Tailwind CSS v4 (use @import "tailwindcss" syntax)
- Framer Motion for animations
- papaparse for CSV parsing

### Data Model
- **Courses**: 43 valid courses from LIST_PAGE_metadata.csv
- **Delivery Types**: Array-based (courses can support multiple types)
  - Changed from `string` to `string[]` on Dec 3, 2025
  - Uses courses_delivery_types.csv for mapping
  - Filter logic: INCLUDES (like languages)
- **Languages**: Array-based with INCLUDES logic
- **Other filters**: Single-value with exact match

### Styling & Branding
- **Colors** (Updated Dec 3, 2025):
  - Primary Dark: #2C3239 (header, filter buttons)
  - Accent/Tertiary: #3DC1F3 (badges, buttons, highlights)
  - Badge: #005197 white text (certification)
- **Fonts**:
  - Garamond Premier Pro: Headings (via inline styles)
  - Circular Pro: Body text (via inline styles)
  - Applied with next/font/local due to Tailwind v4 compatibility
- **Responsive**: 3 columns → 2 columns → 1 column

### Filter Logic
- **AND** logic across categories (must match all selected categories)
- **OR** logic within category (can match any within a category)
- **INCLUDES** logic for:
  - Delivery Type: Course must have at least one selected type
  - Languages: Course must have at least one selected language

---

## Allowed Paths

### Code
- `genetec-courses/**` - All application code

### Documentation
- `docs/**` - All documentation
- `NOW.md` - Current task pointer
- `STACK.md` - Task stack
- `CLAUDE.md` - This file

### Assets
- Copy from `assets/` to `genetec-courses/public/`
- Fonts: `public/fonts/`
- Icons: `public/icons/`
- Data: `public/data/`

---

## Tech Stack

### Core
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Data**: papaparse (CSV parsing)

### Key Files
1. **genetec-courses/lib/types.ts** - TypeScript interfaces
2. **genetec-courses/lib/parseCourses.ts** - CSV parser with delivery type mapping
3. **genetec-courses/lib/filterCourses.ts** - Filter algorithm (AND/OR/INCLUDES logic)
4. **genetec-courses/app/page.tsx** - Main page with state management
5. **genetec-courses/components/FilterBar.tsx** - 7-filter UI

---

## Implementation Notes

### Delivery Type Data Model (Dec 3, 2025)

**Problem**: Original CSV had "Instructor-led & Self-paced" as a third type.

**Solution**:
1. Created `courses_delivery_types.csv` with one row per delivery type per course
2. Changed `Course.deliveryType` from `string` to `string[]`
3. Parser builds Map<string, string[]> from course title → delivery types
4. Filter uses INCLUDES logic: `values.some(type => course.deliveryType.includes(type))`

**Result**:
- 2 courses support both delivery types
- Instructor-led filter shows 13 courses
- Self-paced filter shows 34 courses
- Courses with both types appear in both filters

### Font Loading (Tailwind v4)

**Challenge**: Tailwind v4 CSS variable utilities don't work with custom fonts in className.

**Solution**: Use inline styles with CSS variables:
```typescript
style={{ fontFamily: 'var(--font-garamond), serif' }}
```

### Filter Counts

Updated Dec 3, 2025:
- **Delivery Type**: Instructor-led (13), Self-paced (34)
- **Certification**: Yes (21), No (22)
- **Audience**: Administrator (30), Operator (12), Power user (1)
- **Level**: Fundamentals (37), Advanced (6)
- **Languages**: English (43), French (43), Spanish (24)
- **Product Lines**: 9 options
- **Product Categories**: 9 options

---

## Key Decisions & Lessons

### State Management
- **Decision**: useState (not useReducer)
- **Reason**: Simple, sufficient for this use case

### CSV Parsing
- **Tool**: papaparse
- **Files**: 2 CSV files (main + delivery types)
- **Malformed rows**: Lines 44-46 filtered out (missing Icon field)

### Pagination
- **Initial**: 12 courses
- **Increment**: 12 per click
- **Reset**: Reset to 12 when filters change

### Assets
- **Fonts**: Loaded with next/font/local, applied via inline styles
- **Icons**: 9 SVG product icons in public/icons/
- **Data**: CSV/JSON files in public/data/

---

## Deployment

- **Repository**: https://github.com/Light514/genetec-courses
- **Platform**: Vercel
- **Auto-deploy**: Enabled from main branch
- **Status**: Live and production-ready

---

## NO ASSUMPTIONS Rule

- Use ONLY provided CSV/JSON data
- Match design spec exactly (current-page.png)
- NO feature additions without explicit request
- NO assumptions about data structure - verify first

---

## Success Criteria ✅

All criteria met as of Dec 3, 2025:

- [x] All 43 courses display correctly
- [x] All 7 filters work with multi-select
- [x] Delivery type INCLUDES logic implemented
- [x] Search filters by title in real-time
- [x] Load More shows batches correctly
- [x] Responsive layout (3→2→1 columns)
- [x] Animations smooth and professional
- [x] Genetec brand colors applied (#2C3239, #3DC1F3, #005197)
- [x] Custom fonts load correctly (Garamond, Circular)
- [x] Production build completes without errors
- [x] Deployed to Vercel

---

**End of Agent Guide**
