/* Bits of markup shared by more than one section. */

import { attr } from './html.js';
import { icons } from './icons.js';

export const cvButton = (content, extraClass = '') =>
  `<a class="btn ${extraClass}" href="/${attr(content.site.cvFile)}" download>
          Download CV
          ${icons.download}
        </a>`;
