import type { Metadata } from "next";
import { Mail, MapPin, Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Fale Conosco | Belezuura",
  description: "Entre em contato com a Belezuura.",
};

export default function ContatoPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <p className="text-[11px] font-bold tracking-widest text-plum-dark/40 uppercase mb-3">
        Atendimento
      </p>
      <h1 className="text-3xl md:text-4xl font-serif text-plum-dark mb-10">
        Fale Conosco
      </h1>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Mail
            size={18}
            className="text-gold-warm mt-0.5 shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-plum-dark mb-0.5">
              E-mail
            </p>
            <a
              href="mailto:info@belezuura.com.br"
              className="text-sm text-plum-dark/60 hover:text-gold-warm transition-colors">
              info@belezuura.com.br
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Instagram
            size={18}
            className="text-gold-warm mt-0.5 shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-plum-dark mb-0.5">
              Instagram
            </p>
            <a
              href="https://www.instagram.com/belezuurastore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-plum-dark/60 hover:text-gold-warm transition-colors">
              @belezuurastore
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin
            size={18}
            className="text-gold-warm mt-0.5 shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-plum-dark mb-0.5">
              Localização
            </p>
            <p className="text-sm text-plum-dark/60">Blumenau, SC — Brasil</p>
          </div>
        </div>
      </div>

      <div className="mt-10 p-5 rounded-2xl bg-rose-soft/40 border border-sand/20">
        <p className="text-sm text-plum-dark/60 leading-relaxed">
          Nosso time responde em até{" "}
          <strong className="text-plum-dark">24 horas úteis</strong>. Para
          dúvidas sobre pedidos, informe o número do pedido no assunto do
          e-mail.
        </p>
      </div>
    </main>
  );
}
