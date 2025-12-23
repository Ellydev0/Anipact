"use client";

import Details from "./_sections/Details";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeDetails } from "@/lib/fetchAnime";
import { useParams } from "next/navigation";
import Recommendations from "./_sections/Recommendations";

const AnimeDetailsPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["anime", params.animeid],
    queryFn: () => fetchAnimeDetails(Number(params.animeid)),
  });
  return (
    <div className="min-w-screen px-10 p-5 py-3 h-screen relative">
      <Details data={data} isLoading={isLoading} />
      <Recommendations mediaId={Number(params.animeid)} />
    </div>
  );
};

export default AnimeDetailsPage;
