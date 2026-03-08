import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  // FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

/**
 * Links de navegação da seção Home.
 * Separados do JSX para facilitar manutenção sem tocar na marcação.
 */
const NAV_HOME = [
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Mais Vendidos", href: "/mais-vendidos" },
];

/**
 * Links de navegação da seção Empresa.
 */
const NAV_EMPRESA = [
  { label: "Perguntas Frequentes", href: "/faq" },
  { label: "Time", href: "/time" },
  { label: "Fale Conosco", href: "/contato" },
];

/**
 * Links de navegação da seção Políticas.
 */
const NAV_POLITICAS = [
  { label: "Declaração de Acessibilidade", href: "/acessibilidade" },
  { label: "Política de Envio", href: "/politica-envio" },
  { label: "Política de Reembolso", href: "/politica-reembolso" },
  {
    label: "Política de Privacidade",
    href: "https://www.belezuura.com.br/pol%C3%ADtica-de-privacidade",
  },
  {
    label: "Termos e Condições",
    href: "https://www.belezuura.com.br/termos-e-condicoes",
  },
];

/**
 * Ícones e metadados das redes sociais.
 * Adicione ou remova entradas aqui sem alterar o JSX.
 */
const REDES_SOCIAIS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/belezuurastore",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/belezuura",
    Icon: FaFacebookF,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@belezuuraoficial",
    Icon: FaTiktok,
  },
  {
    label: "Pinterest",
    href: "https://br.pinterest.com/belezuura",
    Icon: FaPinterestP,
  },
  { label: "X", href: "https://x.com/Belezuura", Icon: FaXTwitter },
];

/**
 * Componente auxiliar NavList
 *
 * Renderiza uma lista de links de navegação com estilo padrão do footer.
 * Links externos (href iniciando com "http") abrem em nova aba com segurança.
 * Reutilizado em todas as colunas de navegação.
 *
 * @param items - Array de objetos { label, href }
 * @returns {JSX.Element} Lista não-ordenada com links estilizados
 */
function NavList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-3 text-sm text-rose-soft/60">
      {items.map(({ label, href }) => {
        const isExternal = href.startsWith("http");
        return (
          <li key={href}>
            <Link
              href={href}
              className="hover:text-gold-warm transition-colors"
              {...(isExternal && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Componente Footer
 *
 * Rodapé do site com:
 * - Identidade da marca (logo + descrição)
 * - Navegação em colunas (Home, Empresa, Políticas, Contato)
 * - Formulário de newsletter
 * - Linha divisória
 * - Copyright e ícones de redes sociais
 *
 * Server Component — não utiliza hooks ou event handlers no nível raiz.
 *
 * @returns {JSX.Element} Rodapé completo do site
 */
export function Footer() {
  return (
    <footer className="bg-plum-dark text-rose-soft">
      <div className="max-w-360 mx-auto px-6 md:px-37.25 pt-12.5">
        {/* Grade principal: Logo | Home+Empresa | Políticas | Contato | Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_1fr_1fr_280px] gap-10">
          {/* Identidade da marca */}
          <div className="flex flex-col gap-6">
            <Image
              src="/logo/logo-belezuura-sem-fundo.jpg"
              alt="Logo Belezuura"
              width={160}
              height={60}
              className="object-contain"
            />
            <p className="text-sm leading-relaxed text-rose-soft/60 max-w-50">
              Mais que uma loja, é o seu refúgio de beleza e bem-estar
            </p>
          </div>

          {/* Coluna de navegação: Home e Empresa */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[15px] font-bold text-gold-warm">Home</h4>
            <NavList items={NAV_HOME} />

            <h4 className="text-[15px] font-bold text-gold-warm mt-4">
              Empresa
            </h4>
            <NavList items={NAV_EMPRESA} />
          </div>

          {/* Coluna de navegação: Políticas */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[15px] font-bold text-gold-warm">Políticas</h4>
            <NavList items={NAV_POLITICAS} />
          </div>

          {/* Coluna de contato: e-mail e localização */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[15px] font-bold text-gold-warm">Contato</h4>
            <ul className="flex flex-col gap-4 text-sm text-rose-soft/60">
              <li className="flex items-center gap-2">
                <Mail
                  size={14}
                  className="text-gold-warm shrink-0"
                />
                <a
                  href="mailto:info@belezuura.com.br"
                  className="hover:text-gold-warm transition-colors">
                  info@belezuura.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin
                  size={14}
                  className="text-gold-warm shrink-0"
                />
                <span>Blumenau/SC</span>
              </li>
            </ul>
          </div>

          {/* Formulário de newsletter
              Nota: sem action e sem onSubmit — formulário estático.
              Para integrar envio real, extraia para um Client Component. */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[15px] font-bold text-gold-warm">
              Inscreva-se
            </h4>
            <form className="flex items-center rounded-[5px] overflow-hidden border border-rose-soft/20 bg-rose-soft/10">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                aria-label="E-mail para newsletter"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-rose-soft placeholder:text-rose-soft/30 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-rose-soft text-plum-dark text-sm font-bold px-4 py-3 hover:bg-gold-warm transition-colors shrink-0">
                Enviar
              </button>
            </form>
          </div>
        </div>

        {/* Divisor visual entre conteúdo principal e barra inferior */}
        <div className="mt-12 border-t border-rose-soft/10" />

        {/* Barra inferior: copyright à esquerda e redes sociais à direita */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright com ano dinâmico */}
          <p className="text-xs text-rose-soft/30">
            © {new Date().getFullYear()} Belezuura. Todos os direitos
            reservados.
          </p>

          {/* Ícones de redes sociais gerados a partir de REDES_SOCIAIS */}
          <nav
            aria-label="Redes sociais"
            className="flex items-center gap-5 text-rose-soft/60">
            {REDES_SOCIAIS.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-gold-warm transition-colors">
                <Icon size={16} />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
