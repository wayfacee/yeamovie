import { SearchMovieList } from "@/entities/search";
import { MovieBreadcrumb } from "@/features/movie-breadcrumb";
import React from "react";

const SearchPage = () => {
  return (
    <div>
      <MovieBreadcrumb className="mx-16 mt-8 mb-16" />
      <SearchMovieList className="mx-14 mb-44" />
    </div>
  );
};

export default React.memo(SearchPage);
