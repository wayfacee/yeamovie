import { useCountries, useGenres } from "../../api/movie-api";
import type { MovieSelectProps } from "../types/movie.interface";

interface ReturnProps {
  triggerValue: string;
  label: string;
  category?: string;
  categoryItems?: { name: string; slug: string }[];
  isLoadingCountries: boolean;
  isLoadingGenres: boolean;
}

export const useMovieSelect = (data: MovieSelectProps): ReturnProps => {
  const { triggerValue, label, category, items } = data;

  const {
    data: countriesData,
    isLoading: isLoadingCountries,
    // error: countriesError,
  } = useCountries();
  const {
    data: genresData,
    isLoading: isLoadingGenres,
    // error: genresError,
  } = useGenres();

  const categoryItems: { name: string; slug: string }[] | undefined =
    label === "Жанры"
      ? genresData?.data || []
      : label === "Страны"
        ? countriesData?.data || []
        : items;

  return {
    triggerValue,
    label,
    category,
    categoryItems,
    isLoadingCountries,
    isLoadingGenres,
  };
};
