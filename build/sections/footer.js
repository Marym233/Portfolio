import { esc } from '../html.js';

export default (content) => `
<footer>
  <div class="wrap foot-row">
    <span>&copy; <span id="yr">${new Date().getFullYear()}</span> ${esc(content.site.name)}</span>
    <span>${esc(content.site.location)}</span>
  </div>
</footer>`;
