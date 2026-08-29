import { esc, attr, map } from '../html.js';
import { cvButton } from '../partials.js';

export default (content) => `
<header class="site-header">
  <div class="wrap nav">
    <a class="nav__mark" href="#top">${esc(content.site.logo)}<span>.</span></a>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-links">Menu</button>
    <nav class="nav__links" id="nav-links">
      ${map(content.nav, (l) => `<a href="${attr(l.href)}">${esc(l.label)}</a>`)}
      ${cvButton(content)}
    </nav>
  </div>
</header>`;
