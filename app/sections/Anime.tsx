"use client";
// import { fetchTrendingAnime } from "@/lib/fetchAnime";
// import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ChevronRight,
  Star,
  ChevronLeft,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const Anime = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["mostTrendingAnime"],
  //   queryFn: fetchTrendingAnime,
  // });
  //

  const containerRef = useRef<HTMLDivElement>(null);
  const [showGenres, setShowGenres] = useState(true);

  useEffect(() => {
    //is mobile
    const show = () => {
      if (window.innerWidth < 768) {
        setShowGenres(false);
      }
    };
    show();
  }, []);

  return (
    <div className="p-4 lg:px-8 mt-10">
      <h1 className="font-xirod text-[1.3rem] mb-14 xl:text-[2rem]">
        Trending anime 🔥
      </h1>

      <Card
        className="md:w-[40%] lg:w-[20%] md:gap-4
        p-2 hover:border-accent/40 transition-colors border gap-0
        border-transparent  w-[170px]"
      >
        <CardHeader className="p-0">
          <div className="">
            <div className="w-full relative">
              <div className="absolute text-[.6rem] flex items-center justify-center text-star bg-card/60 rounded-md p-1.5 left-1 bottom-1 backdrop-blur-md xl:p-2 xl:left-2 xl:bottom-2">
                <Star
                  fill="var(--star)"
                  size={14}
                  className=" mr-0.5 scale-90 xl:scale-100"
                  stroke="null "
                />
                <p> 75</p>
              </div>
              <Bookmark
                size={37}
                stroke="var(--accent)"
                className="absolute bg-card/60 scale-80 rounded-md p-1.5 right-0 bottom-0 backdrop-blur-md md:scale-100 xl:p-2 md:bottom-2 md:right-2"
              />

              <Image
                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx183291-qm3bQT1wpmka.jpg"
                width={200}
                height={100}
                className="rounded-md w-full h-auto"
                alt="Default"
              />
            </div>

            <CardTitle
              className="mt-3 mb-2 text-[.8rem] xl:text-[1rem] active:text-muted-foreground cursor-pointer transition-colors"
              title="Akujiki-Reijou-to-Kyouketsu-Koushaku-Sono-Mamono-Watashi-ga-Oishiku-Itadakimasu"
            >
              <p className="flex">Akujiki-Reijou-to-Kyouketsu-Koushaku... </p>
            </CardTitle>
          </div>

          {showGenres && (
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
                {[
                  "Action",
                  "Action",
                  "Action",
                  "Action",
                  "Adventure",
                  "Fantasy",
                  "Music",
                  "Seinen",
                ].map((genre, i) => (
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
        </CardHeader>
        <CardContent className="p-0 text-left text-muted-foreground text-[1rem]">
          <div className="text-[.6rem] flex-wrap gap-1 px-1 flex justify-between items-center ">
            <p> RELEASING</p>
            <p>123 Episodes</p>
            <p>WINTER</p>
            <p>2025</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Anime;
