// Assembles the GitHub Pages artifact from a completed static export.
//
//   PAGES_BASE_PATH=/true-muslim npm run build:pages
//
// The export writes the whole site under `dist/client<basePath>/`, because every
// URL in the HTML already carries the prefix. GitHub Pages serves a project
// artifact at `https://<user>.github.io/<repo>/`, so that inner directory — not
// `dist/client` — is the artifact root. Two things still have to be added:
// the 404 page, which the export leaves outside the prefix, and `.nojekyll`,
// without which Pages runs Jekyll and drops every `_next/` asset.
import { copyFileSync, existsSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const basePath = process.env.PAGES_BASE_PATH ?? '';
assert.match(
  basePath,
  /^\/[a-z0-9-]+$/,
  'PAGES_BASE_PATH must be a single leading-slash segment, e.g. /true-muslim',
);

const client = 'dist/client';
const site = join(client, basePath.slice(1));
assert.ok(
  existsSync(join(site, 'index.html')),
  `No export found at ${site}. Run the build with the same PAGES_BASE_PATH first.`,
);

// Pages serves this for any unmatched path under the project prefix.
const notFound = join(client, '404.html');
assert.ok(existsSync(notFound), 'The export produced no 404.html');
copyFileSync(notFound, join(site, '404.html'));

writeFileSync(join(site, '.nojekyll'), '');

const pages = readdirSync(site, { recursive: true }).filter((f) =>
  String(f).endsWith('.html'),
);
console.log(`Pages artifact ready at ${site} — ${pages.length} HTML files.`);
