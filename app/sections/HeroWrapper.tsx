import Hero from "./Hero";
import { fetchMostPopularAnime } from "@/lib/fetchAnime";

const HeroFetching = async () => {
  const data = await fetchMostPopularAnime();
  return (
    <div>
      <Hero data={data} isLoading={!data} />
    </div>
  );
};

export default HeroFetching;
