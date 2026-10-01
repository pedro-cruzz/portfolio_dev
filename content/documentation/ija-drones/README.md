# IJA Drones

Landing page institucional da IJA Drones, com foco em pulverização agrícola e
software para gestão de voos. O projeto foi construído com Next.js, TypeScript e
Tailwind CSS.

## Requisitos

- Node.js 20.9 ou superior
- npm 10 ou superior

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` no navegador.

## Comandos

```bash
npm run dev    # ambiente de desenvolvimento
npm run build  # build de produção
npm run start  # executa o build
npm run lint   # análise estática
```

## Personalização

Os textos, soluções, etapas e dados de contato ficam em `src/content/site.ts`.
Antes da publicação, confirme o e-mail comercial e revise todas as funcionalidades
descritas para que correspondam ao produto real.

As cores azul e verde foram extraídas da identidade visual fornecida. A
tipografia sans, as animações e as regras responsivas estão configuradas em
`src/app/globals.css`.

## Imagens

As imagens utilizadas no protótipo estão armazenadas em `public/images`, evitando
dependência de URLs externas durante a navegação. Elas vieram das referências do
Unsplash presentes no layout original e podem ser substituídas por fotos próprias
das operações da IJA Drones antes do lançamento.

## Estrutura

- `src/app`: página, layout, metadados e estilos globais
- `src/components`: marca, navegação, abas de soluções, ícones e mapa ilustrativo
- `src/content/site.ts`: conteúdo editável e dados comerciais
- `public/images`: logo e fotografias da landing page
