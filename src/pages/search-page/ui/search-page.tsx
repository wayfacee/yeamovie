import { SearchMovieList } from "@/entities/search";
import { MovieBreadcrumb } from "@/features/movie-breadcrumb";
import { Container } from "@/shared/components";
import React from "react";

const SearchPage = () => {
  return (
    <>
      <Container>
        <MovieBreadcrumb className="mt-8 mb-16" />
      </Container>
      <SearchMovieList className="mx-14 mb-36" />
    </>
  );
};

export default React.memo(SearchPage);
