import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Seu carrinho de compras Belezuura.",
};

export default function CarrinhoPage() {
  return (
    <section className="container mx-auto px-4 py-16 min-h-[60vh]">
      <h1 className="text-3xl font-serif text-plum-dark mb-8">
        Carrinho de Compras
      </h1>
      <p className="text-plum-dark/60">Seu carrinho está vazio.</p>
    </section>
  );
}
