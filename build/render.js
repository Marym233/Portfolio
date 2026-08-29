/* Turns content.json + src/index.html into the finished page. */

import { readFile } from 'node:fs/promises';

import { TEMPLATE_FILE } from './paths.js';
import { esc, attr } from './html.js';
import { sections } from './sections/index.js';

/** Everything that can fill a {{slot}}: the head values plus every section. */
const buildSlots = (content) => {
  const slots = {
    pageTitle: esc(content.site.pageTitle),
    description: esc(content.site.description),
    url: attr(content.site.url),
  };

  for (const [name, render] of Object.entries(sections)) {
    slots[name] = render(content);
  }

  return slots;
};

export const renderPage = async (content) => {
  let html = await readFile(TEMPLATE_FILE, 'utf8');

  for (const [key, value] of Object.entries(buildSlots(content))) {
    html = html.replaceAll(`{{${key}}}`, value);
  }

  // A {{slot}} left in the output means the template asks for something
  // no section provides — usually a typo in one name or the other.
  const leftover = html.match(/\{\{(\w+)\}\}/g);

  return { html, leftover: leftover ?? [] };
};
