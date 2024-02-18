import { MantineProvider } from '@mantine/core';

import './App.css';

import { Switch } from './components/Switch';

function App() {
  return (
    <MantineProvider theme={{ components: { switch: { vars: () => ({ root: { a: '123' } }), classNames: 'abc' } } }}>
      {/* @ts-ignore */}
      <Switch label="Switch" vars={() => ({ root: { '--m3-switch-bg': 'red', '--m3-switch-thumb-bg': 'blue' } })} />
    </MantineProvider>
  );
}

export default App;
