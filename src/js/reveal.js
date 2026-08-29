// Fades sections in as they scroll into view.
export function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // If the browser is old, or the person prefers less motion, show everything.
  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (noMotion || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = (i % 4) * 70 + 'ms';
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
}
