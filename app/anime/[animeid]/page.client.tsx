"use client";

import Details from "./_sections/Details";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeDetails } from "@/lib/fetchAnime";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";

const Recommendations = dynamic(() => import("./_sections/Recommendations"), {
  ssr: false,
});

const AnimeDetailsClientPage = ({ animeid }: { animeid: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["anime", animeid],
    queryFn: () => fetchAnimeDetails(Number(animeid)),
  });

  return (
    <div className="w-screen px-5 lg:px-10 p-5 py-3 relative">
      <Nav />
      <Details data={data} isLoading={isLoading} />
      <Recommendations mediaId={Number(animeid)} />
    </div>
  );
};

export default AnimeDetailsClientPage;
