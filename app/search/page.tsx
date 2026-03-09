export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q ?? "";

  // TODO: Buscar produtos no Wix usando a query
  // Exemplo: GET https://www.wixapis.com/stores/v1/products/query

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Resultados para "{query}"</h1>
      {/* Grid de produtos aqui */}
    </main>
  );
}
