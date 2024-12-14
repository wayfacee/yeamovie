import { cn } from "@/shared/lib";
import React from "react";
import { Skeleton } from "@/shared/ui";
import { SearchMovieCardSkeleton } from "../search-movie-card/search-movie-card.skeleton";
import { Container } from "@/shared/components";

interface Props {
  className?: string;
}

export const SearchMovieListSkeleton: React.FC<Props> = React.memo(
  ({ className }) => {
    return (
      <Container
        className={cn(
          "flex items-center justify-center flex-col gap-16",
          "mb-36",
          className,
        )}
      >
        <Skeleton className="w-48 h-7" />

        <div className="flex flex-col rounded-xl gap-16 items-center max-h-[1800px] overflow-y-auto pr-6">
          {[...Array(3)].map((_, index) => (
            <SearchMovieCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    );
  },
);
