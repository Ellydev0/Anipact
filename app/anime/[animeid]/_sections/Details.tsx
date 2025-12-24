"use client";
import Image from "next/image";
import { fetchAnimeDetailsResponseType } from "@/lib/fetchAnimeTypes";
import { truncateText } from "@/lib/truncateText";
import { Info, Star } from "lucide-react";
import countryList from "country-list";
import { useState } from "react";
import Episode from "@/app/anime/[animeid]/_sections/Episode";
import TrailerPlayer from "./Trailer";
import { Skeleton } from "@/components/ui/skeleton";
import { useWatchlistStore } from "@/store/WatchlistStore";

const Details = ({
  data,
  isLoading,
}: {
  data: fetchAnimeDetailsResponseType | undefined;
  isLoading: boolean;
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isCharacterExpanded, setIsCharacterExpanded] = useState(false);
  const [isEpisodeExpanded, setIsEpisodeExpanded] = useState(false);

  const { watchlist } = useWatchlistStore();

  function getFlagUrl(countryCode: string) {
    return `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
  }

  return (
    <div>
      {/* Banner */}
      <div className="absolute top-0 left-0 w-full h-[40vh] -z-1">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent to-background z-2"></div>
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Image
            src={data?.bannerImage || "/img/default.png"}
            alt="Banner Image"
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Poster and title */}
      <div className="flex flex-col lg:flex-row mt-20 w-full gap-0 lg:gap-24">
        {/* Poster */}
        <div className="shrink-0 w-50">
          {isLoading ? (
            <Skeleton className="w-50 h-75" />
          ) : (
            <Image
              src={data?.coverImage.extraLarge || "/img/default.png"}
              alt="cover image"
              width={200}
              height={400} // REAL height
              className="rounded-sm object-cover"
            />
          )}
          {watchlist.includes(data?.id || -1) && (
            <p className="text-sm text-muted flex items-center mt-5 gap-2">
              <Info size={16} /> Added to Watch list
            </p>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4 mt-10 lg:mt-40">
          {/* Title */}
          {isLoading ? (
            <Skeleton className="w-[70%] h-15" />
          ) : (
            <>
              <h1
                className="text-2xl font-xirod"
                title={data?.title.english || data?.title.romaji || ""}
              >
                {truncateText(
                  data?.title.english || data?.title.romaji || "",
                  50,
                )}
              </h1>
              <p className="text-sm text-muted">
                Source:{" "}
                <a href="https://anilist.co/" className="underline">
                  Anilist
                </a>
              </p>
            </>
          )}

          {/* Metadata */}
          {isLoading ? (
            <Skeleton className="w-[80%] h-15" />
          ) : (
            <>
              <div className="flex flex-wrap gap-2 text-[.8rem] text-muted-foreground items-center">
                <p className="flex items-center gap-1 text-star">
                  <Star fill="var(--star)" stroke="0" size={16} />{" "}
                  {data?.meanScore}
                </p>
                |<p>{data?.season}</p>|<p>{data?.seasonYear}</p>|
                <p>{data?.episodes ? `${data?.episodes} Episodes` : ""}</p>|
                <p>{data?.status}</p>|
                <p className="flex items-center gap-1">
                  <Image
                    src={getFlagUrl(data?.countryOfOrigin || "")}
                    width={20}
                    height={0}
                    style={{ height: "auto" }}
                    alt={data?.countryOfOrigin || ""}
                  />
                  {countryList.getName(data?.countryOfOrigin || "")}
                </p>
                |
                {data?.genres?.map((genre, index) => (
                  <p key={index}>
                    {genre}
                    {index !== data?.genres?.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 text-[.8rem] text-muted-foreground">
                <p>
                  Start Date: {data?.startDate?.month}/{data?.startDate?.year} |
                </p>
                <p>
                  End Date: {data?.endDate?.month}/{data?.endDate?.year} |
                </p>
                <p>
                  Next Airing Date:{" "}
                  {data?.status !== "FINISHED" &&
                    new Date(
                      (data?.nextAiringEpisode?.airingAt || 0) * 1000,
                    ).toLocaleString()}
                </p>
              </div>
            </>
          )}

          {/* Description */}
          {isLoading ? (
            <Skeleton className="h-40 w-full lg:w-[950px]" />
          ) : (
            <>
              <div className="relative">
                {!isDescriptionExpanded && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-linear-to-b from-transparent to-background z-10" />
                )}
                <div
                  className={`overflow-hidden transition-all duration-600 ease-in-out ${
                    isDescriptionExpanded ? "max-h-[2000px]" : "max-h-40"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: truncateText(data?.description || "", Infinity),
                  }}
                />
              </div>
              <button
                aria-label="Show more detail"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="bg-background hover:bg-muted-foreground/30 transition-colors text-foreground py-1 px-4 rounded border text-[.7rem] border-muted mt-2"
              >
                View {isDescriptionExpanded ? "less" : "more"} details
              </button>
            </>
          )}
        </div>
      </div>

      {/* Trailer */}

      {data?.trailer && <TrailerPlayer trailer={data?.trailer} />}

      {/* Characters */}
      <div className="mt-15">
        <h1 className="text-2xl font-xirod mb-10">Characters</h1>
        {isLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <>
            <div
              className={`relative grid md:grid-cols-4 lg:grid-cols-6 gap-y-4 ${
                isCharacterExpanded ? "max-h-[2000px]" : "max-h-50 lg:max-h-100"
              } overflow-hidden transition-all duration-600 ease-in-out`}
            >
              {!isCharacterExpanded && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-linear-to-b from-transparent to-background z-10"></div>
              )}
              {data?.characters.nodes.map((character, index) => (
                <div key={index}>
                  <Image
                    src={character.image.large}
                    alt={character.name.full}
                    width={150}
                    height={1}
                    className="h-auto rounded mr-2"
                  />
                  {character.name.full}
                </div>
              ))}
            </div>
            <button
              aria-label="Show more characters"
              onClick={() => setIsCharacterExpanded(!isCharacterExpanded)}
              className="bg-background w-full hover:bg-muted-foreground/30 transition-colors text-foreground py-1 px-4 rounded border text-[.7rem] border-muted"
            >
              View {isCharacterExpanded ? "less" : "more"} characters
            </button>
          </>
        )}
      </div>

      {/* Streaming Episodes */}
      <div>
        <h1 className="text-2xl font-xirod mt-15 mb-10">Streaming Episodes</h1>
        {isLoading ? (
          <Skeleton className="h-20 w-full" />
        ) : (
          <>
            <div
              className={`relative transition-all flex gap-3 flex-wrap max-h-[50px] overflow-hidden ${
                isEpisodeExpanded ? "max-h-[4000px]" : "max-h-[200px]"
              }`}
            >
              {!isEpisodeExpanded && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-linear-to-b from-transparent to-background z-10"></div>
              )}
              {data?.streamingEpisodes.map((episode, index) => (
                <Episode key={index} {...episode} />
              ))}
            </div>
            <button
              aria-label="Show more streaming episodes"
              onClick={() => setIsEpisodeExpanded(!isEpisodeExpanded)}
              className="bg-background w-full hover:bg-muted-foreground/30 transition-colors text-foreground py-1 px-4 rounded border text-[.7rem] border-muted"
            >
              View {isEpisodeExpanded ? "less" : "more"} episodes
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
