/* Where everything lives. Change a folder name here, not in ten places. */

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
export const SRC = join(ROOT, 'src');
export const DIST = join(ROOT, 'dist');

export const CONTENT_FILE = join(ROOT, 'content.json');
export const TEMPLATE_FILE = join(SRC, 'index.html');
export const PUBLIC_DIR = join(SRC, 'public');

// Folders copied into dist/ as-is, keeping their name.
export const ASSET_DIRS = ['css', 'js'];
