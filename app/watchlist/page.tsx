"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnimeWatchlist } from "@/lib/fetchAnime";
import { useWatchlistStore } from "@/store/WatchlistStore";
import AnimeCard from "@/components/AnimeCard";
import { useEffect, useState } from "react";

const WatchlistPage: React.FC = () => {
  const { watchlist, hasHydrated } = useWatchlistStore();
  const [ready, setReady] = useState(false);

  // Wait for Zustand persist to hydrate
  useEffect(() => {
    const isHydrate = () => {
      if (hasHydrated) setReady(true);
    };
    isHydrate();
  }, [hasHydrated]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["anime", "watchlist"],
    queryFn: () => fetchAnimeWatchlist(watchlist),
    enabled: ready && watchlist.length > 0, // only fetch when hydrated and not empty
  });
  return (
    <div className="p-5">
      <h1 className="text-[2rem] xl:text-[3rem] font-xirod mt-10 xl:ml-6 mb-20">
        Your Watchlist
      </h1>

      {isLoading && <p>Loading anime...</p>}
      {!isLoading && data === undefined && ready && (
        <p>Your watchlist is empty.</p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
        {data?.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} isFetching={isLoading} />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-[1rem] text-center">
          An error has occurred
        </p>
      )}
    </div>
  );
};

export default WatchlistPage;
