import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-screen px-5 lg:px-10 p-5 py-3 relative">
      {/* Poster and title */}
      <div className="flex flex-col lg:flex-row mt-20 w-full gap-0 lg:gap-24">
        {/* Poster */}
        <div className="shrink-0 w-50">
          <Skeleton className="w-50 h-75" />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4 mt-10 lg:mt-40">
          {/* Title */}
          <Skeleton className="w-[70%] h-15" />

          {/* Metadata */}
          <Skeleton className="w-[80%] h-15" />

          {/* Description */}
          <Skeleton className="h-40 w-full lg:w-237.5" />
        </div>
      </div>

      {/* Characters */}
      <div className="mt-15">
        <h1 className="text-2xl font-xirod mb-10">Characters</h1>
        <Skeleton className="h-64 w-full" />
      </div>

      {/* Streaming Episodes */}
      <div>
        <h1 className="text-2xl font-xirod mt-15 mb-10">Streaming Episodes</h1>
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
};

export default Loading;
