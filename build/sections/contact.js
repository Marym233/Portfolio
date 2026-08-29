import { esc, attr, map, sectionHead } from '../html.js';
import { icon } from '../icons.js';

const social = (r) => {
  const external = r.url.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
  return `<a class="social" href="${attr(r.url)}"${external}>
            <span>${esc(r.label)}</span>
            ${icon(r.icon)}
          </a>`;
};

export default (content) => {
  const c = content.contact;
  const email = content.site.email;

  // Email is always first; the rest come from content.json.
  const rows = [{ label: 'Email', url: `mailto:${email}`, icon: 'email' }, ...c.socials];

  return `
  <section id="contact">
    <div class="wrap">
      ${sectionHead(c.eyebrow, c.heading)}
      <div class="contact">
        <p class="contact__big reveal">${esc(c.big)}<br /><a href="mailto:${attr(email)}">${esc(c.linkText)}</a></p>
        <div class="socials reveal">
          ${map(rows, social)}
        </div>
      </div>
    </div>
  </section>`;
};
