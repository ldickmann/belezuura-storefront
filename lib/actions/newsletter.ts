"use server";

import { contacts } from "@wix/contacts";
import { ApiKeyStrategy, createClient } from "@wix/sdk";

/**
 * Cria um contato no Wix a partir do e-mail informado no formulário de newsletter.
 * Utiliza ApiKeyStrategy (servidor) para não expor credenciais ao cliente.
 *
 * @param email - Endereço de e-mail do assinante
 * @returns Objeto indicando sucesso ou mensagem de erro amigável
 */
export async function subscribeNewsletter(
  email: string
): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;

  if (!apiKey || !siteId) {
    console.error("WIX_API_KEY ou WIX_SITE_ID não definidos");
    return { success: false, message: "Erro de configuração do servidor." };
  }

  try {
    // Cliente com permissões de administrador — usado apenas no servidor
    const client = createClient({
      modules: { contacts },
      auth: ApiKeyStrategy({ apiKey, siteId }),
    });

    await client.contacts.createContact({
      emails: {
        items: [{ email, tag: "MAIN" }],
      },
      // Label para identificar assinantes da newsletter no painel Wix
      labelKeys: {
        items: ["custom.newsletter"],
      },
    });

    return { success: true, message: "Inscrição realizada com sucesso!" };
  } catch (error: unknown) {
    // Contato duplicado — Wix retorna erro 409
    if ((error as { details?: { applicationError?: { code?: string } } })?.details?.applicationError?.code === "CONTACT_EXISTS") {
      return { success: true, message: "E-mail já cadastrado!" };
    }

    console.error("Erro ao criar contato no Wix:", error);
    return { success: false, message: "Não foi possível realizar a inscrição. Tente novamente." };
  }
}