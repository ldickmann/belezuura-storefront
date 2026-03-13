/**
 * Skeleton de carregamento da página de busca (Suspense boundary)
 */
export default function SearchLoading() {
  return (
    <main className="min-h-[60vh]">
      {/* Header skeleton */}
      <section className="bg-rose-soft/40 border-b border-sand/20 py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="h-2.5 w-10 bg-sand/30 rounded-full mb-3 animate-pulse" />
          <div className="h-8 w-56 bg-plum-dark/10 rounded-lg animate-pulse" />
          <div className="h-3.5 w-32 bg-plum-dark/6 rounded-lg mt-2.5 animate-pulse" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Barra de controles skeleton */}
        <div className="flex justify-between items-center mb-6 pb-5 border-b border-sand/20">
          <div className="h-4 w-24 bg-sand/20 rounded-lg animate-pulse hidden sm:block" />
          <div className="h-9 w-44 bg-sand/20 rounded-xl animate-pulse ml-auto" />
        </div>

        {/* Grid skeleton — 8 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse">
              <div className="aspect-3/4 bg-rose-soft rounded-2xl mb-3" />
              <div className="h-4 w-3/4 bg-plum-dark/8 rounded mb-2" />
              <div className="h-4 w-1/3 bg-plum-dark/6 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
