import { esc, map, sectionHead } from '../html.js';

const job = (j) => `
        <div class="job reveal">
          <span class="job__when">${esc(j.when)}</span>
          <h3>${esc(j.role)}</h3>
          <div class="job__org">${esc(j.org)}</div>
          <div class="job__meta">${esc(j.meta)}</div>
          <p>${esc(j.summary)}</p>
        </div>`;

export default ({ experience: e }) => `
  <section id="experience">
    <div class="wrap">
      ${sectionHead(e.eyebrow, e.heading)}
      <div class="timeline">
        ${map(e.jobs, job)}
      </div>
    </div>
  </section>`;
