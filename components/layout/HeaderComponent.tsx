// ─────────────────────────────────────────────────────────────
// HeaderComponent.tsx
// ─────────────────────────────────────────────────────────────

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/header/TopBar";
import { CategoriesBar } from "@/components/header/CategoriesBar";
import { MainBar } from "@/components/header/MainBar";
import { MobileDrawer } from "@/components/header/MobileDrawer";

// Estados e funções de controle do Header são gerenciados aqui e passados para os subcomponentes
export function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(() => {
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
  }, [searchQuery, router]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {<TopBar />}

      <MainBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        onMenuOpen={() => setMenuOpen(true)}
        searchOpen={searchOpen}
        onSearchToggle={() => setSearchOpen((p) => !p)}
      />

      <CategoriesBar />

      <MobileDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}

// Re-exporta SearchInput para importação direta
export { SearchInput } from "@/components/ui/SearchInput";
