"use server";

/**
 * Cria um contato no Wix a partir do e-mail informado no formulário de newsletter.
 * Utiliza a Wix REST API v4 com ApiKey — sem depender do módulo @wix/contacts.
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
    const response = await fetch("https://www.wixapis.com/contacts/v4/contacts", {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "wix-site-id": siteId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        info: {
          emails: {
            items: [{ email, tag: "MAIN" }],
          },
          // Label para identificar assinantes da newsletter no painel Wix
          labelKeys: {
            items: ["custom.newsletter"],
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData: unknown = await response.json().catch(() => ({}));
      const code = (errorData as { details?: { applicationError?: { code?: string } } })
        ?.details?.applicationError?.code;

      // Contato duplicado — Wix retorna 409
      if (code === "CONTACT_EXISTS") {
        return { success: true, message: "E-mail já cadastrado!" };
      }

      console.error("Wix API error:", errorData);
      return { success: false, message: "Não foi possível realizar a inscrição. Tente novamente." };
    }

    return { success: true, message: "Inscrição realizada com sucesso!" };
  } catch (error: unknown) {
    console.error("Erro ao criar contato no Wix:", error);
    return { success: false, message: "Não foi possível realizar a inscrição. Tente novamente." };
  }
}