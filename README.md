# Pedro Henrique — Portfólio

Portfólio com bancada 3D, temas claro/escuro e 12 projetos: IJA System, Mente Saudável, Pose Lab, HigiFlow, Copa 2026, ECOTRON, Oceano Azul, IJA Drones, AeroFit, Academy Hub, Ctrl+Play e Capitalize Invest. A seleção mostra um projeto por vez, com índice direto, filtros por tipo, anterior/próximo e acesso destacado ao GitHub e à documentação. A navegação percorre somente a categoria selecionada e mantém o projeto nesta sessão ao voltar de um case. Cada trabalho possui uma página própria com contexto, funcionalidades, arquitetura e código-fonte. Os esquemas ficam na documentação técnica; projetos com capturas reais também oferecem galeria ampliável.

## Desenvolvimento

```sh
npm install
npm run dev
```

Prévia local: http://127.0.0.1:3000.

## Stack

- Next.js 16, React 19 e TypeScript.
- Three.js, React Three Fiber e Drei na bancada com notebook, café e headset.
- Motion para transições; CSS com variáveis de tema.
- Fontes locais: Inter, Space Grotesk e JetBrains Mono.
- Playwright para navegação, imagens, teclado, temas e responsividade.

A cena usa geometria própria, sem modelos ou texturas remotos. A iluminação acompanha o tema. O render pausa fora da tela e em abas ocultas; movimento reduzido desativa o acompanhamento do mouse. A interação acontece diretamente nos objetos da cena, sem menu de seleção abaixo do 3D. A cena não exibe ícones sobre os objetos. As ações continuam acessíveis por clique, toque e teclado; as indicações aparecem apenas no foco de teclado:

- Notebook: abre a tampa e leva à seção de projetos, transferindo o foco para o título.
- Café: gira suavemente e libera vapor por alguns segundos; movimento reduzido usa vapor estático.
- Headset: abre um player com controles de reprodução, progresso, volume e lista de faixas. Há quatro loops sintetizados no navegador, sete músicas lo-fi e duas gravações de água em `public/audio`. Nenhuma faixa começa automaticamente; o som pausa ao ocultar a aba e os recursos de áudio são liberados ao sair da página. As faixas gravadas são servidas pelo próprio site, sem depender da disponibilidade do OpenGameArt durante a reprodução.

### Créditos do áudio

