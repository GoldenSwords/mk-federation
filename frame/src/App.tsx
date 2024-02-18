import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import { makeRoutes } from './helper';
import { IRoute } from './models';

function App() {
  const [routes, setRoutes] = useState<IRoute[]>([]);

  useEffect(() => {
    setRoutes([
      // {
      //   path: '',
      //   scope: 'component',
      //   module: './Button',
      //   subModule: 'Button',
      //   url: 'http://localhost:4001/remoteEntry.js',
      // },
      {
        path: '',
        scope: 'component',
        module: './Button',
        subModule: 'Button',
        url: 'http://localhost/modules/0.0.0/component/remoteEntry.js',
      },
    ]);
  }, []);

  return <>{useRoutes(makeRoutes(routes, '加载中...'))}</>;
}

export default App;
