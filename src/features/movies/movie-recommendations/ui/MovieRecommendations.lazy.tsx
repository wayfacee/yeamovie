import { lazy } from "react";

export const MovieRecommendations = lazy(
  () => import("./MovieRecommendations"),
);