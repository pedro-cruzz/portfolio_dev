# Documentação dentro do portfólio

Cada case com um arquivo Markdown ganha o botão **Documentação**. O leitor tem uma URL própria, conserva os temas claro/escuro e oferece navegação entre arquivos. Não precisa de vídeo, banco de dados nem login.

## Atualizar os READMEs do GitHub

```sh
npm run docs:sync
# Ou atualizar apenas um projeto:
npm run docs:sync -- ija-system
```

O comando copia o README público para `content/documentation/<slug>/README.md` e registra a origem em `source.json`. A lista de repositórios fica em `lib/documentation-sources.json`. Não altera os repositórios no GitHub. Falhas de rede preservam a última cópia e retornam erro; um README não encontrado é informado e ignorado. Não há sincronização durante visitas ou durante o build.

O Copa 2026 não tinha README disponível na primeira sincronização. O ECOTRON não foi incluído na sincronização para preservar a decisão de não destacar Arduino/hardware no README; tem uma visão técnica local focada na aplicação. LIAS News continua excluído.

Os READMEs foram copiados como estão: conteúdo inicial de framework, links antigos e instruções de terceiros ainda podem exigir revisão editorial. Cada projeto também tem `visao-tecnica.md`, baseada no código, com requisitos, diagrama e limites da análise. O botão **Documentação** do case abre essa visão primeiro. A sincronização sobrescreve apenas o README local; preserve os guias próprios nos outros arquivos.

## Adicionar uma documentação própria

1. Crie a pasta `content/documentation/<slug-do-projeto>/`, se ainda não existir.
2. Adicione um arquivo como `arquitetura.md`, `instalacao.md` ou `guia-de-uso.md`.
3. Comece o arquivo com `# Título do documento`; esse título aparece na navegação.
4. Abra `/projetos/<slug>/documentacao/<nome-sem-md>`.

Use nomes com letras sem acentos, números e hífens. Não use duas versões do mesmo nome com maiúsculas/minúsculas diferentes. Os arquivos ficam diretamente na pasta do projeto; subpastas não são catalogadas. Sem arquivos não aparece botão vazio.

Links entre arquivos: `[Arquitetura](arquitetura.md)` e `[README](README.md)`. Imagens de documentos locais devem ficar em `public/docs/<slug>/` e usar um caminho absoluto como `![Diagrama](/docs/ija-system/arquitetura.png)`. No README sincronizado, imagens e arquivos relativos continuam apontando para o repositório de origem. Arquivos Markdown que também existam localmente abrem no próprio portfólio.

O sumário é gerado a partir dos títulos de cada arquivo, incluindo títulos repetidos e formatação em linha. Ele aparece na lateral no desktop e fica recolhível no celular. Os links usam os mesmos identificadores do texto e levam o foco ao título escolhido. Não é necessário cadastrar uma lista de seções.

O leitor aceita títulos, links, listas, tabelas, código, imagens e HTML básico sanitizado. Scripts, iframes e código executável são removidos. Mermaid aparece como código; MDX não é executado. Os diagramas da visão técnica são SVGs locais em `public/docs/<slug>/arquitetura.svg`. Os de IJA System e HigiFlow foram desenhados individualmente; os demais podem ser regenerados com `node scripts/render-documentation-diagrams.mjs`. As imagens externas continuam dependendo de sua origem, mas o texto está incluído no site estático.

## Publicar alterações

```sh
npm run typecheck
npm run build
```

Publique novamente o diretório `out/` pelo fluxo de hospedagem usado pelo portfólio. Alterar o GitHub sozinho não modifica um site já publicado: sincronize, gere o build e publique novamente. As 12 visões técnicas estão escritas; a narrativa pessoal de contribuição, decisões e resultados ainda depende da confirmação de Pedro.
