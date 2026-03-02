import { getWixClient } from "@/lib/wix-client";

export interface Category {
  id: string;
  name: string;
  slug: string;
  media?: {
    url: string;
    alt: string;
  };
}

export async function getCategories(): Promise<Category[]> {
  try {
    const client = getWixClient();
    const response = await client.collections.queryCollections().find();

    return response.items.map((item) => ({
      id: item._id ?? "",
      name: item.name ?? "",
      slug: item.slug ?? "",
      media: item.media?.mainMedia?.image?.url ? {
        url: item.media.mainMedia.image.url,
        alt: item.media.mainMedia.image.altText ?? item.name ?? ""
      } : undefined
    }));
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
}
