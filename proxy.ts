import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Se o visitante já tem um token de sessão, deixa passar
  if (request.cookies.get("session")?.value) {
    return NextResponse.next();
  }

  // Se não tem, cria um token anônimo para ele
  const response = NextResponse.next();
  const client = createClient({
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });

  const visitorTokens = await client.auth.generateVisitorTokens();
  response.cookies.set("session", JSON.stringify(visitorTokens), {
    // Cookie dura 1 ano (tempo padrão do token anônimo do Wix)
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false, // Precisa ser false para o browser ler ao fazer login
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

// O proxy roda em TODAS as rotas, exceto assets estáticos
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|svg|logo).*)"],
};