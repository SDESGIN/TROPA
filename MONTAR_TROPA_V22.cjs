/*
 * TROPA V22 — preparador para GitHub sem subpastas.
 * Este arquivo reconstitui o código original no momento do build da Netlify.
 * Sem npm extra, sem credenciais e sem necessidade de executar no seu PC.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const crypto = require('node:crypto');
const expectedHash = '0cfb6ec41eba051e25a851e401791a11eee3f05696c6bec203374b419776295a';
const payloadFile = path.join(__dirname, 'TROPA_V22_CONTEUDO.bin');
const root = __dirname;
function run() {
  if (!fs.existsSync(payloadFile)) throw new Error('Arquivo TROPA_V22_CONTEUDO.bin nao encontrado. Envie TODOS os arquivos soltos ao GitHub.');
  const packed = fs.readFileSync(payloadFile);
  const hash = crypto.createHash('sha256').update(packed).digest('hex');
  if (hash !== expectedHash) throw new Error('Arquivo compactado alterado ou incompleto. Faca download do ZIP novamente.');
  const data = JSON.parse(zlib.gunzipSync(packed).toString('utf8'));
  if (data.format !== 'tropa-v22-flat-archive-v1') throw new Error('Formato do pacote desconhecido.');
  let count = 0, bytes = 0;
  for (const [rel, base64] of Object.entries(data.files)) {
    const dest = path.resolve(root, rel);
    if (rel.includes('\\') || rel.startsWith('/') || path.isAbsolute(rel) || dest === root || !dest.startsWith(root + path.sep)) throw new Error('Caminho inseguro no pacote: ' + rel);
    const buffer = Buffer.from(base64, 'base64');
    fs.mkdirSync(path.dirname(dest), {recursive:true});
    fs.writeFileSync(dest, buffer);
    count++;bytes+=buffer.length;
  }
  for (const filename of ['cloud/source/index.html','cloud/source/app.js','cloud/functions/api.js','cloud/lib/actions.js','cloud/firestore.rules','scripts/build-cloud.mjs']) {
    if (!fs.existsSync(path.join(root,filename))) throw new Error('Falta arquivo obrigatorio: '+filename);
  }
  console.log(`TROPA V22: ${count} arquivos recompostos (${(bytes/1048576).toFixed(1)} MB).`);
  console.log('Pastas cloud/functions, cloud/source e assets prontas para build Netlify.');
}
try { run(); } catch(e) { console.error('Erro ao preparar o TROPA V22:',e.message);process.exitCode=1; }
