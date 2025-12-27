"use client";

import Nav from "@/components/Nav";
import { useAnimeNews } from "@/lib/fetchAnimeNews";
import News from "./News";

const AnimeNewsPage = () => {
  // const { data, isLoading, error } = useAnimeNews();
  //

  return (
    <>
      <Nav active={2} />

      <div className="p-10">
        <div className="mt-13">
          <h1 className="text-[2.3rem] font-xirod">Media Updates</h1>
          <div className="category gap-3 mt-3 flex justify-start items-center">
            <button className="text-[.7rem] rounded-full bg-accent/25 border border-accent py-1 px-3 hover:bg-accent/30 active:bg-accent/50 transition-colors">
              All
            </button>
            <button className="text-[.7rem] rounded-full bg-accent/25 border border-accent py-1 px-3 hover:bg-accent/30 active:bg-accent/50 transition-colors">
              Anime
            </button>
            <button className="text-[.7rem] rounded-full bg-accent/25 border border-accent py-1 px-3 hover:bg-accent/30 active:bg-accent/50 transition-colors">
              Manga
            </button>
            <button className="text-[.7rem] rounded-full bg-accent/25 border border-accent py-1 px-3 hover:bg-accent/30 active:bg-accent/50 transition-colors">
              Live Action
            </button>
          </div>
        </div>
        <div className="mt-15 flex flex-col justify-center items-center">
          <News />
        </div>
      </div>
    </>
  );
};

export default AnimeNewsPage;
