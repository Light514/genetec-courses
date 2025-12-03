# Spec: Genetec Training Courses Directory

**Objective**: Build filterable training courses directory with 43 courses, 7 filters, search, responsive grid

**Scope**:
- In: List page, filtering, search, load more, animations
- Out: Course detail pages, authentication, backend

**Critical Files**:
- genetec-courses/app/page.tsx (main page)
- genetec-courses/lib/filterCourses.ts (filter algorithm)
- genetec-courses/lib/types.ts (TypeScript interfaces)
- genetec-courses/components/FilterBar.tsx (7 filters)

**Proof**:
```bash
cd genetec-courses
npm run dev
# Expected: 43 courses, all filters work, responsive design
```

**Risk**: Low (greenfield)
**Time**: 2-3 days
