# مسلم بحق

A small Arabic guide to Islamic character: understand a virtue, read its evidence,
and try a practical action. Written in clear Modern Standard Arabic for a broad age
range. The name is an invitation to self-improvement, not a judgment of anyone's faith.

## Start

Node.js 22.13 or newer and npm are required. No API keys, database, or environment
variables are needed.

```sh
npm ci
npm run dev
```

Open the local address printed by the server (normally http://localhost:3000).

```sh
npm run check    # source integrity, content tests, TypeScript, lint
npm run build    # validate content and make the production Worker
npm start        # serve the production build locally
# In another terminal, set TEST_ORIGIN to that server URL:
TEST_ORIGIN=http://localhost:8787 npm run test:routes
```

`npm run verify:sources` re-collates every narration against the printed critical
edition it cites. It needs network access, so it is not part of `npm run check`;
run it whenever a narration is added or its wording changes.

## What is included

- Twenty-six lessons across five relationships: with Allah, with people, with family,
  with oneself, and with the world around us. Each has evidence, three suggested
  actions, a scenario, a reflection question, examples of harm to avoid, and a boundary.
- Arabic RTL pages set in self-hosted Noto Naskh Arabic, with Reem Kufi headings and
  Amiri Quran for revelation; responsive layouts, keyboard focus, skip navigation,
  print styles, meaningful URLs and per-lesson metadata.
- Server-rendered reading and navigation, with no account, analytics, or piety scoring.
- A dedicated `/daleel` page with foundational verses, a complete lesson evidence index,
  source methodology, explicit scope limits, and a way to report errors.

## Layout

```text
app/                    routes, layout, stylesheet, error pages
components/content/     Quran and hadith presentation
components/layout/      shared header and footer
content/lessons/         one editable JSON record per lesson
content/*.generated.json  generated automatically; never edit
lib/                    typed content access and UI utility
scripts/                source validation, focused tests, source re-collation
data/                   pinned Quran corpus, hadith and integrity records
docs/                   editorial rules, architecture, verification notes
public/                 favicon, notices and license texts
.github/workflows/      checks on pushes and pull requests
```

This uses the Sites scaffold: React, strict TypeScript, Vinext and Vite. The supplied
shadcn configuration remains available for future components; unused starter component
files were removed. The reading UI uses custom CSS and Lucide icons. Build dependencies
are retained in the lockfile, with security fixes applied to the scaffold versions.

## Content is the core

Read [AGENTS.md](AGENTS.md) and [the content policy](docs/content-policy.md) before
editing. `CLAUDE.md` points to the same rules so instructions cannot drift.

To add a lesson, add a JSON file under `content/lessons/` following a neighbouring
record. Give it a unique slug and order, and use a category from `content/guide.json`.
If it needs a new narration, collate that narration against the printed edition first,
record its كتاب, باب and edition page, run `npm run verify:sources`, and only then
update the integrity digest deliberately. `npm run content:build` discovers the lesson;
no route or component edit is needed.

Quran text comes from the unmodified, checksum-pinned Tanzil corpus used by
[learn-tajweed](https://github.com/edriso/learn-tajweed). Verses are resolved by numeric
reference; the browser only receives those used. Hadith excerpts come from specific
pages of Sahih al-Bukhari and Sahih Muslim on Sunnah.com, then collated against the
printed critical editions — al-Tab'a al-Sultaniyya for al-Bukhari and Muhammad Fu'ad
Abd al-Baqi's for Muslim — which is where the recorded wording, narrator, number,
kitab and bab come from. All of it lives in `data/hadith.json`, and short excerpts are
labelled explicitly. The integrity checks protect source bytes and references; they do
not substitute for scholarly review.

This is an introductory collection, not a complete curriculum or a fatwa service.

## Deployment

The production build targets a Cloudflare Worker through Sites. `.openai/hosting.json`
contains this project's non-secret Sites ID. GitHub Actions runs validation only; it
does not publish to GitHub Pages or another public audience. The GitHub origin is
preserved. When copying the project, register your own Sites project rather than
reusing this project's ID. No hosting credential belongs in the repository.

See [verification notes](docs/verification.md) for completed checks and known limits.

Original code and editorial prose use [0BSD](LICENSE). Quran text, fonts, icons and
other third-party material keep the terms recorded in [NOTICE](NOTICE).
