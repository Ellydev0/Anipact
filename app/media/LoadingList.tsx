import { Skeleton } from "@/components/ui/skeleton";

const LoadingList = () => {
  return (
    <>
      <div className="rounded-md p-3 mb-4 border border-muted-foreground flex flex-col justify-between">
        <Skeleton className="w-full h-8" />

        <Skeleton className="mt-2 w-[90%] h-12" />

        <div className="flex justify-between mt-5 gap-3">
          <Skeleton className="w-[70%] h-3" />
          <Skeleton className="w-[20%] h-3" />
        </div>
      </div>
    </>
  );
};

export default LoadingList;
