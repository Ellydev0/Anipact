"use client";

import { fetchPopularAnime } from "@/lib/fetchAnime";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import styles from "./styles/Hero.module.css";
import { useEffect, useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import Nav from "../../components/Nav";

const Hero = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popularAnime"],
    queryFn: fetchPopularAnime,
  });

  const [trendingAnimeImage, setTrendingAnimeImage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!data) return;

    const updateImage = () => {
      const image =
        window.innerWidth < 1024
          ? data[0]?.coverImage.extraLarge
          : data[0]?.bannerImage || data[0]?.coverImage.extraLarge;

      setTrendingAnimeImage(image);
    };

    updateImage();
    window.addEventListener("resize", updateImage);

    return () => window.removeEventListener("resize", updateImage);
  }, [data]);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 4) + "...";
  };

  return (
    <div
      className={clsx(styles.hero, "relative")}
      style={{ backgroundImage: `url(${trendingAnimeImage})` }}
    >
      <Nav />

      <div
        className={clsx(
          "bg-background/60 p-4 lg:px-16 w-full h-full",
          "flex flex-col justify-center items-start lg:gap-0",
          "gap-6",
        )}
      >
        <h1 className="font-xirod lg:text-[3.4rem] text-[3rem] ">
          All of Anime Bound by One Pact
        </h1>
        <p className="text-[1rem] font-inter mb-7">
          Join millions staying in sync with trending anime and the latest news
          — all under one pact.
        </p>

        <div
          className={clsx(
            "flex flex-row justify-start items-center lg:w-[40%] p-1 pl-3 bg-muted/40 backdrop-blur-lg text py-2 rounded-sm hover:border-[0.5] hover:border-muted-foreground/50",
            "w-full",
          )}
        >
          <p
            className={clsx(
              "flex gap-2 justify-start items-center text-muted-foreground text-[.9rem]",
            )}
          >
            <Search /> Search Anime
          </p>
        </div>
      </div>

      <div className="absolute right-10 bottom-10 hover:text-muted-foreground/80 transition-colors text-[.9rem] cursor-pointer">
        <p className={clsx("font-xirod flex gap-2 ")}>
          {truncateText(
            data?.[0]?.title?.english || data?.[0]?.title?.native || "",
            20,
          )}
          {data && <ExternalLink />}
        </p>
      </div>
    </div>
  );
};

export default Hero;
