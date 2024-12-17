import { useGetRandomMoviesQuery } from "@/entities/movie";
import { MovieCarousel } from "@/shared/components";
import React from "react";

interface Props {
  className?: string;
}

export const MovieBanner = React.memo(({ className }: Props) => {
  const { data, isLoading } = useGetRandomMoviesQuery({});

  return (
    <MovieCarousel data={data} isLoading={isLoading} className={className} />
  );
});
