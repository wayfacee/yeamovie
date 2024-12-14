import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import React from "react";

interface Props {
  className?: string;
}

export const MovieSelectSkeleton: React.FC<Props> = ({ className }) => {
  return <Skeleton className={cn("w-[200px] h-9", className)} />;
};
