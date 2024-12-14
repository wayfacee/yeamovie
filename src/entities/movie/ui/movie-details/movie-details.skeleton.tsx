import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import React from "react";

interface Props {
  className?: string;
}

export const MovieDetailsSkeleton: React.FC<Props> = React.memo(
  ({ className }) => {
    return (
      <div className={cn("flex text-start", className)}>
        <div className="flex flex-col gap-6 mr-10">
          <Skeleton className="w-[480px] h-[650px] rounded" />

          <div className="flex flex-col gap-6">
            <Skeleton className="w-[220px] h-7" />

            <div className="flex flex-row gap-5">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="w-24 h-16" />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <Skeleton className="w-[600px] h-16 mb-7" />

            <Skeleton className="w-44 h-7" />
          </div>

          <Skeleton className="w-[800px] mb-12 h-52" />

          <Skeleton className="w-[300px] mb-5 h-12" />

          <dl className="grid grid-cols-[max-content_auto] gap-x-28 gap-y-5 text-lg text-gray-500">
            {[...Array(4)].map((_, index) => (
              <React.Fragment key={index}>
                <Skeleton className="w-44 h-7" />
                <Skeleton className="w-56 h-7" />
              </React.Fragment>
            ))}
          </dl>
        </div>
      </div>
    );
  },
);
