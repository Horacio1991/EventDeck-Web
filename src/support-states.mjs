// Build-time copy/templates only. Nothing here authorizes a payment or creates a URL.
// Future integration must obtain state AND download capability from the backend.
export const supportStates = Object.freeze({
  verifying: {title:'Estamos verificando tu colaboración…', text:'La confirmación puede demorar unos momentos. Podés volver a consultar el estado.'},
  confirmed: {title:'¡Gracias por apoyar EventDeck!', text:'Tu Visual Pack de cortesía está listo.'},
  authorized: {title:'Tu Visual Pack de cortesía está listo.', text:'Gracias por ayudar a que EventDeck siga creciendo.', action:'DESCARGAR VISUAL PACK'},
  downloadStarted: {title:'Descarga iniciada.', text:'Revisá las descargas de tu navegador.'},
  expired: {title:'El enlace de descarga venció.', text:'Podés solicitar un nuevo enlace. Se volverá a verificar tu acceso.', action:'SOLICITAR NUEVO ENLACE'},
  pending: {title:'Tu colaboración está pendiente.', text:'La descarga estará disponible cuando se confirme tu colaboración.'},
  temporaryError: {title:'No pudimos consultar el estado.', text:'Ocurrió un error temporal. Intentá nuevamente en unos momentos.', action:'CONSULTAR ESTADO'},
  unavailable: {title:'El Visual Pack no está disponible en este momento.', text:'No podemos ofrecer la descarga ahora. Intentá nuevamente más tarde.'},
});
export function supportStateTemplates() {
  return Object.entries(supportStates).map(([state,copy])=>`<template id="support-state-${state}"><div class="support-state" role="status" aria-live="polite" aria-atomic="true"><h3>${copy.title}</h3><p>${copy.text}</p>${copy.action?`<button class="button secondary" type="button" disabled>${copy.action}</button>`:''}</div></template>`).join('');
}
