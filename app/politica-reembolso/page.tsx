import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Reembolso | Belezuura",
  description:
    "Saiba como funciona a política de trocas e devoluções da Belezuura.",
};

export default function PoliticaReembolsoPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <p className="text-[11px] font-bold tracking-widest text-plum-dark/40 uppercase mb-3">
        Garantia
      </p>
      <h1 className="text-3xl md:text-4xl font-serif text-plum-dark mb-8">
        Política de Reembolso
      </h1>

      <div className="space-y-8 text-sm text-plum-dark/70 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-plum-dark mb-2">
            Direito de arrependimento
          </h2>
          <p>
            Conforme o Código de Defesa do Consumidor, você pode solicitar a
            devolução em até{" "}
            <strong className="text-plum-dark">7 dias corridos</strong> após o
            recebimento do produto, sem necessidade de justificativa.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-plum-dark mb-2">
            Produto com defeito
          </h2>
          <p>
            Produtos com defeito de fabricação podem ser trocados em até 30 dias
            (produtos não duráveis) ou 90 dias (produtos duráveis) após o
            recebimento.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-plum-dark mb-2">
            Como solicitar
          </h2>
          <p>
            Entre em contato pelo e-mail{" "}
            <a
              href="mailto:info@belezuura.com.br"
              className="text-plum-dark underline underline-offset-4 hover:text-gold-warm transition-colors">
              info@belezuura.com.br
            </a>{" "}
            informando o número do pedido, motivo da devolução e fotos do
            produto (quando aplicável).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-plum-dark mb-2">
            Reembolso
          </h2>
          <p>
            Após aprovação, o reembolso é processado em até 10 dias úteis via o
            mesmo método de pagamento utilizado na compra.
          </p>
        </section>
      </div>
    </main>
  );
}
