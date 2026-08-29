/* ============================================================
   BUILD
   Reads content.json, fills in src/index.html, and copies the
   css / js / public folders into dist/.

   Run it with:  npm run build

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
import { runChecks } from './build/checks.js';

const content = JSON.parse(await readFile(CONTENT_FILE, 'utf8'));

const { html, leftover } = await renderPage(content);

await resetDist();
await writePage(html);
await copyAssets();

// Checks run after the copy so they can look at what actually landed in dist/.
for (const warning of runChecks(content, leftover)) {
  console.warn(`⚠️  ${warning}`);
}

console.log('✅ Built dist/');
