import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import { makeRoutes } from './helper';
import { IRoute } from './models';

function App() {
  const [routes, setRoutes] = useState<IRoute[]>([]);

  useEffect(() => {
    setRoutes([
        {
          path: '/app',
          scope: 'component',
          module: './Frame',
          subModule: 'Frame',
          url: 'http://localhost/modules/0.0.0/component/remoteEntry.js',
          children: [
            {
              path: 'button',
              scope: 'component',
              module: './Switch',
              subModule: 'Switch',
              url: 'http://localhost/modules/0.0.0/component/remoteEntry.js',
            },
            {
              path: 'test',
              scope: 'component',
              module: './Test',
              subModule: 'Test',
              url: 'http://localhost/modules/0.0.0/component/remoteEntry.js',
            },
          ],
        },
        { path: '', to: 'app' },
    ]);
  }, []);

  return <>{useRoutes(makeRoutes(routes, '加载中...'))}</>;
}

export default App;
