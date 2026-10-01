# Oceano Azul Landing Page

Landing page institucional da Oceano Azul, feita com Next.js, React, Tailwind CSS e formulario de leads integrado ao Resend.

## Visao geral

O projeto apresenta a empresa, servicos com drones, cases reais, numeros operacionais, diferenciais, cursos, novidades e formulario de contato.

Principais rotas:

- `/` redireciona para `/oceano`
- `/oceano` exibe a landing page principal
- `/oceano/sobre` exibe a pagina institucional sobre a Oceano Azul
- `/api/contact` recebe leads do formulario e envia e-mail via Resend

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Resend API para envio de e-mails

## Requisitos

- Node.js compativel com Next.js 16
- npm
- Conta/API key do Resend para envio real do formulario

## Como rodar localmente

Instale as dependencias:

```powershell
npm install
```

Crie o arquivo de ambiente:

```powershell
Copy-Item .env.local.example .env.local
```

Preencha as variaveis em `.env.local` e rode o servidor:

```powershell
npm run dev
```

Acesse:

```text
http://localhost:3000/oceano
```

## Variaveis de ambiente

| Variavel | Obrigatoria | Descricao |
| --- | --- | --- |
| `SITE_URL` | Nao | URL publica do site. Ajuda o e-mail a montar links absolutos para imagens. |
| `NEXT_PUBLIC_SITE_URL` | Nao | Alternativa publica para a URL do site, usada pelo template de e-mail quando existir. |
| `RESEND_API_KEY` | Sim | Chave da API do Resend usada em `/api/contact`. |
| `RESEND_FROM_EMAIL` | Nao | Remetente dos e-mails. Se vazio, usa `Oceano Azul <onboarding@resend.dev>`. |
| `OCEANO_AZUL_RECIPIENT` | Sim | Destinatario dos leads da landing Oceano Azul. |
| `DEFAULT_LEAD_RECIPIENT` | Nao | Destinatario fallback para formularios sem origem especifica. |

Exemplo:

```env
SITE_URL=https://seudominio.com.br
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Oceano Azul <contato@seudominio.com.br>
OCEANO_AZUL_RECIPIENT=comercial@seudominio.com.br
DEFAULT_LEAD_RECIPIENT=comercial@seudominio.com.br
```

## Scripts

```powershell
npm run dev
```

Inicia o ambiente de desenvolvimento.

```powershell
npm run build
```

Gera o build de producao e valida TypeScript.

```powershell
npm run start
```

Sobe o servidor de producao depois do build.

```powershell
npm run lint
```

Executa o ESLint.

## Estrutura principal

```text
app/
  api/contact/
    email-template.ts       Template HTML/texto do e-mail de lead
    route.ts                Endpoint POST /api/contact
  components/
    oceano/
      OceanoLandingPage.tsx Pagina principal da landing
      OceanoAboutPage.tsx   Pagina sobre a empresa
    shared/
      lead-form.tsx         Hook e estado do formulario de leads
    ui-kit.tsx              Componentes reutilizaveis de UI
  oceano/
    page.tsx                Rota /oceano
    sobre/page.tsx          Rota /oceano/sobre
  globals.css               Estilos globais e Tailwind
public/
  images/                   Imagens, logos e posters
  videos/                   Videos usados na landing
```

## Conteudo e manutencao

A maior parte do conteudo da landing fica em `app/components/oceano/OceanoLandingPage.tsx`, dentro de arrays como:

- `solutionCards`
- `technicalSheet`
- `caseNumbers`
- `realOperationCases`
- `fleetCategories`
- `differentiators`
- `newsItems`

Para trocar imagens ou videos, coloque os arquivos em `public/images` ou `public/videos` e referencie com caminho publico, por exemplo:

```ts
image: "/images/pulverizacao_agricola.jpeg"
src: "/videos/video-case-agro.mp4"
```

Prefira nomes de arquivos sem acentos e sem espacos, especialmente para midias servidas em mobile e CDN.

## Formulario de contato

Fluxo atual:

1. O usuario preenche o formulario em `/oceano`.
2. O hook `useLeadForm` envia `POST /api/contact`.
3. A rota valida nome, e-mail e mensagem.
4. A rota resolve o destinatario pela origem do formulario.
5. O e-mail e enviado via Resend.
6. O usuario recebe feedback de sucesso ou erro na interface.

Campos obrigatorios:

- nome
- e-mail
- mensagem

Campos opcionais:

- telefone
- interesse
- origem

## Checklist antes de publicar

- Rodar `npm run lint`
- Rodar `npm run build`
- Confirmar `.env.local` ou variaveis da plataforma de deploy
- Testar envio do formulario em ambiente de homologacao/producao
- Verificar videos no mobile
- Confirmar que imagens externas usadas nas noticias estao liberadas em `next.config.ts`
- Conferir links de Instagram, LinkedIn, politicas e contato

## Problemas comuns

### Formulario retorna `RESEND_API_KEY nao configurada`

Configure `RESEND_API_KEY` no ambiente local ou na plataforma de deploy.

### Formulario retorna `Destinatario nao configurado`

Configure `OCEANO_AZUL_RECIPIENT`. Se houver outros formularios no futuro, configure tambem `DEFAULT_LEAD_RECIPIENT`.

### Imagem remota nao aparece

Adicione o dominio em `images.remotePatterns` no `next.config.ts`.

### Video nao toca no mobile

Confira se o arquivo:

- esta em `public/videos`
- usa caminho sem acento ou espaco
- esta referenciado com `/videos/nome-do-arquivo.mp4`
- tem `playsInline` quando renderizado em `<video>`
- nao esta dentro de um container com altura fixa menor que o proprio video

## Deploy

O projeto e uma aplicacao Next.js padrao. Em plataformas como Vercel, configure as variaveis de ambiente e use:

```powershell
npm run build
```

Para producao propria, depois do build:

```powershell
npm run start
```
