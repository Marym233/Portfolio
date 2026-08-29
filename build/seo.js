/* robots.txt, sitemap.xml and site.webmanifest.

   These three all need the site's domain, and the manifest also needs the
   brand colour. Generating them from content.json means the domain is written
   once, in content.json, instead of being copy-pasted into several files that
   then drift apart. */

import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { DIST } from './paths.js';

/** Trailing slashes cause duplicate-URL warnings, so normalise once here. */
const origin = (content) => content.site.url.replace(/\/+$/, '');

const robots = (content) => `User-agent: *
Allow: /

Sitemap: ${origin(content)}/sitemap.xml
`;

// Only pages that actually exist belong here — a sitemap listing a missing
// page is a crawl error rather than a help.
const sitemap = (content) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin(content)}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const manifest = (content) =>
  JSON.stringify(
    {
      name: content.site.name,
      short_name: content.site.logo,
      description: content.site.description,
      start_url: '/',
      display: 'standalone',
      background_color: '#f4f1de',
      theme_color: content.site.themeColor,
      icons: [
        { src: '/assets/img/favicon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/favicon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/assets/img/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      ],
    },
    null,
    2,
  ) + '\n';

export const writeSeoFiles = async (content) => {
  await writeFile(join(DIST, 'robots.txt'), robots(content));
  await writeFile(join(DIST, 'sitemap.xml'), sitemap(content));
  await writeFile(join(DIST, 'site.webmanifest'), manifest(content));
};
