import assert from 'node:assert/strict';
import {readFile,access,stat} from 'node:fs/promises';
import {support} from '../src/support.mjs';
import {supportStates} from '../src/support-states.mjs';
import {product} from '../src/config.mjs';
const html=await readFile('dist/index.html','utf8');
const section=support();
assert(html.includes(section.replace(/(src|href|poster|srcset)="\/(?!\/)/g, '$1="./')),'Sección presente en el build');
assert(html.indexOf('id="faq-title"')<html.indexOf('id="apoyar"'),'Apoyo después de FAQ');
assert.equal(Object.keys(supportStates).length,8);
assert.equal((section.match(/<template /g)||[]).length,8);
assert(section.includes('type="button" disabled aria-describedby="support-availability"'));
assert(!/<a\b/.test(section),'No enlaces de pago ni descarga de pack, ni siquiera ficticios');
assert(!/autoplay|\bloop\s*(?:=|>)/.test(section),'Sin reproducción automática o loop');
assert.equal((section.match(/<video controls muted playsinline preload="none"/g)||[]).length,4);
assert(section.includes('No necesitás colaborar para usar EventDeck.'));
assert.equal(product.downloadUrl,'https://github.com/Horacio1991/EventDeck/releases/download/v0.8.0/EventDeck-Setup-0.8.0.exe');
assert.equal(html.split(`href="${product.downloadUrl}"`).length-1,3,'Las tres descargas oficiales se mantienen');
const runtime=await readFile('src/support.js','utf8');
assert(!/fetch\s*\(|XMLHttpRequest|URLSearchParams|location\.|localStorage|sessionStorage|innerHTML|supportStates/.test(runtime),'Runtime solo para previews');
const css=await readFile('src/support.css','utf8');
assert(css.includes('prefers-reduced-motion'));assert(css.includes(':focus-within'));
assert(!/overflow-x\s*:\s*hidden/.test(css));
let total=0;
for(let i=1;i<=4;i++) {
  const video=`dist/assets/support/preview-${i}.mp4`;
  await access(`dist/assets/support/preview-${i}.webp`);
  const size=(await stat(video)).size;assert(size<1_000_000,'Preview individual < 1 MB');total+=size;
  const bytes=await readFile(video);const boxes=[];
  for(let offset=0;offset<bytes.length;) {
    assert(offset+8<=bytes.length,'Cabecera MP4 completa');
    const length=bytes.readUInt32BE(offset);assert(length>=8&&offset+length<=bytes.length,'Box MP4 completo');
    boxes.push(bytes.toString('ascii',offset+4,offset+8));offset+=length;
  }
  assert.equal(boxes[0],'ftyp');assert(boxes.includes('moov')&&boxes.includes('mdat'),'MP4 finalizado');
  assert(boxes.indexOf('moov')<boxes.indexOf('mdat'),'Fast start habilitado');
}
assert(total<3_000_000,'Previews combinados < 3 MB');
console.log('Hito 12 OK: previews manuales, estados inertes, CTA deshabilitado y descarga gratuita conservada.');
