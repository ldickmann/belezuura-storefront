"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/header/TopBar";
import { CategoriesBar } from "@/components/header/CategoriesBar";
import { MainBar } from "@/components/header/MainBar";
import { MobileDrawer } from "@/components/header/MobileDrawer";

export function Header() {
  const router = useRouter();
  const [showTopBar, setShowTopBar] = useState(true);
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
      {showTopBar && <TopBar onDismiss={() => setShowTopBar(false)} />}

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
