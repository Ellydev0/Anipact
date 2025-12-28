import Nav from "@/components/Nav";
import { fetchAnimeNews } from "@/lib/fetchAnimeNews";
import News from "./News";

const MediaUpdatesPage = async () => {
  const data = await fetchAnimeNews();
  return (
    <>
      <Nav active={2} />

      <div className="p-3 lg:p-10">
        <h1 className="text-[2.3rem] font-xirod mt-13">Media Updates</h1>

        <News data={data} />
        <div className="text-center">
          for more news visit the{" "}
          <a
            className="text-accent hover:text-accent/80 underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.animenewsnetwork.com/all/archive"
          >
            archives
          </a>
        </div>
      </div>
    </>
  );
};

export default MediaUpdatesPage;
