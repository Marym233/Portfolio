import { esc } from '../html.js';
import { cvButton } from '../partials.js';

export default (content) => {
  const [first, second = ''] = content.hero.lines;
  const dot = content.hero.dot ? '<em>.</em>' : '';

  return `
  <section class="hero">
    <div class="wrap">
      <span class="eyebrow">${esc(content.hero.eyebrow)}</span>
      <h1>
        <span class="ln">${esc(first)}</span>
        <span class="ln">${esc(second)}${dot}</span>
      </h1>
      <div class="hero__foot">
        <p class="hero__role">${esc(content.hero.intro)}</p>
        <div class="hero__cta">
          ${cvButton(content)}
          <a class="btn btn--ghost" href="#projects">View projects</a>
        </div>
      </div>
    </div>
  </section>`;
};
