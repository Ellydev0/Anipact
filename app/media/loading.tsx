import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="p-3 lg:p-10">
        <div className="mt-13">
          <h1 className="text-[2.3rem] font-xirod">Media Updates</h1>
          <div className="category gap-3 mt-3 flex justify-start items-center">
            <button className="text-[.7rem] rounded-full bg-accent/25 border border-accent py-1 px-3 hover:bg-accent/30 active:bg-accent/50 transition-colors">
              All
            </button>
            <button className="text-[.7rem] rounded-full bg-accent/25 border border-accent py-1 px-3 hover:bg-accent/30 active:bg-accent/50 transition-colors">
              Anime
            </button>
            <button className="text-[.7rem] rounded-full bg-accent/25 border border-accent py-1 px-3 hover:bg-accent/30 active:bg-accent/50 transition-colors">
              Manga
            </button>
            <button className="text-[.7rem] rounded-full bg-accent/25 border border-accent py-1 px-3 hover:bg-accent/30 active:bg-accent/50 transition-colors">
              Live Action
            </button>
          </div>
        </div>
        <div className="mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array(15)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="rounded-md p-3 mb-4 border border-muted-foreground flex flex-col justify-between"
              >
                <Skeleton className="w-full h-8" />

                <Skeleton className="mt-2 w-[90%] h-12" />

                <div className="flex justify-between mt-5 gap-3">
                  <Skeleton className="w-[70%] h-3" />
                  <Skeleton className="w-[20%] h-3" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
