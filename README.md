<div align="center">
  <h1>🌸 Front-end Belezuura</h1>
  <p>Camada de apresentação headless do e-commerce <a href="https://www.belezuura.com.br">belezuura.com.br</a></p>

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![Wix](https://img.shields.io/badge/Wix_SDK-Headless-FAAD00?style=flat-square&logo=wix)

</div>

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
| Embla Carousel | 8        | Carrosséis de hero e categorias              |
| Lucide React   | 0.562    | Ícones SVG                                   |
| React Icons    | 5        | Ícones de redes sociais                      |

---

## Estrutura do Projeto

```
belezuura-storefront/
├── app/
│   ├── globals.css               # Estilos globais + tokens de cor (Tailwind)
│   ├── layout.tsx                # Layout raiz: Header, Footer e Metadata global
│   ├── page.tsx                  # Home — Server Component async
│   └── carrinho/
│       └── page.tsx              # Página de carrinho
│
├── components/
│   ├── HeroCarousel.tsx          # Carrossel hero: assimétrico (desktop) / overlay (mobile)
│   ├── BrandsSection.tsx         # Marcas parceiras
│   ├── CategoriesCarousel.tsx    # Carrossel flutuante de categorias
│   ├── ColletionsSection.tsx     # Vitrine de coleções
│   └── layout/
│       ├── HeaderComponent.tsx   # Header sticky com navegação e carrinho
│       └── FooterComponent.tsx   # Rodapé com links e redes sociais
│
├── lib/
│   ├── wix-client.ts             # Factory do cliente Wix (OAuthStrategy)
│   └── services/
│       └── products.ts           # Queries de produtos via Wix Stores API
│
├── public/
│   ├── images/
│   │   ├── hero/                 # Imagens do carrossel principal
│   │   ├── categories/           # Imagens das categorias
│   │   ├── collections/          # Imagens das coleções
│   │   └── svg/                  # Ícones vetoriais
│   └── logo/                     # Logotipos da marca
│
├── next.config.ts                # Imagens CDN Wix (remotePatterns)
├── tsconfig.json                 # TypeScript com path alias @/
├── eslint.config.mjs
└── postcss.config.mjs
```

### Decisões Técnicas

- **RSC por padrão**: páginas buscam dados no servidor (`async` Server Components), reduzindo JS no cliente.
- **Camada de serviços**: `lib/services/` abstrai toda comunicação com o Wix, mantendo componentes desacoplados da API.
- **Client factory**: `lib/wix-client.ts` centraliza a criação do cliente autenticado — fácil de trocar a estratégia de auth futuramente.
- **Imagens via CDN**: `next/image` otimiza imagens de `*.wixstatic.com` com qualidades 75/85 e `sizes` responsivos por breakpoint.
- **SEO**: `layout.tsx` define metadata global com OpenGraph, locale `pt_BR` e template de título `%s | Belezuura`.

---

## Instalação

### Requisitos

- Node.js ≥ 20
- npm (já vem com o Node)

### Passos

```bash
# 1. Clonar o repositório
git clone git@github.com:belezuura/belezuura-storefront.git
cd belezuura-storefront

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com as credenciais (veja seção abaixo)

# 4. Iniciar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Variáveis de Ambiente

Crie `.env.local` na raiz (nunca commitar este arquivo):

```env
# Client ID do OAuth App criado no painel do Wix
# Wix Dashboard → Configurações → Avançado → OAuth Apps
NEXT_PUBLIC_WIX_CLIENT_ID=seu_client_id_aqui
```

| Variável                    | Obrigatória | Descrição                             |
| --------------------------- | ----------- | ------------------------------------- |
| `NEXT_PUBLIC_WIX_CLIENT_ID` | ✅          | Client ID público do OAuth App do Wix |

> `NEXT_PUBLIC_` expõe a variável no bundle do cliente. Nunca colocar tokens privados ou chaves de servidor com esse prefixo.

---

## Scripts

| Comando         | Descrição                                  |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Desenvolvimento com hot-reload             |
| `npm run build` | Build de produção                          |
| `npm run start` | Servidor de produção (requer build prévio) |
| `npm run lint`  | Análise estática com ESLint                |

---

## Integração Wix

O projeto usa `OAuthStrategy` para operações públicas (catálogo, coleções) sem exigir sessão de usuário.

```typescript
// lib/wix-client.ts
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";

export function getWixClient() {
  return createClient({
    modules: { products, collections },
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });
}
```

```typescript
// Uso via camada de serviços em um Server Component
import { getProducts } from "@/lib/services/products";

const destaques = await getProducts(4);
```

---

## Funcionalidades

### Implementadas

- [x] Hero Carousel — 3 slides temáticos (Fitness, Cabelos, Maquiagem), assimétrico no desktop, overlay no mobile
- [x] Seção de Marcas parceiras
- [x] Carrossel de Categorias — 14 categorias do catálogo
- [x] Seção de Coleções em destaque
- [x] Produtos em Destaque — grid responsivo (1→2→4 col.) com dados reais da API
- [x] Página de Carrinho — estrutura base
- [x] Header sticky, SEO global, layout responsivo

### Pendentes

- [ ] Listagem de produtos com filtros (Cor, Tamanho, Preço, Estampa, Material, Tecido) e paginação
- [ ] Página de detalhe do produto (`/produto/[slug]`) com galeria e variantes
- [ ] Carrinho funcional (adicionar, remover, atualizar quantidade)
- [ ] Checkout integrado com Wix ecom
- [ ] Autenticação e área do cliente (`Meus Pedidos`)
- [ ] Busca com autocomplete
- [ ] Newsletter ("Assine para Receber as Novidades")
- [ ] Páginas de políticas (Envio, Reembolso, Privacidade, Termos, Acessibilidade)
- [ ] Wishlist

---

## Guia de Estilo

### Tokens de Cor

| Token       | Aplicação                                        |
| ----------- | ------------------------------------------------ |
| `plum-dark` | Textos, títulos serif, backgrounds escuros       |
| `rose-soft` | Cards de produto, slide hero, backgrounds suaves |
| `sage`      | Background alternativo (slide Cabelos)           |
| `sand`      | Bordas e divisores sutis                         |

### Tipografia

`font-serif` em títulos (`h1`, `h2`) e seções de destaque — reforça a identidade elegante da marca. `font-sans` (padrão) em textos utilitários e rótulos.

### Breakpoints

| Breakpoint       | Largura    | Comportamento                    |
| ---------------- | ---------- | -------------------------------- |
| Mobile (default) | `< 640px`  | Coluna única, hero em overlay    |
| `sm`             | `≥ 640px`  | Grid 2 colunas (produtos)        |
| `md`             | `≥ 768px`  | Header `h-20`                    |
| `lg`             | `≥ 1024px` | Grid 4 colunas, hero assimétrico |

---

## Git Flow

```
main       ← produção (protegida, merge via PR)
develop    ← homologação e integração
feature/*  ← novas funcionalidades
fix/*      ← correções de bugs
```

### Convenções de Commit

```
feat:      nova funcionalidade
fix:       correção de bug
style:     ajuste de CSS sem mudança de lógica
refactor:  refatoração sem mudança de comportamento
docs:      documentação
chore:     build, dependências, configuração
```

---

© 2026 Belezuura. Código privado e proprietário — uso exclusivo interno.

---

## Sobre o Negócio

> _"Excelência em preço baixo e rapidez de envio"_

A **Belezuura** é mais que uma loja — é o refúgio de beleza e bem-estar da mulher brasileira. Com sede em **Blumenau/SC**, a missão da marca é oferecer produtos de qualidade a preços justos, atendendo às necessidades de todas as mulheres que buscam realçar sua beleza única, com uma experiência de compra memorável e serviço excepcional.

O **Front-end Belezuura** é a camada de apresentação headless que substitui a interface padrão do Wix, trazendo design proprietário, performance superior e controle total sobre a experiência do usuário, mantendo o Wix como motor de comércio (catálogo, estoque, pedidos, checkout).

---

## Catálogo de Produtos

O site conta com **mais de 925 produtos** organizados nas seguintes categorias, com faixa de preço de **R$ 3 a R$ 610**:

| Categoria    | URL da Coleção                   |
| ------------ | -------------------------------- |
| Acessórios   | `/category/acessórios-belezuura` |
| Cabelos      | `/category/belezzura-cabelos`    |
| Calças       | `/category/calças-belezzura`     |
| Camisas      | `/category/camisas-belezuura`    |
| Conjuntos    | `/category/conjuntos-belezuura`  |
| Fitness      | `/category/fitness-belezuura`    |
| Jaquetas     | `/category/jaquetas-belezuura`   |
| Jeans        | `/category/jeans-belezuura`      |
| Lingerie     | `/category/lingerie-belezuura`   |
| Maquiagem    | `/category/maquiagem-belezuura`  |
| Pele         | `/category/pele-belezuura`       |
| Praia        | `/category/praia-belezuura`      |
| Shorts/Saias | `/category/short-saia-belezuura` |
| Vestidos     | `/category/vestidos-belezuura`   |

---

## Redes Sociais

| Plataforma  | Perfil                                                        |
| ----------- | ------------------------------------------------------------- |
| Instagram   | [@belezuurastore](https://www.instagram.com/belezuurastore)   |
| TikTok      | [@belezuuraoficial](https://www.tiktok.com/@belezuuraoficial) |
| Facebook    | [/belezuura](https://www.facebook.com/belezuura)              |
| Pinterest   | [/belezuura](https://br.pinterest.com/belezuura/)             |
| X (Twitter) | [@Belezuura](https://x.com/Belezuura)                         |

---

## Stack Tecnológica

| Tecnologia                                                       | Versão   | Finalidade                                        |
| ---------------------------------------------------------------- | -------- | ------------------------------------------------- |
| [Next.js](https://nextjs.org/)                                   | 16       | Framework React com App Router e SSR              |
| [React](https://react.dev/)                                      | 19       | Biblioteca de interface                           |
| [TypeScript](https://www.typescriptlang.org/)                    | 5        | Tipagem estática                                  |
| [Tailwind CSS](https://tailwindcss.com/)                         | 4        | Estilização utilitária com tokens customizados    |
| [@wix/sdk](https://dev.wix.com/)                                 | 1.17.7   | SDK headless do Wix                               |
| [@wix/stores](https://dev.wix.com/docs/sdk/api-reference/stores) | 1.0.586  | Catálogo de produtos e coleções                   |
| [@wix/ecom](https://dev.wix.com/docs/sdk/api-reference/ecom)     | 1.0.1539 | Carrinho e checkout                               |
| [Embla Carousel](https://www.embla-carousel.com/)                | 8        | Carrosséis de hero e categorias                   |
| [Lucide React](https://lucide.dev/)                              | 0.562    | Ícones SVG                                        |
| [React Icons](https://react-icons.github.io/react-icons/)        | 5        | Ícones de redes sociais (Instagram, TikTok, etc.) |

---

## Arquitetura

```
belezuura-storefront/
├── app/                          # App Router (Next.js)
│   ├── globals.css               # Estilos globais + tokens de cor (Tailwind)
│   ├── layout.tsx                # Layout raiz: Header, Footer e Metadata global
│   ├── page.tsx                  # Página inicial (Home) — Server Component
│   └── carrinho/
│       └── page.tsx              # Página de carrinho de compras
│
├── components/                   # Componentes reutilizáveis
│   ├── HeroCarousel.tsx          # Carrossel hero (layout assimétrico desktop / overlay mobile)
│   ├── BrandsSection.tsx         # Seção de marcas parceiras
│   ├── CategoriesCarousel.tsx    # Carrossel flutuante de categorias
│   ├── ColletionsSection.tsx     # Vitrine de coleções em destaque
│   └── layout/
│       ├── HeaderComponent.tsx   # Cabeçalho sticky com navegação, logo e ícone do carrinho
│       └── FooterComponent.tsx   # Rodapé com links, políticas e redes sociais
│
├── lib/                          # Camada de integração e serviços
│   ├── wix-client.ts             # Factory do cliente Wix com OAuthStrategy
│   └── services/
│       └── products.ts           # Abstração das queries de produtos (Wix Stores API)
│
├── public/
│   ├── images/
│   │   ├── hero/                 # Imagens do carrossel principal
│   │   ├── categories/           # Imagens das categorias
│   │   ├── collections/          # Imagens das coleções
│   │   └── svg/                  # Ícones e ilustrações vetoriais
│   └── logo/                     # Logotipos da marca Belezuura
│
├── next.config.ts                # Configuração do Next.js (CDN do Wix em remotePatterns)
├── tsconfig.json                 # Configuração TypeScript com path alias @/
├── eslint.config.mjs             # Regras de linting (ESLint + Next.js)
└── postcss.config.mjs            # Configuração PostCSS + Tailwind CSS 4
```

### Decisões Arquiteturais

- **Headless Commerce**: O Wix gerencia catálogo, estoque, pedidos e checkout enquanto o Next.js controla 100% da experiência visual, eliminando limitações de template e possibilitando design de marca único.
- **React Server Components (RSC)**: A página inicial busca produtos diretamente no servidor como `async` Server Component, reduzindo JavaScript no cliente e melhorando o TTFB sem comprometer a interatividade.
- **Camada de Serviços**: `lib/services/products.ts` abstrai toda comunicação com a API do Wix, mantendo os componentes desacoplados da fonte de dados e facilitando testes e futuras migrações.
- **Client Factory**: `lib/wix-client.ts` centraliza a criação do cliente autenticado com `OAuthStrategy`, adequado para operações públicas (catálogo, coleções) sem exigir login do usuário final.
- **Otimização de Imagens CDN**: Imagens servidas pelo CDN do Wix (`*.wixstatic.com`) são processadas pelo `next/image` com qualidades configuradas (75 e 85) e `sizes` responsivos por breakpoint, garantindo performance sem perda visual.
- **SEO Estruturado**: `layout.tsx` define metadata global com suporte a `OpenGraph`, localidade `pt_BR` e template de títulos dinâmico `%s | Belezuura` para cada rota.

---

## Funcionalidades

### Implementadas

- [x] **Hero Carousel** — Carrossel principal com 3 slides temáticos (Fitness, Cabelos, Maquiagem), layout assimétrico no desktop e overlay no mobile, com links diretos para departamentos e ícones de redes sociais integrados
- [x] **Seção de Marcas** — Vitrine das marcas parceiras da Belezuura
- [x] **Carrossel de Categorias** — Navegação rápida pelas 14 categorias do catálogo
- [x] **Seção de Coleções** — Vitrine das coleções em destaque (ex.: Vestidos Belezuura)
- [x] **Produtos em Destaque** — Grid responsivo (1 → 2 → 4 colunas) com dados reais via Wix Stores API, imagens otimizadas e hover animado
- [x] **Página de Carrinho** — Estrutura base da página `/carrinho`
- [x] **SEO Avançado** — Metadata com OpenGraph, locale `pt_BR`, keywords e template de título por página
- [x] **Layout Responsivo** — Header sticky com `backdrop-blur`, totalmente responsivo

### Planejadas

- [ ] Listagem de produtos com filtros (Cor, Tamanho, Preço, Estampa, Material, Tecido) e paginação — espelhando as 15 opções de filtro do site atual
- [ ] Página de detalhe do produto (`/produto/[slug]`) com galeria e seleção de variantes
- [ ] Carrinho funcional: adicionar, remover, alterar quantidade, subtotal
- [ ] Integração com checkout nativo do Wix ecom
- [ ] Autenticação de cliente (login/cadastro) e acesso a `Meus Pedidos`
- [ ] Busca de produtos com autocomplete
- [ ] Newsletter (actualmente presente no site: "Assine para Receber as Novidades")
- [ ] Páginas de políticas: Envio, Reembolso, Privacidade, Termos e Condições, Acessibilidade
- [ ] Wishlist (lista de desejos)

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) **≥ 20**
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/) ou [yarn](https://yarnpkg.com/)
- Conta no [Wix](https://www.wix.com/) com a loja Belezuura configurada e um **OAuth App** criado no painel

---

## Configuração e Instalação

> Este é um repositório **privado** da Belezuura. O acesso é restrito à equipe interna. Solicite permissão ao responsável técnico antes de clonar.

### 1. Clone o repositório

```bash
git clone git@github.com:belezuura/belezuura-storefront.git
cd belezuura-storefront
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# ID do OAuth App criado no painel do Wix
# Obtenha em: Wix Dashboard → Configurações → Avançado → OAuth Apps
NEXT_PUBLIC_WIX_CLIENT_ID=seu_wix_client_id_aqui
```

> **Como obter o Client ID:** No painel Wix, acesse **Configurações → Avançado → OAuth Apps**, crie um novo app e copie o **Client ID** gerado. Nunca exponha segredos ou chaves privadas nessa variável — ela é injetada no bundle do cliente.

### 4. Execute em modo de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Scripts Disponíveis

| Comando         | Descrição                                    |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Servidor de desenvolvimento com hot-reload   |
| `npm run build` | Build de produção otimizado                  |
| `npm run start` | Servidor de produção (requer `build` prévio) |
| `npm run lint`  | Análise estática com ESLint                  |

---

## Variáveis de Ambiente

| Variável                    | Obrigatória | Descrição                                                                 |
| --------------------------- | ----------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WIX_CLIENT_ID` | ✅ Sim      | Client ID do OAuth App Wix para autenticação pública (catálogo, coleções) |

> O prefixo `NEXT_PUBLIC_` expõe a variável no bundle do cliente. Nunca adicione tokens privados, chaves de API secretas ou credenciais de servidor com esse prefixo.

---

## Integração com o Wix

O projeto utiliza **OAuthStrategy** do `@wix/sdk`, adequada para operações públicas que não exigem sessão de usuário. O cliente é instanciado via factory function em `lib/wix-client.ts` com os módulos `products` e `collections` do `@wix/stores`.

```typescript
// lib/wix-client.ts — factory centralizada
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";

export function getWixClient() {
  return createClient({
    modules: { products, collections },
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });
}
```

```typescript
// Exemplo de uso via camada de serviços
import { getProducts } from "@/lib/services/products";

// Server Component — busca até 4 produtos em destaque
const destaques = await getProducts(4);
```

---

## Guia de Estilo

### Tokens de Cor (Tailwind CSS)

| Token       | Uso                                                       |
| ----------- | --------------------------------------------------------- |
| `plum-dark` | Textos principais, títulos serif, backgrounds de destaque |
| `rose-soft` | Backgrounds suaves, cards de produto, slide hero          |
| `sage`      | Backgrounds alternativos (slide Cabelos)                  |
| `sand`      | Bordas e separadores sutis                                |

### Tipografia

A fonte **serif** (`font-serif`) é usada em títulos e elementos de destaque (`h1`, `h2`, seções principais) para reforçar a identidade elegante e feminina da marca. Elementos utilitários e rótulos usam a fonte sans-serif padrão.

### Responsividade

Os principais breakpoints seguem o padrão Tailwind:

| Breakpoint       | Largura    | Comportamento                           |
| ---------------- | ---------- | --------------------------------------- |
| Mobile (default) | `< 640px`  | Layout em coluna única, hero em overlay |
| `sm`             | `≥ 640px`  | Grid de 2 colunas em produtos           |
| `md`             | `≥ 768px`  | Header cresce para `h-20`               |
| `lg`             | `≥ 1024px` | Grid de 4 colunas, hero assimétrico     |

---

## Fluxo de Desenvolvimento

Este repositório é privado e de uso exclusivo da equipe da Belezuura. Todo desenvolvimento segue o fluxo interno de branches:

```
main          ← produção (protegida)
develop       ← integração e homologação
feature/*     ← novas funcionalidades
fix/*         ← correções de bugs
```

### Convenções de Commit

Este projeto adota [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo     | Uso                                          |
| ----------- | -------------------------------------------- |
| `feat:`     | Nova funcionalidade                          |
| `fix:`      | Correção de bug                              |
| `style:`    | Ajustes de CSS/estilo sem mudança de lógica  |
| `refactor:` | Refatoração sem mudança de comportamento     |
| `docs:`     | Documentação                                 |
| `chore:`    | Tarefas de build, dependências, configuração |

---

## Propriedade

Este projeto é **privado e proprietário**, desenvolvido exclusivamente para a **Belezuura**. É proibida a reprodução, distribuição ou uso do código fora do contexto da empresa sem autorização expressa.

© 2026 Belezuura — Todos os direitos reservados.

---

<div align="center">
  <p>Feito com 🌸 para a <strong>Belezuura</strong> — Blumenau/SC</p>
  <p>
    <a href="https://www.instagram.com/belezuurastore">Instagram</a> ·
    <a href="https://www.tiktok.com/@belezuuraoficial">TikTok</a> ·
    <a href="https://www.facebook.com/belezuura">Facebook</a> ·
    <a href="https://br.pinterest.com/belezuura/">Pinterest</a>
  </p>
</div>
