import { useMemo } from 'react';

import { Route } from 'frame/Route';

function App() {
  const routes = useMemo(
    () => [
      {
        path: '/app',
        scope: 'component',
        module: './Frame',
        subModule: 'Frame',
        url: 'http://localhost:4001/remoteEntry.js',
        children: [
          {
            path: 'button',
            scope: 'component',
            module: './Switch',
            subModule: 'Switch',
            url: 'http://localhost:4001/remoteEntry.js',
          },
          {
            path: 'test',
            scope: 'component',
            module: './Test',
            subModule: 'Test',
            url: 'http://localhost:4001/remoteEntry.js',
          },
        ],
      },
      { path: '', to: 'app' },
    ],
    [],
  );
  return <Route routes={routes} />;
}

export default App;
