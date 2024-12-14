import { useEffect } from "react";
import { toast } from "@/shared/hooks";
import type {
  MeiliMovieEntity,
  MovieDtoV13,
} from "@openmoviedb/kinopoiskdev_client";

interface Props {
  id: string;
  title: string;
  description: string;
  data?: MovieDtoV13[] | MeiliMovieEntity[];
  isLoading: boolean;
  isFetching: boolean;
}

export const useNotFoundMovieEffect = ({
  id,
  title,
  description,
  data,
  isLoading,
  isFetching,
}: Props) => {
  useEffect(() => {
    if (!data && !isLoading && !isFetching) {
      // data && data.length === 0
      toast({
        variant: "destructive",
        title,
        description,
      });

      setTimeout(() => {
        const elem = document.querySelector(id) as HTMLElement;

        if (elem) {
          elem.click();
        } else {
          console.error("Элемент не найден!");
        }
      }, 600);
    }
  }, [data, isLoading, isFetching]);
};
