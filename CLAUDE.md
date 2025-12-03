# Genetec Training Courses Directory - Agent Guide v1.0

## Critical Rules
- GREENFIELD PROJECT - building from scratch in genetec-courses/
- Match current-page.png aesthetic exactly
- NO ASSUMPTIONS - use only provided CSV/JSON data
- Font loading: MUST use next/font/local
- Animations: Subtle and professional
- Filter logic: Multi-select with AND across categories
- Language filter: INCLUDES logic (match courses containing language)

## Allowed Paths
- Code: genetec-courses/**
- Docs: docs/**, NOW.md, STACK.md, CLAUDE.md
- Assets: Copy from assets/ to genetec-courses/public/

## Tech Stack
- Next.js 14+ with App Router (NOT Pages Router)
- TypeScript (strict mode)
- Tailwind CSS (utility-first)
- Framer Motion (animations)
- papaparse (CSV parsing)
