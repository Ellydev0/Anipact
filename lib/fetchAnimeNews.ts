import { useQuery } from "@tanstack/react-query";
import xml2js from "xml2js";

// Define types
export type NewsCategory = "Anime" | "Manga" | "Live-Action";

export type ANNNewsItem = {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: Record<string, any>;
  categories: NewsCategory[];
};

// Fetch function
async function fetchAnimeNews(): Promise<ANNNewsItem[]> {
  const res = await fetch(
    "https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us",
  );
  const text = await res.text();
  const parsed = await xml2js.parseStringPromise(text, {
    explicitArray: false,
  });

  let items = parsed.rss.channel.item;

  // Normalize to array
  if (!Array.isArray(items)) items = [items];

  // Filter only Anime, Manga, Live-Action
  const allowedCategories: NewsCategory[] = ["Anime", "Manga", "Live-Action"];
  const filteredItems: ANNNewsItem[] = items
    .map((item: any) => ({
      title: item.title,
      pubDate: item.pubDate,
      link: item.link,
      guid: item.guid,
      author: item.author || "",
      thumbnail: item.thumbnail || "",
      description: item.description || "",
      content: item.content || "",
      enclosure: item.enclosure || {},
      categories: Array.isArray(item.categories)
        ? (item.categories.filter((c: string) =>
            allowedCategories.includes(c as NewsCategory),
          ) as NewsCategory[])
        : [],
    }))
    .filter((item: ANNNewsItem) => item.categories.length > 0);

  return filteredItems;
}

// React Query hook
export function useAnimeNews() {
  return useQuery<ANNNewsItem[]>({
    queryKey: ["anime-news"],
    queryFn: fetchAnimeNews,
    staleTime: 1000 * 60 * 15, // 15 min cache
  });
}
