// Media enhancement only: no payment requests, URL parsing, storage or authorization.
const previews = [...document.querySelectorAll('.support-preview video')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function pauseAll(except) { previews.forEach(video => { if (video !== except) video.pause(); }); }
previews.forEach(video => {
  video.addEventListener('play', () => { video.muted = true; pauseAll(video); });
  video.addEventListener('volumechange', () => { if (!video.muted) video.muted = true; });
});
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseAll(); });
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) pauseAll(); });
// Never start or resume automatically, even when returning to the tab.
