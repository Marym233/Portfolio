/* Everything that touches dist/. */

import { writeFile, readdir, rm, mkdir, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { SRC, DIST, PUBLIC_DIR, ASSET_DIRS } from './paths.js';

/**
 * Start from an empty dist/ so deleted files don't linger between builds.
 *
 * We empty the folder rather than deleting it: while `npm start` is running,
 * wrangler holds an open handle to dist/, and on Windows that makes removing
 * the folder itself fail with EBUSY. Clearing the contents leaves that handle
 * valid, so a rebuild refreshes the running preview instead of crashing.
 */
export const resetDist = async () => {
  await mkdir(DIST, { recursive: true });

  for (const entry of await readdir(DIST)) {
    // Retries ride out a virus scanner or indexer holding a file for a moment.
    await rm(join(DIST, entry), {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100,
    });
  }
};

export const writePage = (html) => writeFile(join(DIST, 'index.html'), html);

/** css/ and js/ keep their folder; public/ is flattened into the site root. */
export const copyAssets = async () => {
  for (const dir of ASSET_DIRS) {
    await cp(join(SRC, dir), join(DIST, dir), { recursive: true });
  }

  if (existsSync(PUBLIC_DIR)) {
    await cp(PUBLIC_DIR, DIST, { recursive: true });
  }
};
