import { MovieTabs } from "@/widgets/movie/MovieTabs";
import React from "react";
import { MovieCategories } from "@/widgets/movie/MovieCategories";
import { Container } from "@/shared/ui";
import { FilteredMoviesList } from "@/features/movies/filtered-movies-list";
import { MovieBanner } from "../MovieBanner/MovieBanner";

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
