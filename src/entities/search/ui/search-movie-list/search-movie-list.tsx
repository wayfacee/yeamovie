import { cn } from "@/shared/lib";
import React from "react";
import { useParams } from "react-router-dom";
import { useMovieSearch } from "../../api/movie-api";
import { SearchMovieCard } from "../search-movie-card/search-movie-card";
import { SearchMovieListSkeleton } from "./search-movie-list.skeleton";
import { useNotFoundMovieEffect } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const SearchMovieList: React.FC<Props> = React.memo(({ className }) => {
  const { query } = useParams();
  const { data, isLoading, isFetching } = useMovieSearch({
    title: query || "",
  });

  useNotFoundMovieEffect({
    id: "#search-input",
    title: "Фильмов с таким названием нет!",
    description: "Попробуйте найти другой фильм...",
    data,
    isLoading,
    isFetching,
  });

  if (isLoading || isFetching)
    return <SearchMovieListSkeleton className={className} />;
  console.log(data, isLoading, isFetching);

  if (!data && (!isLoading || !isFetching))
    return (
      <div className={cn("flex items-start justify-start", className)}>
        <p className="text-start text-base font-medium border-2 py-2 px-5 text-white rounded-3xl bg-gray-600 border-gray-600">
          Данные отсутствуют
        </p>
      </div>
    );

  return (
    <div
      className={cn(
        "flex items-center justify-center flex-col gap-16",
        className,
      )}
    >
      <h3 className="font-medium text-xl">Результаты поиска</h3>

      <div className="flex flex-col rounded-xl gap-16 items-center max-h-[1800px] overflow-y-scroll pr-6">
        {data?.map((item) => <SearchMovieCard key={item.id} data={item} />)}
      </div>
    </div>
  );
});