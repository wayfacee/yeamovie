import React from "react";
import { type MovieDtoV13 } from "@/shared/adapters";
import { useGetMoviesQuery, useLazyGetSeriesQuery } from "@/entities/movie";

interface ReturnProps {
  movies?: MovieDtoV13[];
  loadingMovies: boolean;
  fetchingMovies: boolean;
  series?: MovieDtoV13[];
  loadingSeries: boolean;
  fetchingSeries: boolean;
  handleTabChange: (value: string) => void;
}

export const usePopularMovies = (): ReturnProps => {
  const {
    data: movies,
    isLoading: loadingMovies,
    isFetching: fetchingMovies,
  } = useGetMoviesQuery();
  const [
    fetchSeries,
    { data: series, isLoading: loadingSeries, isFetching: fetchingSeries },
  ] = useLazyGetSeriesQuery();

  const [_, setActiveTab] = React.useState("movies");

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    if (value === "series" && !series) {
      fetchSeries();
    }
  };

  return {
    movies,
    loadingMovies,
    fetchingMovies,
    series,
    loadingSeries,
    fetchingSeries,
    handleTabChange,
  };
};
