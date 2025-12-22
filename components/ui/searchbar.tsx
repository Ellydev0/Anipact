import clsx from "clsx";
import { Search } from "lucide-react";

const Searchbar = () => {
  return (
    <div
      className={clsx(
        "text-muted bg-background/70 border-muted/50 border-[0.5] cursor-text h-fit backdrop-blur-md rounded-md px-4 py-2 w-full xl:w-[40%]",
      )}
    >
      <div className="flex  items-center justify-start gap-4 w-full">
        <Search />
        <div className=" text-[.7rem]">Search Anime</div>
      </div>
    </div>
  );
};

export default Searchbar;
