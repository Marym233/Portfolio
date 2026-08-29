/* The section registry.

   Each key here is a {{slot}} in src/index.html, and each value is the
   function that fills it.

   To add a section:
     1. make build/sections/<name>.js exporting `default (content) => html`
     2. add it to the list below
     3. drop {{<name>}} into src/index.html where it should appear

   Order in this file doesn't matter — src/index.html decides the page order. */

import header from './header.js';
import hero from './hero.js';
import about from './about.js';
import experience from './experience.js';
import projects from './projects.js';
import skills from './skills.js';
import education from './education.js';
import contact from './contact.js';
import footer from './footer.js';

export const sections = {
  header,
  hero,
  about,
  experience,
  projects,
  skills,
  education,
  contact,
  footer,
};
