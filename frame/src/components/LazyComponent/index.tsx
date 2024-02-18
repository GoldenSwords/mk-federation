import { ComponentType, FC, ReactNode, Suspense, lazy, useMemo } from 'react';

import { importRemote } from '../../helper';
import { IModuleRoute } from '../../models';

interface IProps {
  route: IModuleRoute;
  fallback?: ReactNode;
}

export const LazyComponent: FC<IProps> = ({ route, fallback }) => {
  const Component = useMemo(() => lazy<ComponentType>(() => importRemote(route)), [route]);

  return (
    <Suspense fallback={fallback ?? '加载中'}>
      <Component />
    </Suspense>
  );
};
