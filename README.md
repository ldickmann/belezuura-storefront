<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<div align="center">
  <h1>🌸 Front-end Belezuura</h1>
  <p>Camada de apresentação headless do e-commerce <a href="https://www.belezuura.com.br">belezuura.com.br</a></p>

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![Wix](https://img.shields.io/badge/Wix_SDK-Headless-FAAD00?style=flat-square&logo=wix)

</div>
<!-- markdownlint-enable MD033 -->
<!-- markdownlint-enable MD041 -->

---

> **Repositório privado** — acesso restrito à equipe interna da Belezuura.

Aplicação Next.js headless que substitui a interface padrão do Wix, entregando design proprietário e performance superior. O Wix permanece como motor de comércio (catálogo, estoque, pedidos e checkout); este projeto controla 100% da camada visual.

---

## Stack

| Tecnologia     | Versão   | Uso                                          |
| -------------- | -------- | -------------------------------------------- |
| Next.js        | 16       | Framework principal — App Router, SSR, RSC   |
| React          | 19       | Biblioteca de interface                      |
| TypeScript     | 5        | Tipagem estática                             |
| Tailwind CSS   | 4        | Estilização com tokens de cor personalizados |
| @wix/sdk       | 1.17.7   | SDK headless do Wix                          |
| @wix/stores    | 1.0.586  | Catálogo de produtos e coleções              |
| @wix/ecom      | 1.0.1539 | Carrinho e checkout                          |
| @wix/members   | 1.0.431  | Autenticação e perfil de membros             |
| @wix/contacts  | 1.0.27   | Gestão de contatos (newsletter)              |
| Embla Carousel | 8        | Carrosséis de hero e categorias              |
| Lucide React   | 0.562    | Ícones SVG                                   |
| React Icons    | 5        | Ícones de redes sociais                      |
| js-cookie      | 3        | Leitura de cookies no cliente (sessão OAuth) |

---

## Arquitetura

```text
belezuura-storefront/
├── app/                          # App Router (Next.js)
│   ├── globals.css               # Estilos globais + tokens de cor (Tailwind)
│   ├── layout.tsx                # Layout raiz: Header, Footer e Metadata global
│   ├── page.tsx                  # Página inicial (Home) — Server Component
│   ├── carrinho/
│   │   └── page.tsx              # Página de carrinho de compras
│   ├── conta/
│   │   └── page.tsx              # Área do cliente (perfil, pedidos)
│   ├── login-callback/
│   │   └── page.tsx              # Callback do fluxo OAuth do Wix
│   └── search/
│       └── page.tsx              # Página de resultados de busca
│
├── components/
│   ├── HeroCarousel.tsx          # Carrossel hero (desktop assimétrico / mobile overlay)
│   ├── BrandsSection.tsx         # Vitrine de marcas parceiras
│   ├── CategoriesCarousel.tsx    # Carrossel de categorias (14 departamentos)
│   ├── ColletionsSection.tsx     # Vitrine de coleções em destaque
│   ├── auth/
│   │   └── LoginButton.tsx       # Botão login/logout com estado de sessão
│   ├── constants/
│   │   └── navigation.ts         # Links de nav, categorias e ofertas promocionais
│   ├── header/
│   │   ├── TopBar.tsx            # Banner promocional rotativo
│   │   ├── MainBar.tsx           # Barra principal: logo, busca, ícones de ação
│   │   ├── CategoriesBar.tsx     # Barra de categorias (desktop)
│   │   └── MobileDrawer.tsx      # Menu lateral mobile
│   ├── hooks/
│   │   ├── useEscapeKey.ts       # Fecha modais com tecla Escape
│   │   ├── useLockBodyScroll.ts  # Trava o scroll ao abrir drawer
│   │   └── useNavigation.ts      # Estado de rota ativa
│   ├── layout/
│   │   ├── HeaderComponent.tsx   # Header sticky composto (TopBar + MainBar + CategoriesBar)
│   │   ├── FooterComponent.tsx   # Rodapé com links, políticas e redes sociais
│   │   └── NewsletterForm.tsx    # Formulário de inscrição na newsletter
│   └── ui/
│       ├── HorizontalScroll.tsx  # Contêiner de scroll horizontal
│       ├── RotatingBanner.tsx    # Banner animado com flip 3D
│       ├── SearchInput.tsx       # Input de busca reutilizável
│       └── Drawer/               # Sistema de drawer (Drawer, DrawerItem, DrawerSection)
│
├── lib/
│   ├── wix-client.browser.ts     # Cliente Wix para uso no navegador (lê cookie de sessão)
│   ├── wix-client.server.ts      # Cliente Wix para uso no servidor (next/headers)
│   ├── actions/
│   │   └── newsletter.ts         # Server Action: inscrição na newsletter (Wix Contacts API)
│   └── services/
│       ├── products.ts           # Queries de produtos via Wix Stores API
│       └── cart.ts               # Server Actions de carrinho (addToCart, getCart)
│
├── middleware.ts                 # Geração de token anônimo para visitantes
├── next.config.ts                # Configuração do Next.js (CDN do Wix)
├── tsconfig.json                 # TypeScript com path alias @/
├── eslint.config.mjs
└── postcss.config.mjs
```

### Decisões Arquiteturais

- **Headless Commerce**: O Wix gerencia catálogo, estoque, pedidos e checkout; o Next.js controla 100% da camada visual.
- **RSC por padrão**: páginas buscam dados no servidor (`async` Server Components), reduzindo JavaScript no cliente e melhorando o TTFB.
- **Clientes Wix separados**: `wix-client.browser.ts` lê cookies via `js-cookie` (client-side); `wix-client.server.ts` lê via `next/headers` (server-side). Essa separação evita erros de contexto e mantém tokens seguros no servidor.
- **Middleware de sessão**: `middleware.ts` intercepta todas as rotas e emite um token anônimo de visitante caso não exista cookie de sessão, garantindo compatibilidade com o carrinho do Wix mesmo sem login.
- **Server Actions**: mutações (`addToCart`, `subscribeNewsletter`) são implementadas como Server Actions (`"use server"`), evitando exposição de credenciais no bundle do cliente.
- **Camada de serviços**: `lib/services/` abstrai toda comunicação com a API do Wix, mantendo os componentes desacoplados da fonte de dados.
- **Imagens CDN**: `next/image` otimiza imagens de `*.wixstatic.com` com qualidades 75/85 e `sizes` responsivos por breakpoint.
- **SEO**: `layout.tsx` define metadata global com OpenGraph, locale `pt_BR` e template de título `%s | Belezuura`.

---

## Funcionalidades

### Implementadas

- [x] **Hero Carousel** — 3 slides temáticos, layout assimétrico no desktop e overlay no mobile
- [x] **Seção de Marcas** — Vitrine de marcas parceiras
- [x] **Carrossel de Categorias** — Navegação pelas 14 categorias do catálogo
- [x] **Seção de Coleções** — Vitrine de coleções em destaque
- [x] **Produtos em Destaque** — Grid responsivo (1 → 2 → 4 colunas) com dados reais via API
- [x] **Banner Promocional Rotativo** — Exibe cupons e ofertas com animação flip 3D
- [x] **Header Completo** — TopBar, barra principal com busca, barra de categorias e drawer mobile
- [x] **Newsletter** — Formulário com inscrição via Wix Contacts API (Server Action)
- [x] **Autenticação OAuth** — Fluxo completo de login/logout com `@wix/members`
- [x] **Área do Cliente** (`/conta`) — Exibe nome, e-mail, telefone e pedidos do membro logado
- [x] **Login Callback** (`/login-callback`) — Finaliza o fluxo OAuth e persiste tokens em cookie
- [x] **Sessão de Visitante** — Middleware gera token anônimo automático para novos visitantes
- [x] **Server Actions de Carrinho** — `addToCart` e `getCart` integrados ao Wix ecom
- [x] **Página de Busca** (`/search`) — Estrutura da página de resultados por query
- [x] **SEO Avançado** — Metadata com OpenGraph, locale `pt_BR` e template de título por rota
- [x] **Layout Responsivo** — Header sticky, rodapé completo, design adaptado a todos os breakpoints

### Pendentes

- [ ] Listagem de produtos com filtros (Cor, Tamanho, Preço, Estampa, Material, Tecido) e paginação
- [ ] Página de detalhe do produto (`/produto/[slug]`) com galeria e seleção de variantes
- [ ] Interface de carrinho funcional (adicionar, remover, alterar quantidade, subtotal)
- [ ] Integração com checkout nativo do Wix ecom
- [ ] Lógica de busca com resultados reais via Wix Stores API
- [ ] Listagem de pedidos na área do cliente
- [ ] Páginas de políticas: Envio, Reembolso, Privacidade, Termos e Condições, Acessibilidade
- [ ] Wishlist (lista de desejos)

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) **≥ 20**
- npm (incluso no Node.js)
- Conta Wix com a loja configurada e um **OAuth App** criado no painel