| Faixas | Autor | Origem | Licença |
| --- | --- | --- | --- |
| Cat Caffe, Countryside, Oceanside, Florist, Rainy Forest | TAD | [lofi Compilation](https://opengameart.org/content/lofi-compilation) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Lofi Hip Hop | omfgdude | [lofi hip hop](https://opengameart.org/content/lofi-hip-hop) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Lofi Again | omfgdude | [Lofi again](https://opengameart.org/content/lofi-again) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Cachoeira (`waterfall1.ogg`) e Riacho (`stream1.ogg`) | kurt | [Stream Sounds](https://opengameart.org/content/stream-sounds) | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |

Os arquivos de kurt foram extraídos do ZIP original e renomeados, sem edição do áudio. Os quatro loops sintetizados são originais deste portfólio. Os créditos das faixas gravadas também aparecem no player.

As ações e o ciclo de vida do áudio ficam em `components/use-workbench-interactions.ts`, `lib/ambient-audio.ts` e `components/ambient-control.tsx`. A faixa “Principais tecnologias” destaca Python, React, TypeScript, PostgreSQL, Node.js e Three.js; as páginas dos projetos mantêm a stack completa. A tela do notebook mostra referências a IJA System e Pose Lab. Se WebGL falhar, o conteúdo e a navegação continuam disponíveis.

## Projetos e imagens

`lib/portfolio.ts` e `lib/additional-projects.ts` centralizam o conteúdo e as fontes. `lib/project-explorer.ts` organiza áreas e mapas técnicos. `components/project-list.tsx` apresenta a seleção e seus controles; `app/projetos/[slug]/page.tsx` gera as páginas estáticas. `components/project-gallery.tsx` oferece miniaturas, ampliação, setas e navegação por teclado. Os diagramas são resumos de arquitetura, sem simulação de telemetria ou estados de produção.

No celular, “Escolher projeto” expande a seleção; uma escolha direta recolhe a lista e leva o foco à prévia, respeitando movimento reduzido. Projeto e filtro ficam guardados na sessão. No desktop, os projetos têm seleção direta compacta. Filtros com um resultado dispensam as setas de navegação.

Para adicionar uma demonstração publicada, preencha `live` no projeto em `lib/portfolio.ts` ou `lib/additional-projects.ts`. Esse endereço será a ação principal “Experimentar projeto” do case. Sem `live`, a ação principal leva à documentação disponível ou ao repositório.

As imagens WebP em `public/projects` foram capturadas em 28/09/2026:

| Projeto        | Origem das capturas                                                                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IJA System     | Tela de entrada com aviso de validação removido; templates do repositório pessoal `pedro-cruzz/IJA-System` com dados demonstrativos; capturas da agenda com endereços/coordenadas/IDs ocultados; rastreamento fictício. O portfólio não acessa o banco de produção. |
| Mente Saudável | Interface React executada localmente a partir de `pedro-cruzz/mente-saudavel`. O endereço Vercel do README retornava 404, por isso não há link de demonstração online.       |
| Pose Lab       | Versão pública em `esqueleto-3d.vercel.app`: entrada e visualizador do esqueleto.                                                                                            |
| HigiFlow       | Templates de `pedro-cruzz/gestao-higienizacao` com contexto demonstrativo e sem acesso ao banco.                                                                             |
| Copa 2026      | Versão pública em `copa-2026-one.vercel.app`.                                                                                                                                |
| ECOTRON        | Aplicação local `pedro-cruzz/arduino_energia` no modo de dados simulados já presente no projeto, com rótulos da demonstração ajustados ao foco em processamento no back-end. |

As novas capturas usam a landing publicada da IJA Drones e cópias locais de Oceano Azul, AeroFit, Academy Hub e Capitalize Invest. AeroFit e Academy Hub usam bancos SQLite temporários com dados demonstrativos; Capitalize usa investimentos fictícios no LocalStorage. O Ctrl+Play apresenta um diagrama técnico, sem imagens simulando telas do aplicativo.

LIAS News foi explicitamente excluído: Pedro informou que é um fork de trabalho que não desenvolveu. A presença de um repositório no perfil não comprova autoria. A participação de Pedro no IJA System foi confirmada; as contribuições específicas dos demais cases continuam pendentes de confirmação.

Os scripts Python em `scripts/` reproduzem as prévias de templates. Eles precisam de uma cópia do repositório e de Jinja2 ou Django, respectivamente. `scripts/capture-projects.mjs` captura as telas via Chrome e converte para WebP; as prévias locais devem estar abertas nas portas indicadas no script. Não há dependência desses servidores durante o uso do portfólio.

As descrições partem dos repositórios públicos, sem inventar métricas de resultado. As páginas identificam capturas locais e dados de demonstração. IJA System e Pose Lab recebem leituras técnicas específicas, conferidas também nos checkouts locais. A seção pessoal de cada case só aparece com `experience.confirmed: true` e campos preenchidos. Consulte `docs/conteudo-dos-projetos.md` para o que Pedro ainda precisa confirmar.

## Referências de direção

Foram usados princípios, sem copiar layouts, textos ou código: [Roxanne Cook](https://www.roxannecook.com/insights) para o encadeamento dos estudos de caso; [Olaolu Olawuyi](https://olaolu.dev/) para apresentação profissional específica; [Keita Yamada](https://p5aholic.me/) para período e créditos; [Daniel Sternlicht](https://danielsternlicht.com/) para interações com personalidade; [Max Böck](https://mxb.dev/) para conteúdo autoral; [Iuri Silva](https://iuricode.com/) para clareza sobre as entregas. Notas, laboratório e depoimentos ficam para quando houver material real.

## Conteúdo a completar

O link do perfil do GitHub está configurado como `https://github.com/pedro-cruzz`. Os dados pessoais ficam em `profile`, em `lib/portfolio.ts`:

- `linkedin`: URL completa do perfil.
- `whatsapp`: número com código do país e DDD; o link `wa.me` é montado sem pontuação.
- `email`: endereço público para contato.
- `resume.url`: caminho local do PDF, por exemplo `/curriculo/pedro-henrique-curriculo.pdf`, após adicionar o arquivo em `public/curriculo/`.
- `resume.filename`: nome sugerido ao baixar o PDF.

`components/resume-contact.tsx` apresenta o currículo e os três canais diretamente na página. Enquanto não houver PDF, a seção informa que ele estará disponível em breve e os botões permanecem desabilitados. Quando configurado, “Abrir currículo” abre o PDF em outra aba e “Baixar PDF” salva o mesmo documento. Canais sem dados mostram “Em breve”, sem destinos fictícios; canais preenchidos também aparecem no rodapé. E-mail e links externos usam os aplicativos e navegadores do visitante, sem envio automático de mensagens.

A apresentação pessoal foi revisada com as informações profissionais confirmadas por Pedro.

## Verificação

```sh
npm run typecheck
npm run build
# Com npm run dev em outro terminal e Google Chrome instalado:
npm test
```

O build exporta HTML e assets para `out/`. O código-fonte está no GitHub; o site ainda não foi publicado.

## Direção visual

Dark: fundo `#0B121E`, texto `#EEF3FC`, destaque `#74AAFF`.
Light: fundo `#F6F8FC`, texto `#122138`, destaque `#235CD6`.

A bancada é editável em `components/workbench.tsx`. A galeria usa imagens grandes, tipografia direta e interações discretas para destacar o conteúdo dos projetos.

## Documentação dos projetos

Os cases com Markdown oferecem **Documentação**, com leitor próprio, temas claro/escuro e links para o README original. Execute `npm run docs:sync` para atualizar as cópias do GitHub antes de gerar/publicar o site. Guias extras em `content/documentation/<slug>/*.md` entram automaticamente na navegação. Consulte `docs/documentacao.md` para adicionar arquivos, imagens e links. A revisão dos textos será feita em uma etapa posterior.
