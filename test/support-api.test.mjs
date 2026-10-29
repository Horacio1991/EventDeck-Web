import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createSupportClient,parsePublicConfig,SUPPORT_API_BASE} from '../src/support-api.js';
import {createSupportService,mountSupportService} from '../src/support-service.js';
const valid={ready:true,testMode:true,amount:1000,currency:'ARS'};
const response=(body=valid,status=200,type='application/json')=>new Response(typeof body==='string'?body:JSON.stringify(body),{status,headers:{'Content-Type':type}});
const client=(fn,timeoutMs=100)=>createSupportClient({fetchImpl:fn,timeoutMs});
test('GET config centralizado sin cookies, cache, referrer ni redirects',async()=>{
 let seen;const c=client(async(...args)=>{seen=args;return response();});assert.deepEqual(await c.getConfig(),valid);
 assert.equal(seen[0],SUPPORT_API_BASE+'/api/support/config');const o=seen[1];assert.equal(o.method,'GET');assert.equal(o.credentials,'omit');assert.equal(o.cache,'no-store');assert.equal(o.redirect,'error');assert.equal(o.referrerPolicy,'no-referrer');assert.equal(o.mode,'cors');
});
for(const status of [403,404,429,500,503])test(`HTTP ${status} controlado`,async()=>assert.rejects(client(async()=>response({},status)).getConfig(),{code:'HTTP_ERROR'}));
test('JSON inválido',async()=>assert.rejects(client(async()=>response('{')).getConfig(),{code:'INVALID_JSON'}));
test('HTML de proxy no se interpreta como config',async()=>assert.rejects(client(async()=>response('<html>',200,'text/html')).getConfig(),{code:'INVALID_JSON'}));
for(const value of [null,[],{}, {...valid,ready:'true'},{...valid,testMode:1},{...valid,amount:-1},{...valid,currency:'<script>'}])test(`esquema inválido ${JSON.stringify(value)}`,()=>assert.throws(()=>parsePublicConfig(value),{code:'INVALID_CONFIG'}));
test('config no concede autorizaciones adicionales',()=>assert.deepEqual(parsePublicConfig({...valid,approved:true,entitlement:true,downloadUrl:'https://evil.test'}),valid));
test('error de red/CORS seguro',async()=>assert.rejects(client(async()=>{throw Error('private upstream detail');}).getConfig(),{code:'NETWORK_ERROR',message:'NETWORK_ERROR'}));
test('timeout aborta fetch',async()=>{let signal;await assert.rejects(client(async(_,o)=>{signal=o.signal;return new Promise(()=>{});},10).getConfig(),{code:'TIMEOUT'});assert(signal.aborted);});
test('timeout también cubre cuerpo JSON lento',async()=>assert.rejects(client(async()=>({ok:true,headers:new Headers({'content-type':'application/json'}),json:()=>new Promise(()=>{})}),10).getConfig(),{code:'TIMEOUT'}));
for(const [ready,state] of [[true,'available'],[false,'unavailable']])test(`UI config ready=${ready}`,async()=>{const states=[];await createSupportService({client:client(async()=>response({...valid,ready})),render:s=>states.push(s)}).refresh();assert.deepEqual(states,['loading',state]);});
test('UI error recuperable y retry exitoso',async()=>{let calls=0;const states=[];const s=createSupportService({client:client(async()=>{if(!calls++)throw Error();return response();}),render:x=>states.push(x)});await s.refresh();await s.refresh();assert.deepEqual(states,['loading','error','loading','available']);});
test('no consultas concurrentes ni polling',async()=>{let resolve,calls=0;const s=createSupportService({client:{getConfig:()=>{calls++;return new Promise(r=>resolve=r);}},render:()=>{}});const first=s.refresh();await s.refresh();assert.equal(calls,1);resolve(valid);await first;});
test('montaje muestra error y retry real sin tocar CTA',async()=>{
 const original=globalThis.fetch;let listener,calls=0;
 globalThis.fetch=async()=>{if(!calls++)throw Error();return response();};
 const message={textContent:''};const retry={hidden:true,disabled:false,addEventListener(_,fn){listener=fn;}};
 const root={dataset:{},querySelector:s=>s.includes('message')?message:retry,setAttribute(){}};
 try {mountSupportService(root);await new Promise(r=>setTimeout(r,0));assert.equal(root.dataset.serviceState,'error');assert.equal(retry.hidden,false);listener();await new Promise(r=>setTimeout(r,0));assert.equal(root.dataset.serviceState,'available');assert.equal(retry.hidden,true);}finally{globalThis.fetch=original;}
});
test('build conserva bloqueo y no expone enlaces de pack',async()=>{const html=await readFile('dist/index.html','utf8');assert.match(html,/class="button support-cta" type="button" disabled/);assert(!/href="[^\"]*(?:api\/downloads|download-token)/.test(html));assert.equal((html.match(/EventDeck-Setup-0\.8\.0\.exe/g)||[]).length,3);});
test('runtime no lee URL, storage ni crea estados autorizados',async()=>{for(const name of ['support-api.js','support-service.js','support-integration.js']){const s=await readFile('dist/'+name,'utf8');assert(!/URLSearchParams|location\.|localStorage|sessionStorage|innerHTML|create-checkout|download-token/.test(s));} });
test('assets y módulos resuelven bajo subcarpeta GitHub Pages',async()=>{const html=await readFile('dist/index.html','utf8');for(const m of html.matchAll(/(?:src|href|poster)="(\.\/[^"#]+)"/g)){assert(new URL(m[1],'https://example.test/EventDeck/').pathname.startsWith('/EventDeck/'));await readFile('dist/'+m[1]);}assert(!/(?:src|href|poster|srcset)="\/(?!\/)/.test(html));});
