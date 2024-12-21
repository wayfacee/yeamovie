import { memo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig, RouteConfigProps } from "../config/routeConfig";

const AppRouter = () => {
  const renderWithWrapper = useCallback(
    ({ path, element: Element }: RouteConfigProps) => {
      return <Route key={path} path={path} element={<Element />} />;
    },
    [],
  );

  // <Suspense fallback={<PageLoader />}>
  //  </Suspense>

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);