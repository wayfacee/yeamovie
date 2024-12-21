import { SearchMoviesList } from "@/entities/movie";
import { Container, NavigationBreadcrumb } from "@/shared/ui";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const paths = [{ id: 1, name: "Назад", onClick: () => navigate(-1) }];

  return (
    <>
      <Container>
        <NavigationBreadcrumb className="mt-8 mb-16" paths={paths} />
      </Container>
      <SearchMoviesList className="mx-14 mb-36" />
    </>
  );
};

export default React.memo(SearchPage);
