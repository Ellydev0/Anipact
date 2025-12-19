"use client";

import { fetchMostPopularAnime } from "@/lib/fetchAnime";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import styles from "./styles/Hero.module.css";
import { useEffect, useState, useRef } from "react";
import { Star, ExternalLink, ChevronLeft } from "lucide-react";
import { truncateText, stripHtml } from "@/lib/truncateText";
import Nav from "../../components/Nav";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Hero = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["mostPopularAnime"],
    queryFn: fetchMostPopularAnime,
  });

  const [trendingAnimeImage, setTrendingAnimeImage] = useState<string[]>([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!data) return;

    const updateImage = () => {
      const image =
        window.innerWidth < 1024
          ? data[index]?.coverImage.extraLarge
          : data[index]?.bannerImage || data[index]?.coverImage.extraLarge;

      setTrendingAnimeImage((prev) => [...prev, image]);
    };

    updateImage();
    window.addEventListener("resize", updateImage);

    return () => window.removeEventListener("resize", updateImage);
  }, [data, index]);

  useEffect(() => {
    if (!data) return;
    document.documentElement.style.setProperty(
      "--accent",
      data[index].coverImage.color,
    );
  }, [data, index]);

  return (
    <div className={clsx(styles.hero, "relative lg:h-[84vh] h-[90vh]")}>
      <Nav />

      <div
        className="flex h-full absolute top-0 inset-0 -z-1 transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {trendingAnimeImage.map((image, i) => (
          <div key={i} className="relative min-w-full h-full bg-muted">
            <Image
              src={image}
              alt=""
              fill
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex w-full h-full justify-between items-center absolute -top-10 px-5 lg:px-8 lg:h-screen">
        <ChevronLeft
          strokeWidth={1.75}
          size={40}
          onClick={() =>
            setIndex((index - 1 + (data?.length || 7)) % (data?.length || 7))
          }
          className="hover:bg-muted/60 hover:backdrop-blur-md p-1 rounded-sm transition-colors active:bg-muted/40 active:backdrop-blur-none"
        />
        <ChevronRight
          strokeWidth={1.75}
          onClick={() => setIndex((index + 1) % (data?.length || 7))}
          size={40}
          className="hover:bg-muted/60 hover:backdrop-blur-md p-1 rounded-sm transition-colors active:bg-muted/40 active:backdrop-blur-none"
        />
      </div>

      <div
        className={clsx(
          "bg-linear-to-t from-10% from-background to-background/0 p-4 lg:px-8 w-full h-full",
          "flex flex-col justify-end items-start lg:gap-3 z-1",
          "gap-6",
        )}
      >
        {isLoading ? (
          <Skeleton className="w-[60%] h-[90px]" />
        ) : (
          <Tooltip>
            <div className="font-xirod text-left text-[1.6rem] flex flex-wrap z-1 lg:text-[2.6rem] lg:flex-row">
              <TooltipTrigger className="">
                {truncateText(
                  data?.[index]?.title?.english ||
                    data?.[index]?.title?.native ||
                    "anipact",
                  17,
                )}
              </TooltipTrigger>
              {data && (
                <div className="hover:bg-muted/40 cursor-pointer w-fit h-fit backdrop-blur-md rounded-full transition-colors p-1.5">
                  <ExternalLink size={30} />
                </div>
              )}{" "}
              {data && index === 0 && (
                <div className="cursor-default text-[.6rem] ml-4 bg-accent/25 backdrop-blur-md border border-accent rounded-full py-1.5 px-3 h-fit">
                  most popular
                </div>
              )}
            </div>
            <TooltipContent>
              <p>
                {data?.[index]?.title?.english ||
                  data?.[index]?.title?.native ||
                  "anipact"}
              </p>
            </TooltipContent>
          </Tooltip>
        )}

        {isLoading ? (
          <Skeleton className="w-[34%] rounded-full h-[25px]" />
        ) : (
          <div className="flex flex-wrap text-[.9rem] text-muted">
            <div className="rating__count  flex items-center">
              <Star
                fill="var(--star)"
                size={20}
                className="ml-2 mr-1"
                stroke="null"
              />
              <span className="text-star mr-1">
                {data?.[index]?.meanScore || 0}
              </span>{" "}
              |
            </div>
            <div className="season__info flex items-center">
              <span className="mx-1">
                {data?.[index]?.season.toLowerCase()}
              </span>
              <span className="mx-1">{data?.[index]?.seasonYear}</span> |
            </div>

            <div className="genres flex items-center">
              {data?.[index]?.genres.map((genre, index) => (
                <span key={index} className="mx-1">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}

        {isLoading ? (
          <Skeleton className="w-[80%] h-[35px]" />
        ) : (
          <p className="text-[1rem] mb-7">
            {truncateText(
              stripHtml(
                data?.[index]?.description ||
                  "Join millions staying in sync with trending anime and the latest news — all under one pact.",
              ),
              200,
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero;
