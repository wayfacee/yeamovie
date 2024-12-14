import { useFilteredMovies } from "@/entities/movie";
import { type MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import { useSearchParams } from "react-router-dom";

interface ReturnProps {
  data?: MovieDtoV13[];
  isLoading: boolean;
  isFetching: boolean;
}

export const useMovieFilters = (): ReturnProps => {
  const [searchParams] = useSearchParams();
  const country = searchParams.get("страна") || "Россия";
  const genre = searchParams.get("жанр")?.toLowerCase() || "драма";
  const year = searchParams.get("год");
  const rating = searchParams.get("рейтинг");

  const yearNumber = year && !isNaN(Number(year)) ? Number(year) : 2020;
  const ratingNumber =
    rating && !isNaN(Number(rating.split("от")[1]?.trim()))
      ? Number(rating.split("от")[1]?.trim())
      : 7;

  const { data, isLoading, isFetching } = useFilteredMovies({
    country,
    genre,
    year: yearNumber,
    rating: ratingNumber,
  });

  return {
    data,
    isLoading,
    isFetching,
  };
};
