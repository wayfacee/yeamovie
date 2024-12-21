import { cn } from "@/shared/libs";
import React from "react";
import { useParams } from "react-router-dom";
import { SearchMovieCard } from "../SearchMovieCard/SearchMovieCard";
import { useGetMovieByTitleQuery } from "../../api/movie-api";
import { SearchMoviesListSkeleton } from "./SearchMoviesList.skeleton";

interface Props {
  className?: string;
}

export const SearchMoviesList: React.FC<Props> = React.memo(({ className }) => {
  const { query } = useParams();
  const { data, isLoading, isFetching } = useGetMovieByTitleQuery({
    title: query || "",
  });

  if (isLoading || isFetching) return <SearchMoviesListSkeleton />;

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
