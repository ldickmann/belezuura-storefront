import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosso Time | Belezuura",
  description: "Conheça as pessoas por trás da Belezuura.",
};

export default function TimePage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <p className="text-[11px] font-bold tracking-widest text-plum-dark/40 uppercase mb-3">
        Pessoas
      </p>
      <h1 className="text-3xl md:text-4xl font-serif text-plum-dark mb-8">
        Nosso Time
      </h1>
      <p className="text-sm text-plum-dark/60 leading-relaxed">
        Somos uma equipe apaixonada por beleza e moda, dedicada a oferecer a
        melhor experiência de compra para nossos clientes. Cada pessoa do nosso
        time trabalha com propósito: fazer você se sentir especial.
      </p>
    </main>
  );
}
