const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
function closeMenu() { toggle.setAttribute('aria-expanded','false'); navigation.classList.remove('is-open'); }
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape' && toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.nav')) closeMenu();});
const wide = matchMedia('(min-width: 960px)');
wide.addEventListener('change',closeMenu);
// Cerrar el menú sin cancelar la navegación nativa ni modificar el historial.
navigation.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button > 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  if (toggle.getAttribute('aria-expanded') !== 'true') return;
  closeMenu();
  const href = link.getAttribute('href');
  const target = href.startsWith('#') ? document.getElementById(href.slice(1)) : null;
  if (target) target.focus({preventScroll:true});
  else toggle.focus({preventScroll:true});
});
let noticeTimer;
document.querySelectorAll('[data-pending]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const notice=document.querySelector('.notice');notice.textContent=link.dataset.pending;notice.hidden=false;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>notice.hidden=true,5000);if(toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}}));
const header=document.querySelector('.site-header');
function updateHeader(){header.classList.toggle('scrolled',window.scrollY>12);}
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
