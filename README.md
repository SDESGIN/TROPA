# TROPA V24 — ATUALIZAÇÃO GITHUB SEM SUBPASTAS

1. Faça backup do repositório antes de substituir qualquer arquivo. **Não apague o Firebase, o LiveKit nem a Netlify já existentes**.
2. Firebase > Firestore Database > Rules: publique o conteúdo do `REGRAS_FIRESTORE_V221.txt` da V24. As novas regras liberam **leitura de fóruns a membros** e negam leitura direta de denúncias.
3. No MESMO repositório GitHub conectado à Netlify, `main` > Add file > Upload files: escolha todos os **8 arquivos soltos** extraídos deste ZIP, substituindo os nomes antigos. Se o GitHub recusar upload por nome já existente, atualize por commit; não apague o projeto.
4. Os nomes `MONTAR_TROPA_V22.cjs` e `TROPA_V22_CONTEUDO.bin` foram mantidos PARA SUBSTITUIR a versão antiga; o conteúdo é V24.
5. Netlify: build `npm run build:cloud`, publish `cloud/site`, functions `cloud/functions`, base vazio. A Netlify reconstrói as pastas automaticamente no build.
6. Preserve as variáveis Firebase, LiveKit e origem do site. Para 20 pessoas, `TROPA_MAX_ACCOUNTS=20`; para abrir ao público, mude o limite com cautela e monitorando cotas. `TROPA_SIGNUP_CODE` permanece desnecessário. `TROPA_REGISTRATION_OPEN=false` fecha novas inscrições.
7. Confirme sucesso em Deploys; cheque `/api/health` versão `2.4.0`; abra a conta anterior, teste fóruns, denúncias com moderador, chats, amizades, DM, voz, tela grande, câmera, minimizar e publicar mensagens ao mesmo tempo.
8. **Não inclua segredos do Firebase Admin ou LiveKit no GitHub. As credenciais expostas anteriormente devem ser rotacionadas/revogadas.**

Testes Node e Chromium estático foram feitos, mas não demonstram chamada real 20 pessoas, segurança auditada nem deploy Netlify na sua conta. A V24 não entrega as 35 seções completas, consulte `docs/ESCOPO_35_SECOES_V24.md` após a reconstrução.

Hash SHA256 do payload: 548e08dcea07e2db5be2cc913fef633ddf8d53e1597626286a0625d89d6c9241
