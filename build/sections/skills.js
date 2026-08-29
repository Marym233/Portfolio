import { esc, map, sectionHead } from '../html.js';

const tag = (t) => `<span class="tag${t.strong ? ' tag--solid' : ''}">${esc(t.label)}</span>`;

const column = (col) => `
        <div class="reveal">
          <h3>${esc(col.heading)}</h3>
          <div class="tags">
            ${map(col.tags, tag)}
          </div>
        </div>`;

export default ({ skills: s }) => `
  <section id="skills">
    <div class="wrap">
      ${sectionHead(s.eyebrow, s.heading)}
      <div class="skill-cols">
        ${map(s.columns, column)}
      </div>
    </div>
  </section>`;
