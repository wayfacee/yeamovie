import { useGetCountriesQuery, useGetGenresQuery } from "@/entities/movie";
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
  } = useGetCountriesQuery();

  const {
    data: genresData,
    isLoading: isLoadingGenres,
    // error: genresError,
  } = useGetGenresQuery();

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
