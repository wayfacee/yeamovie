import { MovieCarousel } from "@/entities/movie";
import { MovieTabs } from "@/widgets/movie-tabs";
import React from "react";
import { MovieCategories } from "@/features/movie-categories";
import { FilteredMoviesList } from "@/features/filtered-movies-list";

const MainPage = () => {
  return (
    <>
      <MovieCarousel className="m-5" />

      <MovieTabs className="mx-9" />

      <MovieCategories className="mx-9 mt-9" />
      <FilteredMoviesList className="my-9 mx-9" />
    </>
  );
};

export default React.memo(MainPage);
