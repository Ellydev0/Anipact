import { useEffect, useRef, useState, memo } from "react";
import type { fetchInfiniteAnimeResponseType } from "@/lib/fetchAnimeTypes";
import { Star, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import Image from "next/image";
import { truncateText } from "@/lib/truncateText";
import { Skeleton } from "./ui/skeleton";

interface AnimeCardProps {
  anime: fetchInfiniteAnimeResponseType["media"];
  isFetching: boolean;
}

const AnimeCard = memo(function AnimeCard({
  anime,
  isFetching,
}: AnimeCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("/img/default.png");
  useEffect(() => {
    //is mobile
    const show = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      }
    };
    const imageSrc = () => {
      if (anime.coverImage?.extraLarge) {
        setImageSrc(anime.coverImage.extraLarge);
      }
    };
    show();
    imageSrc();
  }, [anime]);

  return (
    <>
      <Card
        className=" md:gap-4
      p-2 hover:border-accent/40 transition-colors border gap-0
      border-transparent"
      >
        <CardHeader className="p-0">
          <div className="">
            <div className="w-full relative">
              <div className="z-2 absolute text-[.6rem] flex items-center justify-center text-star bg-card/60 rounded-md p-1.5 left-1 bottom-1 backdrop-blur-md xl:p-2 xl:left-2 xl:bottom-2">
                <Star
                  fill="var(--star)"
                  size={14}
                  className=" mr-0.5 scale-90 xl:scale-100"
                  stroke="null"
                />
                <p> {anime.meanScore}</p>
              </div>
              <Bookmark
                size={37}
                stroke="var(--accent)"
                className="z-2 absolute bg-card/60 scale-80 rounded-md p-1.5 right-0 bottom-0 backdrop-blur-md md:scale-100 xl:p-2 md:bottom-2 md:right-2"
              />
              <div className="w-full relative">
                <div className="w-full relative h-full pt-[150%] overflow-hidden rounded-md cursor-pointer ">
                  <Image
                    src={imageSrc}
                    alt={
                      anime.title?.english || anime.title?.romaji || "Default"
                    }
                    fill
                    sizes="(max-width: 640px) 150px, (max-width: 1024px) 220px, 300px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <CardTitle
              className="mt-3 mb-2 text-[.8rem] xl:text-[1rem] active:text-muted-foreground cursor-pointer  transition-colors"
              title={anime.title?.english || anime.title?.romaji || ""}
            >
              {isFetching ? (
                <Skeleton className="h-4 w-[76%]" />
              ) : (
                <p className="flex">
                  {isMobile
                    ? truncateText(
                        anime.title?.english || anime.title?.romaji || "",
                        18,
                      )
                    : truncateText(
                        anime.title?.english || anime.title?.romaji || "",
                        36,
                      )}
                </p>
              )}
            </CardTitle>
          </div>

          {isFetching ? (
            <Skeleton className="w-full h-4" />
          ) : (
            <>
              {" "}
              {!isMobile && (
                <CardDescription className="relative overflow-hidden z-10">
                  <div className="bg-linear-to-r from-card via-transparent to-card absolute w-full h-full z-1 "></div>
                  {/* Left chevron */}
                  <button
                    onClick={() =>
                      containerRef.current?.scrollBy({
                        left: -120,
                        behavior: "smooth",
                      })
                    }
                    className="z-2 absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur p-1 rounded-full"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {/* Scroll container */}
                  <div
                    ref={containerRef}
                    className="flex gap-2 overflow-x-scroll no-scrollbar scroll-smooth px-6 text-white"
                  >
                    {anime.genres.map((genre, i) => (
                      <div
                        key={i}
                        className="shrink-0 bg-accent/25 backdrop-blur-md border border-accent py-1 px-2 rounded-full text-[.6rem]"
                      >
                        {genre}
                      </div>
                    ))}
                  </div>

                  {/* Right chevron */}
                  <button
                    onClick={() =>
                      containerRef.current?.scrollBy({
                        left: 120,
                        behavior: "smooth",
                      })
                    }
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-2 bg-background/80 backdrop-blur p-1 rounded-full"
                  >
                    <ChevronRight size={14} />
                  </button>
                </CardDescription>
              )}
            </>
          )}
        </CardHeader>
        <CardContent className="p-0 text-left text-muted text-[1rem]">
          <div
            className="text-[.6rem] gap-1 px-1 flex justify-between items-center"
            style={{
              flexWrap: `${isFetching ? "nowrap" : "wrap"}`,
            }}
          >
            {isFetching ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <p> {anime.status}</p>
            )}
            {isFetching ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <p>{anime.episodes} Episodes</p>
            )}
            {isFetching ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <p>{anime.season || "NULL"}</p>
            )}
            {isFetching ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <p>{anime.seasonYear || "NULL"}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
});

export default AnimeCard;
