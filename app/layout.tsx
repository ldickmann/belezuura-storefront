import type { Metadata } from "next";
import { Header } from "../components/layout/HeaderComponent";
import { Footer } from "../components/layout/FooterComponent";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Belezuura | Alfaiataria & Cosméticos",
    template: "%s | Belezuura",
  },
  description:
    "Peças de alfaiataria exclusivas e cosméticos premium para mulheres que valorizam elegância.",
  keywords: ["alfaiataria feminina", "cosméticos premium", "moda feminina"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Belezuura",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
