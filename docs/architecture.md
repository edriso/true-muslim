# Architecture and delivery plan

## Product

An Arabic reading guide for most ages: choose a virtue, understand it, inspect its
source, and try an everyday action. No login, spirituality scores, or intrusive UI.
Ten short lessons form an introductory collection, not an exhaustive account of Islam.

## Structure

- app/: server-rendered home, lesson routes, methodology, and not-found page
- components/: reusable layout and evidence rendering
- content/lessons/: one JSON record per lesson, separate from presentation
- data/: pinned Qur'an corpus, hadith records, and source integrity manifest
- lib/: typed content access
- scripts/: offline content checks and generated Qur'an subset
- docs/: writing rules and architecture

The generated Sites scaffold uses React, TypeScript, and Vinext (Next-compatible
routes) with Vite. Retain its provided packages and lockfile; the app itself needs
only server components and CSS. Local Arabic fonts are packaged with the app.
No external religious API is called at runtime. All evidence is available offline
once the page has loaded; this is not a service-worker offline app.

## Milestones

1. Record editorial rules, source provenance, and project layout.
2. Build the reading experience and ten sourced lessons.
3. Enforce corpus, source record, and lesson validation; type-check and build.
4. Prepare deployment and document verification limitations.

A checksum detects accidental changes; it does not prove that editorial interpretation
is correct. Human review by a qualified person remains valuable before broad release.
