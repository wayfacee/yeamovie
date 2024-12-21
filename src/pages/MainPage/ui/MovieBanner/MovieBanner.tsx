import { useGetRandomMoviesQuery } from "@/entities/movie";
import { MovieCarousel } from "@/features/movie/movie-carousel";
import React from "react";

interface Props {
  className?: string;
}

// widget, <LatestNews />
export const MovieBanner = React.memo(({ className }: Props) => {
  const { data, isLoading } = useGetRandomMoviesQuery({});

  return (
    <MovieCarousel data={data} isLoading={isLoading} className={className} />
  );
});
