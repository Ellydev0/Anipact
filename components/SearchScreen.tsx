import React, { useState, forwardRef } from "react";
import Searchbar from "./ui/searchbar";
import { truncateText } from "@/lib/truncateText";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { fetchAnimeSearch } from "@/lib/fetchAnime";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

type SearchScreenProps = object;

export const SearchScreen = forwardRef<HTMLDivElement, SearchScreenProps>(
  function SearchScreen(_props, ref) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm);

    const { data, error, isLoading } = useQuery({
      queryKey: ["anime search", debouncedSearchTerm],
      queryFn: () => fetchAnimeSearch(debouncedSearchTerm),
      enabled: debouncedSearchTerm.length >= 3,
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
    });

    return (
      <div className="bg-background/40 z-100 backdrop-blur-xs h-screen w-full fixed top-0 left-0 flex flex-col items-center justify-center">
        <div
          ref={ref}
          className=" relative w-[90%] pt-0 p-3 h-[60%] overflow-y-auto rounded-lg bg-background scrollbar xl:p-0 xl:w-[50%]"
        >
          <div className="sticky top-0 pt-3 w-full flex gap-4 items-center justify-center bg-background xl:px-2">
            <Searchbar
              disabled={false}
              className="w-full"
              setValue={setSearchTerm}
              input={true}
            />
          </div>

          <ul className="w-full mt-5 flex gap-3 flex-col xl:px-2">
            {isLoading
              ? Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <li key={index}>
                      <Skeleton className="h-10 w-full mb-2" />
                      <Skeleton className="h-3 w-[50%]" />
                    </li>
                  ))
              : data?.map((anime) => (
                  <li
                    key={anime.id}
                    className="bg-card/40 hover:bg-card/60 active:bg-card rounded-sm p-3 pl-4"
                  >
                    {truncateText(
                      anime.title.english || anime.title.romaji || "",
                      49,
                    )}
                    <p
                      className="text-xs text-muted"
                      title={anime.genres.join(", ")}
                    >
                      {anime.genres.join(", ") || "N/A"}
                    </p>
                  </li>
                ))}

            {error && (
              <li className="text-center text-red-600">An error occurred</li>
            )}
            {data?.length === 0 && !isLoading && (
              <li className="text-center text-muted-foreground">
                No results found
              </li>
            )}
            {data === undefined ||
              (data.length === 0 && !isLoading && (
                <li className="text-center text-muted-foreground">
                  Start by typing more than 3 letters to search
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  },
);

SearchScreen.displayName = "SearchScreen";

export default SearchScreen;
