import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perguntas Frequentes | Belezuura",
  description: "Respostas para as dúvidas mais comuns sobre a Belezuura.",
};

const FAQ_ITEMS = [
  {
    question: "Qual o prazo de entrega?",
    answer:
      "O prazo de entrega varia conforme sua localidade, geralmente entre 5 e 12 dias úteis após a confirmação do pagamento.",
  },
  {
    question: "Como faço para rastrear meu pedido?",
    answer:
      "Após o envio, você receberá um e-mail com o código de rastreamento para acompanhar sua encomenda.",
  },
  {
    question: "Posso trocar ou devolver um produto?",
    answer:
      "Sim. Aceitamos trocas e devoluções em até 7 dias corridos após o recebimento, conforme nossa Política de Reembolso.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos cartões de crédito e débito das principais bandeiras, PIX e boleto bancário.",
  },
  {
    question: "O frete grátis é para todo o Brasil?",
    answer:
      "Sim! Oferecemos frete grátis para compras acima de R$ 299 para todo o território nacional.",
  },
];

export default function FaqPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <p className="text-[11px] font-bold tracking-widest text-plum-dark/40 uppercase mb-3">
        Dúvidas
      </p>
      <h1 className="text-3xl md:text-4xl font-serif text-plum-dark mb-10">
        Perguntas Frequentes
      </h1>

      <div className="space-y-6">
        {FAQ_ITEMS.map(({ question, answer }) => (
          <div
            key={question}
            className="border-b border-sand/30 pb-6 last:border-none">
            <h2 className="text-base font-semibold text-plum-dark mb-2">
              {question}
            </h2>
            <p className="text-sm text-plum-dark/60 leading-relaxed">
              {answer}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
