"use client";

import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAnimeRecommendations } from "@/lib/fetchAnime";
import AnimeCard from "@/components/AnimeCard";
import { useAnimeNotificationStore } from "@/store/AnimeNotificationStore";
import Notification from "@/components/Notifications";

interface RecommendationsProps {
  mediaId: number;
}

const Recommendations: React.FC<RecommendationsProps> = ({ mediaId }) => {
  const { setMessage, message } = useAnimeNotificationStore();

  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["anime-recommendations", mediaId],
      queryFn: fetchAnimeRecommendations,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.pageInfo.hasNextPage
          ? lastPage.pageInfo.currentPage + 1
          : undefined,
    });

  const animes = React.useMemo(
    () => data?.pages.flatMap((p) => p.nodes) ?? [],
    [data],
  );

  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(async () => {
            setMessage("Loading Anime ...");
            await fetchNextPage();
            setMessage("Done Loading Anime");
          }, 500);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, setMessage]);

  return (
    <div className="pb-2">
      <h1 className="text-lg md:text-2xl font-xirod mb-4 mt-15">
        Recommendations
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
        {animes.map((anime, i) => (
          <AnimeCard
            key={i}
            anime={anime.mediaRecommendation}
            isFetching={isLoading}
          />
        ))}
      </div>
      <Notification message={message} />
      {error && (
        <p className="text-red-500 text-[1rem] text-center">
          An error has occurred
        </p>
      )}
      <div ref={loadMoreRef} />
    </div>
  );
};

export default Recommendations;
