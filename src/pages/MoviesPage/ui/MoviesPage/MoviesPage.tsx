import React from "react";
import { MovieDetails } from "@/entities/movie";
import { type MovieDtoV13 } from "@/shared/adapters";
import { Container, NavigationBreadcrumb } from "@/shared/ui";
import {
  MovieRecommendations,
  MovieRecommendationsSkeleton,
} from "@/features/movie/movie-recommendations";
import { MoviesPageSkeleton } from "./MoviesPage.skeleton";
import { MovieFrames } from "@/features/movie/movie-frames";
import { useMovieById } from "../../model/hooks/useMovieById";
import { useNavigationPaths } from "../../model/hooks/useNavigationPaths";

const MoviesPage = () => {
  const { data, isLoading, error } = useMovieById();
  const paths = useNavigationPaths();

  if (isLoading) return <MoviesPageSkeleton />;
  if (!data || error) {
    throw new Error("no data");
  }

  return (
    <Container className="my-14">
      <NavigationBreadcrumb paths={paths} className="mb-10" />
      <MovieDetails
        isLoading={isLoading}
        className="mb-14"
        data={data as MovieDtoV13}
      />
      <MovieFrames className="mb-14" frame={data.backdrop?.url} />

      <React.Suspense fallback={<MovieRecommendationsSkeleton />}>
        <MovieRecommendations />
      </React.Suspense>
    </Container>
  );
};

export default React.memo(MoviesPage);
