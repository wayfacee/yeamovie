import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import React from "react";

interface Props {
  className?: string;
}

export const SearchMovieCardSkeleton: React.FC<Props> = React.memo(
  ({ className }) => {
    return (
      <div className={cn("flex items-center gap-12", className)}>
        <Skeleton className="w-[480px] h-[430px] rounded-xl" />

        <div>
          <div className="flex justify-between items-center mb-7">
            <Skeleton className="w-[400px] h-24" />

            <Skeleton className="w-[180px] h-7" />
          </div>

          <Skeleton className="w-[800px] h-14 mb-6" />

          <dl className="grid grid-cols-[max-content_auto] gap-x-12 gap-y-5 mb-16">
            <Skeleton className="w-[75px] h-7" />
            <Skeleton className="w-[300px] h-7" />

            <Skeleton className="w-[75px] h-7" />
            <Skeleton className="w-[150px] h-7" />

            <Skeleton className="w-[75px] h-7" />
            <Skeleton className="w-[150px] h-7" />
          </dl>

          <div className="flex gap-5 items-center">
            <Skeleton className="w-[200px] h-9" />
            <Skeleton className="w-[200px] h-9" />
          </div>
        </div>
      </div>
    );
  },
);
