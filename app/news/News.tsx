"use client";

import { ANNNewsItem } from "@/lib/fetchAnimeNews";
import { truncateText } from "@/lib/truncateText";
import { Interweave } from "interweave";
import { ExternalLink } from "lucide-react";
import type { FC } from "react";

interface NewsProps {
  data?: ANNNewsItem;
}

const News: FC<NewsProps> = ({ data }) => {
  return (
    <div className="rounded-md p-3 border border-muted-foreground w-2xl">
      <h1 className="text-xl font-bold inline">
        {truncateText(data?.title || "", 85)}
        <a
          className="inline-block ml-3 hover:bg-muted-foreground/50 active:bg-muted-foreground p-1 rounded-full"
          href="https://www.animenewsnetwork.com/news/2025-12-26/animeigo-releases-the-dagger-of-kamui-anime-film-on-blu-ray-disc-on-april-7/.232539"
        >
          <ExternalLink size={19} />
        </a>
      </h1>

      <div className="mt-2 text-muted">
        <Interweave content={data?.description} />
      </div>

      <div className="flex justify-between mt-5">
        <p className="mt-2 text-[.7rem] italic text-muted-foreground">
          Fri, 26 Dec 2025 16:00:00 -0500
        </p>
        <p className="text-[.7rem] rounded-full bg-accent py-1 px-3">Anime</p>
      </div>
    </div>
  );
};

export default News;
