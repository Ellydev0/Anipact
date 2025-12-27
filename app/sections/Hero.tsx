"use client";

import { fetchMostPopularAnime } from "@/lib/fetchAnime";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
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
import Link from "next/link";
import { fetchMostPopularAnimeResponseType } from "@/lib/fetchAnimeTypes";

interface HeroProps {
  data: fetchMostPopularAnimeResponseType[];
  isLoading: boolean;
}

const Hero = ({ data, isLoading }: HeroProps) => {
  const [mostPopularAnimeImage, setMostPopularAnimeImage] = useState<string[]>(
    [],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!data) return;

    const updateImage = () => {
      const images: string[] = [];
      data.map((datum) => {
        const image =
          window.innerWidth < 1024
            ? datum?.coverImage.extraLarge
            : datum?.bannerImage || datum?.coverImage.extraLarge;
        images.push(image);
      });
      setMostPopularAnimeImage([...images]);
    };

    updateImage();

    window.addEventListener("resize", updateImage);

    return () => window.removeEventListener("resize", updateImage);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    document.documentElement.style.setProperty(
      "--accent",
      data[index].coverImage.color,
    );
  }, [data, index]);

  return (
    <div className={clsx("relative w-full h-[90vh] overflow-hidden")}>
      <Nav />

      <div
        className="flex absolute top-0 inset-0 -z-1 transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {mostPopularAnimeImage.map((image, i) => (
          <div key={i} className="relative min-w-full h-[90vh]">
            <Image
              src={image || "/img/default.png"}
              alt=""
              fill
              fetchPriority={i === 0 ? "high" : "auto"}
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {!isLoading && (
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
      )}

      <div
        className={clsx(
          "bg-linear-to-t from-10% from-background to-background/0 p-4 lg:px-8 w-full h-full",
          "flex flex-col justify-end items-start lg:gap-3 z-1",
          "gap-6",
        )}
      >
        {isLoading ? (
          <Skeleton className="w-[60%] h-22.5" />
        ) : (
          <Tooltip>
            <div className="font-xirod text-left items-start text-[1.6rem] z-1 lg:flex lg:text-[2.6rem] lg:flex-row">
              <TooltipTrigger className="">
                {truncateText(
                  data?.[index]?.title?.english ||
                    data?.[index]?.title?.romaji ||
                    "anipact",
                  17,
                )}
              </TooltipTrigger>

              <div className="flex items-center">
                {data && (
                  <Link
                    href={`anime/${data[index].id}`}
                    className="hover:bg-muted/40 cursor-pointer w-fit h-fit backdrop-blur-md rounded-full transition-colors p-1.5"
                  >
                    <ExternalLink size={30} />
                  </Link>
                )}{" "}
                {data && index === 0 && (
                  <div className="cursor-default text-[.6rem] ml-4 bg-accent/25 backdrop-blur-md border border-accent rounded-full py-1.5 px-3 h-fit">
                    most popular
                  </div>
                )}
              </div>
            </div>
            <TooltipContent>
              <p>
                {data?.[index]?.title?.english ||
                  data?.[index]?.title?.romaji ||
                  "anipact"}
              </p>
            </TooltipContent>
          </Tooltip>
        )}

        {isLoading ? (
          <Skeleton className="w-[34%] rounded-full h-6.25" />
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
          <Skeleton className="w-[80%] h-8.75" />
        ) : (
          <p className="text-[1rem] w-full lg:w-[70%] mb-7">
            {truncateText(
              stripHtml(
                data?.[index]?.description ||
                  "Join millions staying in sync with trending anime and the latest news — all under one pact.",
              ),
              150,
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero;
