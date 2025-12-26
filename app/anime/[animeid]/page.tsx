import { Metadata } from "next";
import AnimeDetailsClientPage from "./page.client";
import { fetchAnimeMetadata } from "@/lib/fetchAnime";

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

const AnimeDetailsPage = async ({
  params,
}: {
  params: Promise<{ animeid: string }>;
}) => {
  const animeId = await params.then((params) => params.animeid);

  return <AnimeDetailsClientPage animeid={animeId} />;
};

export default AnimeDetailsPage;
