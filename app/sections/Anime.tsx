"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useMemo } from "react";
import Notification from "@/components/Notifications";
import { fetchPopularAnime, fetchTrendingAnime } from "@/lib/fetchAnime";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CornerUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimeTypeStore } from "@/store/AnimeTypeStore";
import { useAnimeNotificationStore } from "@/store/AnimeNotificationStore";

const AnimeCard = dynamic(() => import("@/components/AnimeCard"), {
  ssr: false,
});

const Anime = () => {
  const { animeType, setAnimeType } = useAnimeTypeStore();
  const { message, setMessage } = useAnimeNotificationStore();
  const animeTypeRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(useGSAP);

  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["anime", animeType],
      queryFn:
        animeType === "trending" ? fetchTrendingAnime : fetchPopularAnime,
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.pageInfo.hasNextPage
          ? lastPage.pageInfo.currentPage + 1
          : undefined,
    });

  const animes = useMemo(
    () => data?.pages.flatMap((p) => p.media) ?? [],
    [data],
  );

  useEffect(() => {
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

  useGSAP(
    () => {
      gsap.fromTo(
        ".t",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.2,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
    },
    {
      dependencies: [animeType],
      scope: animeTypeRef,
    },
  );

  return (
    <div className="p-4 lg:px-8 mt-10">
      <div className="flex items-start justify-between flex-col gap-3 lg:flex-row lg:gap-0">
        <div className="font-xirod text-[1.3rem] lg:mb-14 xl:text-[2rem] ">
          <div className="inline-block" ref={animeTypeRef}>
            {animeType.split("").map((char, i) => (
              <h1 key={i} className="t opacity-0 inline-block translate-y-5">
                {char === " " ? "\u00A0" : char}
              </h1>
            ))}
          </div>{" "}
          <span>anime 🔥</span>
          <div className="text-sm text-muted">
            Source:{" "}
            <a href="https://anilist.co/" className="underline">
              Anilist
            </a>
          </div>
        </div>

        <button
          aria-label="Switch to popular anime"
          className="mb-14 flex text-[.8rem] gap-1 items-center
          bg-accent/25 border border-accent rounded-md px-2 py-1
          hover:bg-accent/30 active:bg-accent/50 transition-colors lg:mb-0"
          onClick={() => setAnimeType("popular")}
          style={{
            display: animeType === "trending" ? "flex" : "none",
          }}
        >
          <CornerUpRight size={16} />
          Switch to Popular Anime
        </button>
        <button
          aria-label="Switch to trending anime"
          className="mb-14 text-[.8rem] gap-1 items-center
          bg-accent/25 border border-accent rounded-md px-2 py-1
          hover:bg-accent/30 active:bg-accent/50 transition-colors lg:mb-0"
          onClick={() => setAnimeType("trending")}
          style={{
            display: animeType === "popular" ? "flex" : "none",
          }}
        >
          <CornerUpRight size={16} />
          Switch to Trending Anime
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
        {animes?.map((anime) => (
          <AnimeCard anime={anime} key={anime.id} isFetching={isLoading} />
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

export default Anime;
