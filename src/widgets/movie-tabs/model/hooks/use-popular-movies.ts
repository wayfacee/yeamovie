import React from "react";
import { useMovies, useSeriesLazy } from "../../api/movie-tabs-api";
import { type MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";

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
  } = useMovies();
  const [
    fetchSeries,
    { data: series, isLoading: loadingSeries, isFetching: fetchingSeries },
  ] = useSeriesLazy();

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
