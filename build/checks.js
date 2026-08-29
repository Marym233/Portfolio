/* Sanity checks. These warn; they never fail the build, so a half-finished
   portfolio still previews. Each check returns a message, or null if fine. */

import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { DIST } from './paths.js';

// Files the page links to. If you add a new asset field to content.json,
// list it here so a missing file gets caught at build time.
const linkedFiles = (content) => [
  content.site.cvFile,
  content.about.photo,
  ...content.projects.items.map((p) => p.image).filter(Boolean),
];

const missingAssets = (content) => {
  const missing = linkedFiles(content).filter((f) => !existsSync(join(DIST, f)));
  return missing.length ? `Missing from src/public/: ${missing.join(', ')}` : null;
};

const placeholderEmail = (content) =>
  content.site.email.includes('your@email.com')
    ? 'The email in content.json is still the placeholder.'
    : null;

const CHECKS = [missingAssets, placeholderEmail];

/** Runs every check plus the unfilled-slot warning from the render step. */
export const runChecks = (content, leftover = []) => {
  const warnings = CHECKS.map((check) => check(content)).filter(Boolean);

  if (leftover.length) {
    warnings.unshift(`Nothing to fill these in with: ${leftover.join(', ')}`);
  }

  return warnings;
};
