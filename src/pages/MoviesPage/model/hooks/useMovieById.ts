import { useGetMovieByIdQuery } from "@/entities/movie";
import { useParams } from "react-router-dom";

export const useMovieById = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetMovieByIdQuery({
    id: Number(id) || 1,
  });

  return { data, isLoading, error };
};
