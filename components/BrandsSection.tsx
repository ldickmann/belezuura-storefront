
import { Cinzel, Bodoni_Moda, Montserrat } from "next/font/google";

/*
  Design choice: Using specific fonts to approximate the brand logos without using images.
  - Versace: Radiates luxury, often serif.
  - Zara: High contrast serif/didone.
  - Gucci: Elegant serif.
  - Prada: Bold, distinct serif.
  - Calvin Klein: Clean sans-serif.
*/

const fontVersace = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const fontZara = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "700"] }); // High contrast
const fontPrada = Bodoni_Moda({ subsets: ["latin"], weight: ["700"] });
const fontCK = Montserrat({ subsets: ["latin"], weight: ["300", "400"] });

const BRANDS = [
    { name: "VERSACE", className: `${fontVersace.className} tracking-widest` },
    { name: "ZARA", className: `${fontZara.className} tracking-[0.2em] font-bold italic` }, // Approximating the overlap look with italic/spacing? No, just keep it clean.
    { name: "GUCCI", className: `${fontVersace.className} tracking-[0.1em]` },
    { name: "PRADA", className: `${fontPrada.className} font-bold tracking-wider` },
    { name: "Calvin Klein", className: `${fontCK.className} tracking-tight font-light text-xl` },
];

export default function BrandsSection() {
    return (
        <section className="py-10 w-full overflow-hidden" aria-label="Brands">
            <div className="container mx-auto px-4">
                {/*
          Using a responsive grid/flex layout.
          Mobile: Scrollable or stacked? Design shows a single row. Scrollable is safer for mobile.
          Desktop: Justify between.
        */}
                <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-8 lg:gap-12 opacity-90">
                    {BRANDS.map((brand, idx) => (
                        <span
                            key={idx}
                            className={`text-plum-dark text-2xl lg:text-3xl whitespace-nowrap select-none ${brand.className}`}
                        >
                            {brand.name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
