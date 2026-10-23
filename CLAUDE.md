@AGENTS.md

## CSS scoping

- `src/app/globals.css` is imported by the root layout, so it applies to EVERY route.
- Never add generic class names (`.card`, `.tag`, `.badge`, `.btn`) or bare element rules to `globals.css` without checking existing components for the same names. Give classes specific names (`milestone`, `talk-feature`) or scope them under a section class.
- After any change to `globals.css`, check the home page still looks right at desktop and mobile widths.

## Conventions

- Strict TDD: write the failing Vitest test first. `*.test.ts` run in node, `*.test.tsx` in jsdom.
- Page content lives in `src/data/` (typed) and components in `src/components/landing/`.
- Static assets (images, PDFs) live in `public/`.
