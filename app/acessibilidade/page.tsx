import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Declaração de Acessibilidade | Belezuura",
  description: "Nosso compromisso com a acessibilidade digital.",
};

export default function AcessibilidadePage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <p className="text-[11px] font-bold tracking-widest text-plum-dark/40 uppercase mb-3">
        Inclusão
      </p>
      <h1 className="text-3xl md:text-4xl font-serif text-plum-dark mb-8">
        Declaração de Acessibilidade
      </h1>

      <div className="space-y-5 text-sm text-plum-dark/70 leading-relaxed">
        <p>
          A Belezuura está comprometida em garantir que nosso site seja
          acessível a todas as pessoas, independentemente de suas capacidades ou
          tecnologias assistivas utilizadas.
        </p>
        <p>
          Trabalhamos continuamente para melhorar a experiência de todos os
          usuários, seguindo as diretrizes de acessibilidade WCAG 2.1 nível AA.
        </p>
        <p>
          Se você encontrar alguma barreira de acessibilidade ou tiver sugestões
          de melhoria, entre em contato conosco pelo e-mail{" "}
          <a
            href="mailto:info@belezuura.com.br"
            className="text-plum-dark underline underline-offset-4 hover:text-gold-warm transition-colors">
            info@belezuura.com.br
          </a>
          .
        </p>
      </div>
    </main>
  );
}
