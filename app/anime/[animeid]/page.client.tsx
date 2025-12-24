"use client";

import Details from "./_sections/Details";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeDetails } from "@/lib/fetchAnime";
import Recommendations from "./_sections/Recommendations";

const AnimeDetailsClientPage = ({ animeid }: { animeid: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["anime", animeid],
    queryFn: () => fetchAnimeDetails(Number(animeid)),
  });

  return (
    <div className="min-w-screen px-10 p-5 py-3 h-screen relative">
      <Details data={data} isLoading={isLoading} />
      <Recommendations mediaId={Number(animeid)} />
    </div>
  );
};

export default AnimeDetailsClientPage;
