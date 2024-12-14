import { lazy } from "react";

export const MovieRecommendationsAsync = lazy(
  () => import("./movie-recommendations"),
);