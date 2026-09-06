# مسلم بحق

An Arabic guide to Islamic character: understand a virtue or a thing to refuse, read
its evidence from the Qur'an and the two Sahihs, and try a practical action. Written in
clear Modern Standard Arabic for a broad age range. The name is an invitation to
self-improvement, not a judgment of anyone's faith.

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
npm run build:pages  # static export for GitHub Pages, prefixed with /true-muslim
npm start        # serve the production build locally
# In another terminal, set TEST_ORIGIN to that server URL:
TEST_ORIGIN=http://localhost:8787 npm run test:routes
```

`npm run verify:sources` re-collates every narration against the printed critical
edition it cites: the exact Arabic on the cited page, the printed number resolving to
that page, and the recorded باب matching the page's own heading. It needs network access,
so it is not part of `npm run check`; run it whenever a narration is added or its wording
changes. It finds the text *somewhere* on the page, so it cannot tell you that a quoted
span stays inside one narration or that an excerpt is labelled honestly — read the page.

## What is included

- Seventy-five lessons across seven relationships: with Allah, with oneself, with the
  tongue, with people, with family, with money and work, and with the world around us.
  Each has evidence, three suggested actions, a scenario, a reflection question,
  examples of harm to avoid, and a boundary. Roughly a fifth of the lessons are about
  something to refuse rather than something to do — major sins, backbiting, tale-bearing,
  mockery, false witness, wrongdoing, usury, cheating, squandering, intoxicants,
  gambling, omen-reading —
  because the guide covers both halves of the religion: what it commands and what it
  forbids.
- Arabic RTL pages set in self-hosted Noto Naskh Arabic, with Cairo headings and
  Amiri Quran for revelation; responsive layouts, keyboard focus, skip navigation,
  print styles, meaningful URLs and per-lesson metadata.
- Server-rendered reading and navigation, with no account, analytics, or piety scoring.
- A dedicated `/daleel` page with six foundational verses, a complete lesson evidence
  index, source methodology, explicit scope limits, and a way to report errors.
- A `/mujtanabat` page that gathers every lesson's examples of harm in one place, with
  the limits of such a list stated on the page: it is teaching material, not an
  exhaustive classification of the forbidden and not a verdict on anyone.

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
app/icon.svg            favicon; file-based so it picks up the Pages base path
public/                 notices and license texts
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
reference; the browser only receives those used. Narrations come from Sahih al-Bukhari
and Sahih Muslim and from nowhere else. The wording, narrator, number, kitab and bab
are read off the page of the printed critical edition — al-Tab'a al-Sultaniyya for
al-Bukhari and Muhammad Fu'ad Abd al-Baqi's for Muslim — and each record also carries a
Sunnah.com link so a reader can look the narration up. All of it lives in
`data/hadith.json`, short excerpts are labelled explicitly, and a quotation is never
edited to read better: no diacritics are added and no two narrations are joined. The
integrity checks protect source bytes and references; they do not substitute for
scholarly review.

This is an introductory collection, not a complete curriculum or a fatwa service.

## Deployment

The site is published to GitHub Pages at <https://edriso.github.io/true-muslim/>.
`.github/workflows/pages.yml` runs `npm run check`, then builds a static export and
uploads it; every route is prerendered, so Pages serves plain HTML with no server.

```sh
PAGES_BASE_PATH=/true-muslim npm run build:pages
```

`next.config.ts` switches to `output: 'export'` only when `PAGES_BASE_PATH` is set,
because Pages serves a project site under `/<repo>/` and every URL needs that prefix
baked in. The export writes the whole site to `dist/client/true-muslim/`, which is the
artifact root; `scripts/pages.mjs` then adds the 404 page and the `.nojekyll` marker
that stops Jekyll discarding every `_next/` asset.

Without that variable the build is unchanged and still targets a Cloudflare Worker
through Sites. `.openai/hosting.json` contains this project's non-secret Sites ID.
When copying the project, register your own Sites project rather than reusing this
project's ID. No hosting credential belongs in the repository.

See [verification notes](docs/verification.md) for completed checks and known limits.

Original code and editorial prose use [0BSD](LICENSE). Quran text, fonts, icons and
other third-party material keep the terms recorded in [NOTICE](NOTICE).
