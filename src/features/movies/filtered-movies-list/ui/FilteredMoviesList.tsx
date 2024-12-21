import { MoviesList } from "@/entities/movie";
import React from "react";
import { useMovieFilters } from "../model/hooks/use-movie-filters";

interface Props {
  className?: string;
}

export const FilteredMoviesList: React.FC<Props> = React.memo(
  ({ className }) => {
    const { data, isLoading, isFetching } = useMovieFilters();

    return (
      <MoviesList
        className={className}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        count={4}
      />
    );
  },
);
