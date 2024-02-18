import { Route } from 'frame/Route';

function App() {
  return (
    <Route
      routes={[
        {
          path: '',
          scope: 'component',
          module: './Button',
          subModule: 'Button',
          url: 'http://localhost:4001/remoteEntry.js',
        },
      ]}
    />
  );
}

export default App;
