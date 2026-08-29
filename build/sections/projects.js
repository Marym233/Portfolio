import { esc, attr, map, sectionHead } from '../html.js';
import { icons } from '../icons.js';

// No image yet? Show the placeholder label instead of a broken <img>.
const thumb = (item) =>
  item.image
    ? `<img src="/${attr(item.image)}" alt="${attr(item.imageAlt || item.name)}" loading="lazy" width="800" height="550" />`
    : `<div class="card__placeholder">${esc(item.placeholder || 'In progress')}</div>`;

const card = (item) => {
  const link = item.url
    ? `href="${attr(item.url)}" target="_blank" rel="noopener"`
    : 'aria-disabled="true"';

  return `
        <a class="card reveal" ${link}>
          <div class="card__thumb">${thumb(item)}</div>
          <div class="card__body">
            <div>
              <h3>${esc(item.name)}</h3>
              <p>${esc(item.summary)}</p>
            </div>
            <span class="card__meta">${esc(item.type)}<br />${esc(item.year)}
              ${icons.arrow}
            </span>
          </div>
        </a>`;
};

export default ({ projects: p }) => `
  <section id="projects">
    <div class="wrap">
      ${sectionHead(p.eyebrow, p.heading)}
      <div class="work-grid">
        ${map(p.items, card)}
      </div>
    </div>
  </section>`;
