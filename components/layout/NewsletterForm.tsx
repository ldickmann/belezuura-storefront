"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/lib/actions/newsletter";

/**
 * Componente NewsletterForm
 *
 * Formulário de inscrição na newsletter da Belezuura.
 * Client Component necessário para gerenciar estado do formulário.
 * O envio é feito via Server Action, mantendo a API Key segura no servidor.
 *
 * @returns {JSX.Element} Formulário com input de e-mail e botão de envio
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    const result = await subscribeNewsletter(email);

    setStatus(result.success ? "success" : "error");
    setMessage(result.message);

    if (result.success) setEmail("");
  }

  return (
    <div className="flex flex-col gap-3">
      <form
        onSubmit={handleSubmit}
        className="min-w-0 flex items-center rounded-[5px] overflow-hidden border border-rose-soft/20 bg-rose-soft/10">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          aria-label="E-mail para newsletter"
          required
          disabled={status === "loading"}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-rose-soft placeholder:text-rose-soft/30 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-rose-soft text-plum-dark text-sm font-bold px-4 py-3 hover:bg-gold-warm transition-colors shrink-0 disabled:opacity-50">
          {status === "loading" ? "..." : "Enviar"}
        </button>
      </form>

      {/* Feedback de sucesso ou erro */}
      {message && (
        <p
          className={`text-xs ${status === "success" ? "text-sage" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