---

## Instalação

```bash
# 1. Clonar o repositório
git clone git@github.com:belezuura/belezuura-storefront.git
cd belezuura-storefront

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Preencha .env.local com as credenciais (veja tabela abaixo)

# 4. Iniciar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Variáveis de Ambiente

Crie `.env.local` na raiz do projeto. **Nunca commite este arquivo.**

```env
# ─── Público (exposto no bundle do cliente) ───────────────────
# Client ID do OAuth App — Wix Dashboard → Configurações → OAuth Apps
NEXT_PUBLIC_WIX_CLIENT_ID=seu_client_id_aqui

# ─── Servidor (nunca expostos ao cliente) ─────────────────────
# Chave de API para operações server-side (ex.: Wix Contacts / Newsletter)
WIX_API_KEY=sua_api_key_aqui

# ID do site Wix (necessário junto à API Key para chamadas REST)
WIX_SITE_ID=seu_site_id_aqui
```

| Variável                    | Escopo   | Obrigatória | Descrição                                                              |
| --------------------------- | -------- | ----------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_WIX_CLIENT_ID` | Cliente  | ✅ Sim      | Client ID do OAuth App para autenticação pública e sessão de visitante |
| `WIX_API_KEY`               | Servidor | ✅ Sim      | API Key para chamadas REST server-side (ex.: Contacts API)             |
| `WIX_SITE_ID`               | Servidor | ✅ Sim      | ID do site Wix — obrigatório no header `wix-site-id`                   |

