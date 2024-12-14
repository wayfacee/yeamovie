import { MovieList } from "@/entities/movie";
import React from "react";
import { useMovieFilters } from "../model/hooks/use-movie-filters";
import { useNotFoundMovieEffect } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const FilteredMoviesList: React.FC<Props> = React.memo(
  ({ className }) => {
    const { data, isLoading, isFetching } = useMovieFilters();
    useNotFoundMovieEffect({
      id: "#country",
      title: "Фильмов с такими данными нет!",
      description: "Попробуйте выбрать другие параметры...",
      data,
      isLoading,
      isFetching,
    });

    return (
      <MovieList
        className={className}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        count={4}
      />
    );
  },
);
