import { MovieTabs } from "@/widgets/movie-tabs";
import React from "react";
import { MovieCategories } from "@/widgets/movie-categories";
import { FilteredMoviesList } from "@/features/filtered-movies-list";
import { Container } from "@/shared/components";
import { MovieBanner } from "@/widgets/movie-banner";

const MainPage = () => {
  return (
    <Container>
      <MovieBanner className="my-5" />
      <MovieTabs /> {/* className="mx-9" */}
      <MovieCategories className="mt-9" /> {/* className="mx-9" */}
      <FilteredMoviesList className="my-9" /> {/* className="mx-9" */}
    </Container>
  );
};

export default React.memo(MainPage);
