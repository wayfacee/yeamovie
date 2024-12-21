import { MainPage } from "@/pages/MainPage";
import { MoviesPage } from "@/pages/MoviesPage";
import { SearchPage } from "@/pages/SearchPage";

export interface RouteConfigProps {
  path: string;
  element: React.ComponentType;
}

export const routeConfig: RouteConfigProps[] = [
  { path: "/", element: MainPage },
  { path: "/movie/:id", element: MoviesPage },
  { path: "/search/:query", element: SearchPage },
];