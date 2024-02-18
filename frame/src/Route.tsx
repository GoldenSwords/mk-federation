import { FC, ReactNode, memo } from 'react';
import { useRoutes } from 'react-router-dom';

import { makeRoutes } from './helper';
import { IRoute } from './models';

interface IProps {
  routes: IRoute[];
  fallback?: ReactNode;
}

export const Route: FC<IProps> = memo(({ routes, fallback }: IProps) => {
  return <>{useRoutes(makeRoutes(routes, fallback))}</>;
});
