import './build.mjs';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');
// Optional preview arguments; local defaults remain 127.0.0.1:3000.
const args=process.argv.slice(2);
const option=(name,fallback)=>{const index=args.indexOf(name);return index<0?fallback:args[index+1];};
const host=option('--host','127.0.0.1');
const port=Number(option('--port','3000'));
if(!host||!Number.isInteger(port)||port<1||port>65535) throw new Error('Host/puerto de preview inválido.');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon','.mp4':'video/mp4'};
createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}const body=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end('No encontrado');}}).listen(port,host,()=>console.log(`EventDeck: http://${host}:${port} — después de editar, reiniciá npm run dev.`));
