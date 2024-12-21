import { cn } from "@/shared/libs";
import { Skeleton } from "@/shared/ui";
import React from "react";

export const MovieCardSkeleton: React.FC = React.memo(
  ({ className }: { className?: string }) => {
    return (
      <div className={cn("flex flex-col g-3 w-[315px]", className)}>
        <Skeleton className="w-[315px] h-[180px] rounded-xl mb-1" />

        <div className="flex flex-col gap-1">
          <Skeleton className="font-bold text-lg w-[250px] h-7" />

          <div className="flex flex-row justify-between">
            <Skeleton className="text-[#15151547] w-[60px] h-6 font-medium" />
            <Skeleton className="text-[#FFD700] w-9 h-6 font-bold" />
          </div>
        </div>
      </div>
    );
  },
);
