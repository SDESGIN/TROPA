/* TROPA V24 — montagem do app completo a partir de 8 arquivos soltos para GitHub Web. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),crypto=require('node:crypto');
const root=__dirname,blobFile=path.join(root,'TROPA_V22_CONTEUDO.bin'),EXPECTED='548e08dcea07e2db5be2cc913fef633ddf8d53e1597626286a0625d89d6c9241';
function build(){
 if(!fs.existsSync(blobFile))throw Error('Falta TROPA_V22_CONTEUDO.bin: envie os OITO arquivos soltos ao GitHub.');
 const packed=fs.readFileSync(blobFile),sha=crypto.createHash('sha256').update(packed).digest('hex');
 if(sha!==EXPECTED)throw Error('Payload da TROPA V24 incompleto ou alterado. Refaça o upload dos 8 arquivos.');
 const archive=JSON.parse(zlib.gunzipSync(packed).toString('utf8'));
 if(archive.format!=='tropa-v24-flat-archive-v1'||archive.version!=='2.4.0')throw Error('Conteúdo da V24 incompatível.');
 let count=0,bytes=0;
 for(const [rel,b64] of Object.entries(archive.files)){
  const target=path.resolve(root,rel);
  if(!rel||rel.startsWith('/')||rel.includes('\\')||path.isAbsolute(rel)||target===root||!target.startsWith(root+path.sep))throw Error('Caminho bloqueado no pacote: '+rel);
  if(!/^[A-Za-z0-9+/]*={0,2}$/.test(b64))throw Error('Base64 inválido em '+rel);
  const content=Buffer.from(b64,'base64');
  fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,content);count++;bytes+=content.length;
 }
 for(const name of ['cloud/source/app.js','cloud/source/style.css','cloud/source/index.html','cloud/lib/forum.js','cloud/lib/reports.js','cloud/lib/actions.js','cloud/functions/api.js','cloud/firestore.rules','scripts/build-cloud.mjs'])
  if(!fs.existsSync(path.join(root,name)))throw Error('Falta arquivo obrigatório '+name);
 console.log(`TROPA V24: ${count} arquivos reconstruídos (${(bytes/1048576).toFixed(1)} MB), Firebase/LiveKit/Netlify sem credenciais embutidas.`);
}
try{build();}catch(e){console.error('TROPA V24 erro:',e.message);process.exitCode=1;}
