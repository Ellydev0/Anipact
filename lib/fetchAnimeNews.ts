import xml2js from "xml2js";

// Define types
export type NewsCategory = "Anime" | "Manga" | "Live-Action";

export type ANNNewsItem = {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  description: string;
  category: NewsCategory;
};

// Fetch function
export async function fetchAnimeNews(): Promise<ANNNewsItem[]> {
  const res = await fetch(
    "https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us",
    { cache: "force-cache", next: { revalidate: 900 } },
  );
  const text = await res.text();
  const parsed = await xml2js.parseStringPromise(text, {
    explicitArray: false,
  });

  const animeNews: ANNNewsItem[] = parsed.rss.channel.item;

  // Filter only Anime, Manga, Live-Action
  const allowedCategories: NewsCategory[] = ["Anime", "Manga", "Live-Action"];
  const filteredAnimeNews: ANNNewsItem[] = animeNews.filter(
    (item: ANNNewsItem) => {
      return allowedCategories.includes(item.category);
    },
  );

  return filteredAnimeNews.slice(0, 90);
}
