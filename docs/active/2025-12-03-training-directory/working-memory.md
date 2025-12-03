# Working Memory: Genetec Training Courses Directory

**Session Started**: 2025-12-03

## Key Decisions

### State Management
- Use useState (not useReducer) - simple, sufficient for this use case

### Filter Logic
- AND logic across categories (course must match ALL)
- OR logic within category (course can match ANY)
- Language special case: INCLUDES logic (course languages contain selected language)

### CSV Parsing
- Use papaparse library (robust, handles edge cases)
- Filter out malformed rows (lines 44-46 in CSV)

### Font Loading
- Use next/font/local with OTF files in public/fonts/

### Load More
- Initial: 12 courses
- Increment: 12 per click
- Reset to 12 when filters change

## CSV Data Notes
- Line 44: SC-MOT-001 has missing Product line and Icon
- Lines 45-46: Malformed (count row)
- Solution: Filter courses where Icon is not empty
- Valid courses: 43

## Filter Counts
- English: 43 courses
- French: 43 courses
- Spanish: 24 courses
- Certification Yes: 21 courses
- Fundamentals: 37 courses
