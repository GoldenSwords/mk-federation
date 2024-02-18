import { ReactNode } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { LazyComponent } from '../components';
import { IDirectRoute, IModuleRoute, IRoute } from '../models';

export function makeRoutes(routes: IRoute[] = [], fallback?: ReactNode): RouteObject[] {
  return routes.map((route: IRoute) => {
    const { url, path, children } = route as IModuleRoute;
    const { to, replace } = route as IDirectRoute;

    if (to) {
      return {
        path,
        element: <Navigate to={to} replace={replace} />,
      };
    }

    if (!url) {
      return {
        path,
        element: null,
      };
    }

    return {
      path,
      element: <LazyComponent route={route as IModuleRoute} fallback={fallback} />,
      children: makeRoutes(children, fallback),
    };
  });
}

export * from './remote';
