import { Metadata } from "next";
import dynamic from "next/dynamic";
import { fetchAnimeMetadata } from "@/lib/fetchAnime";

import Details from "./_sections/Details";
import { fetchAnimeDetails } from "@/lib/fetchAnime";
import Nav from "@/components/Nav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ animeid: string }>;
}): Promise<Metadata> {
  const animeId = Number(await params.then((params) => params.animeid));
  // Guard: invalid route param
  if (Number.isNaN(animeId)) {
    return {
      title: "Anime Details | Anipact",
      description: "Anime details on Anipact",
    };
  }

  const data = await fetchAnimeMetadata(animeId);

  const title = data?.title?.english ?? data?.title?.romaji ?? "Anime Details";

  return {
    title,
    description: data?.description ?? "Anime details on Anipact",
    openGraph: {
      siteName: "Anipact",
      title,
      description: data?.description ?? "Anime details on Anipact",
      type: "website",
      locale: "en_US",
      images: data?.coverImage?.extraLarge
        ? [
            {
              url: data.coverImage.extraLarge,
              width: 800,
              height: 600,
            },
          ]
        : [],
    },
  };
}

const Recommendations = dynamic(() => import("./_sections/Recommendations"), {
  ssr: true,
});

const AnimeDetailsPage = async ({
  params,
}: {
  params: Promise<{ animeid: string }>;
}) => {
  const animeId = await params.then((params) => params.animeid);

  const data = await fetchAnimeDetails(Number(animeId));

  return (
    <div className="w-screen px-5 lg:px-10 p-5 py-3 relative">
      <Nav />
      <Details data={data} />
      <Recommendations mediaId={Number(animeId)} />
    </div>
  );
};

export default AnimeDetailsPage;
