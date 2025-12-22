"use client";
import AnimeCard from "@/components/AnimeCard";
import { useEffect, useRef, useMemo } from "react";
import { fetchTrendingAnime } from "@/lib/fetchAnime";
import { useInfiniteQuery } from "@tanstack/react-query";

const Anime = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["trending-anime"],
      queryFn: fetchTrendingAnime,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.pageInfo.hasNextPage
          ? lastPage.pageInfo.currentPage + 1
          : undefined,
    });

  const animes = useMemo(
    () => data?.pages.flatMap((p) => p.media) ?? [],
    [data],
  );

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { rootMargin: "200px" },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="p-4 lg:px-8 mt-10">
      <h1 className="font-xirod text-[1.3rem] mb-14 xl:text-[2rem]">
        Trending anime 🔥
      </h1>

      <div className="flex flex-wrap items-start justify-between gap-10 lg:gap-15">
        {animes?.map((anime) => (
          <AnimeCard anime={anime} key={anime.id} isFetching={isFetching} />
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-[1rem] text-center">
          An error has occurred
        </p>
      )}
      <div ref={loadMoreRef} />
    </div>
  );
};

export default Anime;
