import {product} from './config.mjs';
const questions = [
 ['¿EventDeck necesita conexión a Internet?', 'No para trabajar con contenido local. Podés utilizar imágenes, videos, audio y otros recursos almacenados en tu computadora sin conexión. El acceso a Internet solo es necesario cuando utilizás contenido o páginas web que naturalmente dependen de una conexión.'],
 ['¿Necesito una segunda pantalla?', 'Para utilizar PROGRAM como salida pública necesitás una segunda pantalla, TV o proyector conectado a la computadora. EventDeck mantiene la interfaz de operación en tu pantalla principal y utiliza la salida seleccionada para mostrar el contenido al público.'],
 ['¿Qué pasa si se desconecta el HDMI durante el evento?', 'EventDeck protege la pantalla del operador y suspende la salida pública sin cerrar la reproducción en curso. Si el mismo display vuelve a estar disponible y puede identificarse de forma segura, PROGRAM recupera la salida sin obligarte a reconstruir la escena.'],
 ['¿Puedo preparar el evento con anticipación?', 'Sí. Podés organizar tus recursos, pestañas y escenas antes del evento y dejar preparada la operación para abrirla cuando llegue el momento. La idea es resolver durante la preparación todo lo que no debería convertirse en una decisión durante el vivo.'],
 ['¿Qué versión de Windows necesito?', 'EventDeck está preparado para Windows 10 y Windows 11 de 64 bits.'],
 ['¿Necesito instalar .NET?', `No. El instalador oficial de EventDeck v${product.version} incluye lo necesario para ejecutar la aplicación, por lo que no necesitás instalar .NET por separado.`],
 ['¿Por qué Windows puede mostrar una advertencia de SmartScreen?', 'EventDeck todavía no cuenta con una firma digital de código, por lo que Windows puede identificar el instalador como proveniente de un editor desconocido y mostrar una advertencia de SmartScreen.'],
 ['¿EventDeck es gratis?', 'Sí. EventDeck puede descargarse y utilizarse de forma gratuita.'],
];
export function faq() {
 return `<section class="story-section event-faq container" aria-labelledby="faq-title"><header class="faq-heading"><p class="story-kicker">ANTES DE EMPEZAR</p><h2 id="faq-title">Algunas cosas que quizás quieras saber.</h2><p class="story-text">Lo esencial sobre instalación, pantallas y funcionamiento de EventDeck.</p></header><div class="faq-list">${questions.map(([question,answer])=>`<details class="faq-item"><summary><span>${question}</span><span class="faq-indicator" aria-hidden="true"><span class="faq-plus">+</span><span class="faq-minus">−</span></span></summary><div class="faq-answer"><p>${answer}</p></div></details>`).join('')}</div></section>`;
}