> **Segurança**: variáveis sem o prefixo `NEXT_PUBLIC_` são exclusivas do servidor e nunca chegam ao bundle do cliente. Nunca use `NEXT_PUBLIC_` para tokens privados ou chaves secretas.

---

## Scripts

| Comando         | Descrição                                  |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Desenvolvimento com hot-reload             |
| `npm run build` | Build de produção                          |
| `npm run start` | Servidor de produção (requer build prévio) |
| `npm run lint`  | Análise estática com ESLint                |

---

## Guia de Estilo

### Tokens de Cor (Tailwind CSS)

| Token       | Aplicação                                        |
| ----------- | ------------------------------------------------ |
| `plum-dark` | Textos, títulos serif, backgrounds escuros       |
| `rose-soft` | Cards de produto, slide hero, backgrounds suaves |
| `sage`      | Background alternativo (slide Cabelos)           |
| `sand`      | Bordas e divisores sutis                         |
| `gold-warm` | Badges de cupom, destaques promocionais          |

### Tipografia

`font-serif` em títulos (`h1`, `h2`) e seções de destaque — reforça a identidade elegante da marca. `font-sans` (padrão) em textos utilitários e rótulos.

### Breakpoints

| Breakpoint       | Largura    | Comportamento                    |
| ---------------- | ---------- | -------------------------------- |
| Mobile (default) | `< 640px`  | Coluna única, hero em overlay    |
| `sm`             | `≥ 640px`  | Grid 2 colunas (produtos)        |
| `md`             | `≥ 768px`  | Header passa a `h-16`            |
| `lg`             | `≥ 1024px` | Grid 4 colunas, hero assimétrico |

---

## Git Flow

```text
main       ← produção (protegida, merge via PR)
develop    ← homologação e integração
feature/*  ← novas funcionalidades
fix/*      ← correções de bugs
```

### Convenções de Commit

Este projeto adota [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo     | Uso                                      |
| ----------- | ---------------------------------------- |
| `feat:`     | Nova funcionalidade                      |
| `fix:`      | Correção de bug                          |
| `style:`    | Ajuste de CSS sem mudança de lógica      |
| `refactor:` | Refatoração sem mudança de comportamento |
| `docs:`     | Documentação                             |
| `chore:`    | Build, dependências, configuração        |

---

## Propriedade

Este projeto é **privado e proprietário**, desenvolvido exclusivamente para a **Belezuura**. É proibida a reprodução, distribuição ou uso do código fora do contexto da empresa sem autorização expressa.

© 2026 Belezuura — Todos os direitos reservados.

---

<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD033 -->
<div align="center">
  <p>Feito com 🌸 para a <strong>Belezuura</strong> — Blumenau/SC</p>
  <p>
    <a href="https://www.instagram.com/belezuurastore">Instagram</a> ·
    <a href="https://www.tiktok.com/@belezuuraoficial">TikTok</a> ·
    <a href="https://www.facebook.com/belezuura">Facebook</a> ·
    <a href="https://br.pinterest.com/belezuura/">Pinterest</a>
  </p>
</div>
<!-- markdownlint-enable MD033 -->
<!-- markdownlint-enable MD041 -->
