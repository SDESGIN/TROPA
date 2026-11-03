# TROPA V22 — EDICAO PARA GITHUB SEM SUBPASTAS

Este projeto usa o MESMO codigo do TROPA V22 Cloud. O ZIP foi adaptado para voce fazer upload pelo navegador do GitHub, selecionando somente arquivos soltos.

## COMO PUBLICAR SEM SUBPASTAS

1. Extraia TROPA-V22-GITHUB-SEM-PASTAS.zip em uma pasta no Windows.
2. Abra o GitHub no navegador e crie um repositorio PRIVADO novo, por exemplo TROPA-V22-NETLIFY (assim seu repositorio anterior continua como backup).
3. No repositorio novo, clique Add file > Upload files.
4. Na pasta extraida, selecione TODOS os arquivos que estao juntos na raiz, incluindo TROPA_V22_CONTEUDO.bin, MONTAR_TROPA_V22.cjs, package.json e netlify.toml; arraste ou selecione os arquivos. NAO envie o ZIP por si so.
5. Clique Commit changes. Confira que os arquivos aparecem na raiz do repositorio.
6. Netlify > Add new project > Import an existing project > GitHub, selecione o repositorio novo.
7. Netlify identifica netlify.toml. Configuracoes: build npm run build:cloud; publish cloud/site; functions cloud/functions.
8. Configure as variaveis secretas EXISTENTES da V22 na Netlify (consulte o tutorial original dentro do pacote). Depois publique.

IMPORTANTE: quando a Netlify compilar, executa node MONTAR_TROPA_V22.cjs e recupera todas as subpastas cloud/ do codigo original, incluindo as Functions, imagens, Firebase e LiveKit. Depois o build original gera cloud/site. Voce NAO precisa enviar manualmente nenhuma subpasta.

## CONFIGURACOES QUE VOCE JA TEM

- Seu projeto Firebase, Firestore, regras, Authentication e app Web continuam sendo os mesmos.
- Seu projeto e chaves LiveKit continuam sendo os mesmos.
- Nao coloque credenciais no GitHub, nem no pacote .bin.
- Configure no painel Netlify Environment variables: FIREBASE_WEB_CONFIG, FIREBASE_SERVICE_ACCOUNT_JSON, TROPA_SIGNUP_CODE, TROPA_MAX_ACCOUNTS, LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET e TROPA_SITE_ORIGIN (quando tiver o endereco do site).
- As variaveis secretas devem estar no escopo Functions, nao apenas Build.
- Se houver um deploy sem configurar todas as variaveis, a interface pode abrir mas cadastro e chamada nao funcionarao ate configura-las.

## COMO TESTAR NO SEU PC

CMD nesta pasta:
  node MONTAR_TROPA_V22.cjs
  npm install
  npm run check:v22
  npm run build:cloud

Esses comandos recriam as pastas NO SEU PC para teste, mas no GitHub voce envia somente os arquivos soltos originais.

## LIMITES

A versao Cloud V22 eh um MVP separado da V21 local. Nao migra automaticamente o SQLite; a chamada real LiveKit e a publicacao Netlify ainda precisam de testes com contas reais. Planos gratuitos tem cotas, e o app ainda nao foi homologado para uso publico amplo.

Manual original: apos montar, veja docs/TUTORIAL_COMPLETO_V22_NETLIFY_FIREBASE_LIVEKIT.md
