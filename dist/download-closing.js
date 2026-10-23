const section = document.querySelector('.download-closing');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
if (section && !motion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    if (!motion.matches) section.classList.add('is-arriving');
    observer.disconnect();
  }, {threshold: 0.15});
  observer.observe(section.querySelector('.download-action'));
  motion.addEventListener('change', event => {
    if (event.matches) {
      section.classList.remove('is-arriving');
      observer.disconnect();
    }
  });
}
