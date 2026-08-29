// Keeps the copyright year in the footer current.
export function initYear() {
  const el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
}
