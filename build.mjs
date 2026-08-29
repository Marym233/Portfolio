/* ============================================================
   BUILD
   Reads content.json, fills in src/index.html, and copies the
   css / js / public folders into dist/.

   Run it with:  pnpm run build

   The steps live in build/:
     paths.js       where the folders are
     html.js        escaping + small template helpers
     icons.js       inline SVGs
     partials.js    markup shared by more than one section
     sections/      one file per {{slot}} in src/index.html
     render.js      content.json + template -> finished html
     assets.js      writing and copying into dist/
     checks.js      the "you forgot something" warnings
   ============================================================ */

import { readFile } from 'node:fs/promises';

import { CONTENT_FILE } from './build/paths.js';
import { renderPage } from './build/render.js';
import { resetDist, writePage, copyAssets } from './build/assets.js';
import { writeSeoFiles } from './build/seo.js';
import { runChecks } from './build/checks.js';

const content = JSON.parse(await readFile(CONTENT_FILE, 'utf8'));

const { html, leftover } = await renderPage(content);

await resetDist();
await writePage(html);
await copyAssets();
await writeSeoFiles(content);

// Checks run after the copy so they can look at what actually landed in dist/.
const warnings = runChecks(content, leftover);
for (const warning of warnings) {
  console.warn(`⚠️  ${warning}`);
}

/* On your own machine a warning is a nudge — a half-finished portfolio should
   still preview. In CI, and in a Cloudflare build, the same warning has to stop
   the build, otherwise a missing photo or a placeholder email reaches the live
   site. Both set CI=true, so one rule covers both. */
if (warnings.length && process.env.CI) {
  console.error(`\n✖ ${warnings.length} warning(s) above — refusing to build in CI.`);
  process.exit(1);
}

console.log('✅ Built dist/');
