import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós | Belezuura",
  description: "Conheça a história e os valores da Belezuura.",
};

export default function SobrePage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <p className="text-[11px] font-bold tracking-widest text-plum-dark/40 uppercase mb-3">
        Nossa história
      </p>
      <h1 className="text-3xl md:text-4xl font-serif text-plum-dark mb-8">
        Sobre a Belezuura
      </h1>

      <div className="prose prose-sm max-w-none text-plum-dark/70 space-y-5">
        <p>
          A Belezuura nasceu da paixão por beleza, moda e bem-estar. Somos mais
          que uma loja — somos um refúgio para quem acredita que se cuidar é um
          ato de amor próprio.
        </p>
        <p>
          Com sede em Blumenau/SC, reunimos as melhores marcas de maquiagem,
          cosméticos, moda feminina e acessórios para que cada cliente encontre
          exatamente o que precisa para se sentir incrível.
        </p>
        <p>
          Nosso compromisso é com a qualidade dos produtos, a experiência de
          compra e a satisfação de cada cliente que faz parte da nossa
          comunidade.
        </p>
      </div>
    </main>
  );
}
