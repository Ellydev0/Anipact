import React from "react";
import type { fetchAnimeResponse } from "@/lib/fetchAnime";

const Anime = ({
  trendingAnime,
  popularAnime,
}: {
  trendingAnime: fetchAnimeResponse[];
  popularAnime: fetchAnimeResponse[];
}) => {
  return <div>Anime content goes here</div>;
};

export default Anime;
