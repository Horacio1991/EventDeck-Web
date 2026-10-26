import {createSupportClient} from './support-api.js';
export const serviceMessages = Object.freeze({
  loading:'Consultando disponibilidad del servicio de apoyo…',
  available:'Servicio de apoyo disponible. Las colaboraciones todavía no están habilitadas.',
  unavailable:'El servicio de apoyo está temporalmente no disponible. Podés seguir usando y descargando EventDeck gratis.',
  error:'No pudimos consultar el servicio de apoyo. Podés volver a intentarlo; la descarga gratuita sigue disponible.',
});
// This controller has no checkout, payment status, entitlement or download transition.
// A future return adapter must query an authenticated backend contract; URL outcomes are not evidence.
export function createSupportService({client = createSupportClient(), render}) {
  let pending = false;
  return Object.freeze({async refresh() {
    if (pending) return;
    pending = true;
    render('loading');
    try { const config = await client.getConfig(); render(config.ready ? 'available' : 'unavailable'); }
    catch { render('error'); }
    finally { pending = false; }
  }});
}
export function mountSupportService(root) {
  if (!root) return;
  const message = root.querySelector('[data-support-service-message]');
  const retry = root.querySelector('[data-support-service-retry]');
  if (!message || !retry) return;
  const service = createSupportService({render(state) {
    message.textContent = serviceMessages[state];
    root.dataset.serviceState = state;
    retry.hidden = !['error','unavailable'].includes(state);
    retry.disabled = state === 'loading';
    root.setAttribute('aria-busy', String(state === 'loading'));
  }});
  retry.addEventListener('click', () => { void service.refresh(); });
  void service.refresh();
}
