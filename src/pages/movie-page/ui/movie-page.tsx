import {
  MovieDetails,
  MovieFrames,
  useGetMovieByIdQuery,
} from "@/entities/movie";
import { type MovieDtoV13 } from "@/shared/adapters";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MoviePageSkeleton } from "./movie-page.skeleton";
import {
  MovieRecommendations,
  MovieRecommendationsSkeleton,
} from "@/features/movie-recommendations";
import { Container, MovieBreadcrumb } from "@/shared/components";

const MoviePage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetMovieByIdQuery({
    id: Number(id) || 1,
  });

  const navigate = useNavigate();
  const paths = [
    { id: 1, name: "Назад", onClick: () => navigate(-1) },
    {
      id: 2,
      name: "Главная",
      to: "/",
    },
  ];

  if (isLoading) return <MoviePageSkeleton />;
  if (!data || error) {
    throw new Error("no data");
  }

  return (
    <Container className="my-14">
      <MovieBreadcrumb paths={paths} className="mb-10" />
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

export default React.memo(MoviePage);
