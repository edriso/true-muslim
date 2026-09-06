# Architecture and delivery plan

## Product

An Arabic reading guide for most ages: choose a virtue, understand it, inspect its
source, and try an everyday action. No login, spirituality scores, or intrusive UI.
Seventy-five short lessons form an introductory collection, not an exhaustive account
of Islam. They are grouped by relationship, and they cover both what to do and what to
refuse, because the Qur'an itself pairs the two.

## Structure

- app/: server-rendered home, lesson routes, methodology, dedicated evidence index,
  the gathered list of what to avoid, and the not-found page
- components/: reusable layout and evidence rendering
- content/lessons/: one JSON record per lesson, separate from presentation
- data/: pinned Qur'an corpus, hadith records, and source integrity manifest
- lib/: typed content access
- scripts/: offline content checks, the generated Qur'an subset, the shared Arabic
  folding, and the networked re-collation of narrations against their printed editions
- docs/: writing rules and architecture

The generated Sites scaffold uses React, TypeScript, and Vinext (Next-compatible
routes) with Vite. Retain its provided packages and lockfile; the app itself needs
only server components and CSS. Local Arabic fonts are packaged with the app:
Noto Naskh Arabic for reading, Cairo for headings, Amiri Quran for revelation.
No external religious API is called at runtime. All evidence is available offline
once the page has loaded; this is not a service-worker offline app.

## Milestones

1. Record editorial rules, source provenance, and project layout.
2. Build the reading experience and the sourced lessons.
3. Enforce corpus, source record, and lesson validation; type-check and build.
4. Prepare deployment and document verification limitations.
5. Publish to GitHub Pages as a fully prerendered static export.
6. Widen the collection to seven relationships and seventy-five lessons, adding the
   prohibitions the guide had only implied, and gather them on their own page.

Both build targets come from one codebase. `PAGES_BASE_PATH` turns on
`output: 'export'` and the `/true-muslim` prefix; without it the build is the
Cloudflare Worker. Every route is static, so nothing is lost in the export — there
are no API routes, no runtime data fetching, and the only client component is the
error boundary.

A checksum detects accidental changes; it does not prove that editorial interpretation
is correct. Human review by a qualified person remains valuable before broad release.
