import { MovieTabs } from "@/widgets/movie-tabs";
import React from "react";
import { MovieCategories } from "@/widgets/movie-categories";
import { FilteredMoviesList } from "@/features/filtered-movies-list";
import { Container, MovieCarousel } from "@/shared/components";
import { useGetRandomMoviesQuery } from "@/entities/movie";

const MainPage = () => {
  const { data, isLoading } = useGetRandomMoviesQuery({});

  return (
    <Container>
      <MovieCarousel data={data} isLoading={isLoading} className="my-5" />
      <MovieTabs /> {/* className="mx-9" */}
      <MovieCategories className="mt-9" /> {/* className="mx-9" */}
      <FilteredMoviesList className="my-9" /> {/* className="mx-9" */}
    </Container>
  );
};

export default React.memo(MainPage);