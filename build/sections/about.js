import { esc, attr, map, sectionHead } from '../html.js';

export default ({ about: a }) => `
  <section id="about">
    <div class="wrap">
      ${sectionHead(a.eyebrow, a.heading)}
      <div class="about__grid">
        <div class="portrait reveal">
          <img src="/${attr(a.photo)}" alt="${attr(a.photoAlt)}" width="800" height="1000" />
        </div>
        <div class="about__body reveal">
          <p class="lead">${esc(a.lead)}</p>
          ${map(a.paragraphs, (p) => `<p>${esc(p)}</p>`)}
          <dl class="facts">
            ${map(a.facts, (f) => `<div class="fact"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)}
          </dl>
        </div>
      </div>
    </div>
  </section>`;
