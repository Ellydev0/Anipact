"use client";

import { ANNNewsItem } from "@/lib/fetchAnimeNews";
import { truncateText } from "@/lib/truncateText";
import { Interweave } from "interweave";
import { ExternalLink } from "lucide-react";
import type { FC } from "react";
import { useState, useEffect } from "react";
import LoadingList from "./LoadingList";

interface NewsProps {
  pagedDatum?: ANNNewsItem;
}

const NewsList: FC<NewsProps> = ({ pagedDatum }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const m = () => {
      setMounted(true);
    };
    m();
  }, []);

  if (!mounted) return <LoadingList />;

  return (
    <div className="rounded-md p-3 mb-4 border border-muted-foreground flex flex-col justify-between">
      <h1 className="text-lg font-bold inline">
        {truncateText(pagedDatum?.title || "", 85)}
        <a
          className="inline-block ml-3 hover:bg-muted-foreground/50 active:bg-muted-foreground p-1 rounded-full"
          href={pagedDatum?.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={19} />
        </a>
      </h1>

      <div className="mt-2 text-sm text-muted">
        <Interweave content={pagedDatum?.description} />
      </div>

      <div className="flex justify-between mt-5 text-xs">
        <p className="mt-2 text-[.7rem] text-muted-foreground">
          {new Date(pagedDatum?.pubDate as string).toLocaleString()}
        </p>
        <p className="text-[.7rem] rounded-full bg-accent py-1 px-3">
          {pagedDatum?.category}
        </p>
      </div>
    </div>
  );
};

export default NewsList;
