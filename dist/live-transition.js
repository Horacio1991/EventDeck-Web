// Progressive enhancement: la información está completa en el HTML estático.
const section = document.querySelector('.live-transition');
if (section) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const demo = section.querySelector('[data-transition-demo]');
  let observer;
  let played = false;
  function configure() {
    observer?.disconnect();
    if (motion.matches) {
      section.classList.remove('is-playing');
      return;
    }
    if (played || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.5)) {
        played = true;
        section.classList.add('is-playing');
        observer.disconnect();
      }
    }, {threshold: 0.5});
    observer.observe(demo);
  }
  motion.addEventListener('change', configure);
  configure();
}
