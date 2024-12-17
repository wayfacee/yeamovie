import { SearchMovieList } from "@/entities/movie";
import { Container, MovieBreadcrumb } from "@/shared/components";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const paths = [{ id: 1, name: "Назад", onClick: () => navigate(-1) }];

  return (
    <>
      <Container>
        <MovieBreadcrumb className="mt-8 mb-16" paths={paths} />
      </Container>
      <SearchMovieList className="mx-14 mb-36" />
    </>
  );
};

export default React.memo(SearchPage);
