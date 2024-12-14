import { MovieList } from "@/entities/movie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import React from "react";
import { usePopularMovies } from "../model/hooks/use-popular-movies";
import { useTabsEffect } from "../model/hooks/use-tabs-effect";

interface Props {
  className?: string;
}
export const MovieTabs: React.FC<Props> = React.memo(({ className }) => {
  const {
    movies,
    loadingMovies,
    fetchingMovies,
    series,
    loadingSeries,
    fetchingSeries,
    handleTabChange,
  } = usePopularMovies();

  useTabsEffect({
    data: movies || series,
    isLoading: loadingMovies || loadingSeries,
    isFetching: fetchingMovies || fetchingSeries,
  });

  return (
    <div className={className}>
      <Tabs
        defaultValue="movies"
        id="movie-tabs"
        onValueChange={handleTabChange}
      >
        <TabsList className="mt-3 mb-2">
          <TabsTrigger className="w-[260px]" value="movies">
            Популярные фильмы
          </TabsTrigger>
          <TabsTrigger className="w-[260px]" value="series">
            Популярные сериалы
          </TabsTrigger>
        </TabsList>

        <TabsContent className="w-full" id="movies" value="movies">
          <MovieList
            isLoading={loadingMovies}
            isFetching={fetchingMovies}
            data={movies}
          />
        </TabsContent>
        <TabsContent id="series" value="series">
          <MovieList
            isLoading={loadingSeries}
            isFetching={fetchingSeries}
            data={series}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
});
