import { esc, map, sectionHead } from '../html.js';

const row = (i) => `
        <div class="edu-row">
          <div>
            <h3>${esc(i.title)}</h3>
            <div class="sub">${esc(i.sub)}</div>
          </div>
          <span class="when">${esc(i.when)}</span>
        </div>`;

export default ({ education: e }) => `
  <section id="education">
    <div class="wrap">
      ${sectionHead(e.eyebrow, e.heading)}
      <div class="reveal">
        ${map(e.items, row)}
      </div>
    </div>
  </section>`;
