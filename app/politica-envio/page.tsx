import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Envio | Belezuura",
  description: "Saiba como funciona o envio dos produtos da Belezuura.",
};

export default function PoliticaEnvioPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <p className="text-[11px] font-bold tracking-widest text-plum-dark/40 uppercase mb-3">
        Logística
      </p>
      <h1 className="text-3xl md:text-4xl font-serif text-plum-dark mb-8">
        Política de Envio
      </h1>

      <div className="space-y-8 text-sm text-plum-dark/70 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-plum-dark mb-2">
            Prazo de processamento
          </h2>
          <p>
            Os pedidos são processados em até 2 dias úteis após a confirmação do
            pagamento, exceto em feriados nacionais.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-plum-dark mb-2">
            Prazo de entrega
          </h2>
          <p>
            O prazo de entrega varia conforme a localidade do destinatário,
            geralmente entre 5 e 12 dias úteis. Regiões mais remotas podem ter
            prazos estendidos.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-plum-dark mb-2">
            Frete grátis
          </h2>
          <p>
            Oferecemos frete grátis para pedidos acima de R$ 299 em todo o
            Brasil. Compras abaixo desse valor terão o frete calculado no
            checkout conforme o CEP de destino.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-plum-dark mb-2">
            Rastreamento
          </h2>
          <p>
            Após o despacho, você receberá um e-mail com o código de
            rastreamento para acompanhar sua encomenda nos Correios ou
            transportadora parceira.
          </p>
        </section>
      </div>
    </main>
  );
}
