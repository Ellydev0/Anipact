"use client";

import type { ANNNewsItem } from "@/lib/fetchAnimeNews";
import NewsList from "./NewsList";
import type { FC } from "react";
import { useMemo, useState } from "react";

interface NewsProps {
  data: ANNNewsItem[];
}

const News: FC<NewsProps> = ({ data }) => {
  const [filter, setFilter] = useState<
    "all" | "Anime" | "Manga" | "Live-Action"
  >("all");

  const filteredData = useMemo(() => {
    if (filter === "all") return data;
    return data.filter((item) => item.category === filter);
  }, [data, filter]);

  return (
    <>
      <div className="category gap-3 mt-3 flex justify-start items-center">
        {["all", "Anime", "Manga", "Live-Action"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item as typeof filter)}
            className={`text-[.7rem] rounded-full border border-accent py-1 px-3 transition-colors
              ${
                filter === item
                  ? "bg-accent"
                  : "bg-accent/25 hover:bg-accent/30 active:bg-accent/50"
              }`}
          >
            {item === "all" ? "All" : item}
          </button>
        ))}
      </div>

      <div className="mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredData.map((item, i) => (
          <NewsList key={i} pagedDatum={item} />
        ))}
      </div>
    </>
  );
};

export default News;
