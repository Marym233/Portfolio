/* Tiny helpers every section builder uses. */

/**
 * Makes text safe to drop into HTML, but leaves &amp; and friends alone,
 * so you can still type entities directly in content.json.
 */
export const esc = (s = '') =>
  String(s)
    .replace(/&(?!(#\d+|#x[\da-f]+|[a-z]+);)/gi, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Same thing, named for the place it's used: inside an attribute. */
export const attr = (s = '') => esc(s);

/** Renders a list and joins it. Keeps the section builders tidy. */
export const map = (list = [], fn) => list.map(fn).join('\n');

/** The eyebrow + heading pair that opens every section. */
export const sectionHead = (eyebrow, heading) => `
      <div class="sec-head reveal">
        <span class="eyebrow">${esc(eyebrow)}</span>
        <h2>${esc(heading)}</h2>
      </div>`;
