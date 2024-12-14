import { MovieCarousel } from "@/entities/movie";
import { MovieTabs } from "@/widgets/movie-tabs";
import React from "react";
import { MovieCategories } from "@/features/movie-categories";
import { FilteredMoviesList } from "@/features/filtered-movies-list";
import { Container } from "@/shared/components";

const MainPage = () => {
  return (
    <Container>
      <MovieCarousel className="my-5" />
      <MovieTabs /> {/* className="mx-9" */}
      <MovieCategories className="mt-9" /> {/* className="mx-9" */}
      <FilteredMoviesList className="my-9" /> {/* className="mx-9" */}
    </Container>
  );
};

export default React.memo(MainPage);
