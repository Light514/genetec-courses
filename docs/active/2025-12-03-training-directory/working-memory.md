# Working Memory: Genetec Training Courses Directory

**Session Started**: 2025-12-03
**Completed**: 2025-12-03
**Status**: ✅ Deployed to Production

## Key Decisions

### State Management
- Use useState (not useReducer) - simple, sufficient for this use case

### Filter Logic
- AND logic across categories (course must match ALL)
- OR logic within category (course can match ANY)
- **Delivery Type & Language special case**: INCLUDES logic (course must have at least one selected option)
  - Changed delivery type from string to string[] array (Dec 3, 2025)
  - Courses can now support multiple delivery types (e.g., both Instructor-led and Self-paced)

### Delivery Type Data Model (Updated Dec 3, 2025)
- **Problem**: Original CSV had "Instructor-led & Self-paced" as a third separate type
- **Solution**: Created courses_delivery_types.csv with one row per delivery type
- **Implementation**:
  - Changed Course.deliveryType from `string` to `string[]`
  - Parser builds a Map of course title → delivery types array
  - Filter uses INCLUDES logic (same as languages)
- **Result**: 2 courses support both delivery types, appear in both filters
  - Instructor-led: 13 courses (10 exclusive + 2 dual + 1 exclusive)
  - Self-paced: 34 courses (32 exclusive + 2 dual)

### CSV Parsing
- Use papaparse library (robust, handles edge cases)
- Filter out malformed rows (lines 44-46 in CSV)
- **Two CSV files**:
  - LIST_PAGE_metadata.csv: Main course data
  - courses_delivery_types.csv: Delivery type mappings

### Font Loading
- Use next/font/local with OTF files in public/fonts/
- Garamond Premier Pro: Headings (400, 600)
- Circular Pro: Body text (400, 500, 700)
- Applied via inline styles due to Tailwind v4 compatibility

### Load More
- Initial: 12 courses
- Increment: 12 per click
- Reset to 12 when filters change

### Color Scheme (Updated Dec 3, 2025)
- **Primary Dark**: #2C3239 (header, filter buttons) - replaced gray-900/gray-800
- **Accent/Tertiary**: #3DC1F3 (filter count badges, "Clear all", search focus, "Load More")
- **Badge**: #005197 white text (certification badge) - replaced light blue

## CSV Data Notes
- Line 44: SC-MOT-001 has missing Product line and Icon
- Lines 45-46: Malformed (count row)
- Solution: Filter courses where Icon is not empty
- Valid courses: 43

## Filter Counts (Updated Dec 3, 2025)
- **Delivery Type**:
  - Instructor-led: 13 courses
  - Self-paced: 34 courses
  - (Removed "Instructor-led & Self-paced" option)
- **Languages**:
  - English: 43 courses
  - French: 43 courses
  - Spanish: 24 courses
- **Certification**:
  - Yes: 21 courses
  - No: 22 courses
- **Level**:
  - Fundamentals: 37 courses
  - Advanced: 6 courses

## Assets Updated
- security-center-saas.svg: Updated icon (Dec 3, 2025)

## Deployment
- **Repository**: https://github.com/Light514/genetec-courses
- **Platform**: Vercel
- **Status**: Live and auto-deploying from main branch
