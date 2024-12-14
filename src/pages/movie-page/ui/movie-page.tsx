import { MovieDetails, MovieFrames, useMovieById } from "@/entities/movie";
import { MovieBreadcrumb } from "@/features/movie-breadcrumb";
import { type MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import React from "react";
import { useParams } from "react-router-dom";
import { MoviePageSkeleton } from "./movie-page.skeleton";
import {
  MovieRecommendations,
  MovieRecommendationsSkeleton,
} from "@/features/movie-recommendations";

const MoviePage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useMovieById({
    id: Number(id) || 1,
  });

  if (isLoading) return <MoviePageSkeleton />;
  if (!data || error) {
    throw new Error("no data");
  }

  return (
    <div className="m-14">
      <MovieBreadcrumb withMain className="mb-10" />
      <MovieDetails
        isLoading={isLoading}
        className="mb-14"
        data={data as MovieDtoV13}
      />
      <MovieFrames className="mb-14" frame={data.backdrop?.url} />

      <React.Suspense fallback={<MovieRecommendationsSkeleton />}>
        <MovieRecommendations />
      </React.Suspense>
    </div>
  );
};

export default React.memo(MoviePage);
