import {futureIntegrationTemplates} from '../src/support-states.mjs';
import {mkdir,writeFile,copyFile,cp} from 'node:fs/promises';
import {navbar,hero} from '../src/components.mjs';
import {narrative} from '../src/narrative.mjs';
import {liveTransition} from '../src/live-transition.mjs';
import {preparation} from '../src/preparation.mjs';
import {faq} from '../src/faq.mjs';
import {support} from '../src/support.mjs';
import {downloadClosing} from '../src/download-closing.mjs';
import {eventContext} from '../src/event-context.mjs';
import {keyboardControl} from '../src/keyboard-control.mjs';
import {resources} from '../src/resources.mjs';
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
const html = `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0b1017"><title>EventDeck — Todo tu evento. Bajo control.</title><meta name="description" content="Centralizá música, videos, imágenes, presentaciones y contenido web con EventDeck para Windows. Prepará y controlá tu evento desde una única interfaz."><link rel="icon" href="/assets/favicon.ico"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/narrative.css"><link rel="stylesheet" href="/live-transition.css"><link rel="stylesheet" href="/preparation.css"><link rel="stylesheet" href="/resources.css"><link rel="stylesheet" href="/keyboard-control.css"><link rel="stylesheet" href="/event-context.css"><link rel="stylesheet" href="/download-closing.css"><link rel="stylesheet" href="/faq.css"><link rel="stylesheet" href="/support.css"><script type="module" src="./support-integration.js"></script><script type="module" src="/support.js"></script><script type="module" src="/download-closing.js"></script><script type="module" src="/main.js"></script><script type="module" src="/live-transition.js"></script></head><body><a class="skip-link" href="#contenido">Saltar al contenido</a>${navbar()}${hero().replace('</main>',narrative()+liveTransition()+preparation()+resources()+keyboardControl()+eventContext()+downloadClosing()+faq()+support()+futureIntegrationTemplates()+'</main>')}</body></html>`;
// Portable output for GitHub Pages project subdirectories; external URLs and anchors unchanged.
await writeFile('dist/index.html', html.replace(/(src|href|poster|srcset)="\/(?!\/)/g, '$1="./').replace(/, \/assets\//g, ', ./assets/'));
for (const file of ['styles.css','narrative.css','main.js','live-transition.css','live-transition.js','preparation.css','resources.css','keyboard-control.css','event-context.css','download-closing.css','download-closing.js','faq.css','support.css','support.js','support-api.js','support-service.js','support-integration.js']) await copyFile('src/'+file,'dist/'+file);
console.log('Build estático completado: dist/');
