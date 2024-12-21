import { cn } from "@/shared/libs";
import React from "react";
import { Skeleton } from "@/shared/ui";
import { SearchMovieCardSkeleton } from "../SearchMovieCard/SearchMovieCard.skeleton";
import { Container } from "@/shared/ui";

interface Props {
  className?: string;
}

export const SearchMoviesListSkeleton: React.FC<Props> = React.memo(
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
