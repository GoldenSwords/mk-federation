import { MantineProvider } from '@mantine/core';

import './App.css';

import { Switch } from './components/Switch';

function App() {
  return (
    <MantineProvider theme={{ components: { switch: { vars: () => ({ root: { a: '123' } }), classNames: 'abc' } } }}>
      <Switch label="Switch" />
    </MantineProvider>
  );
}

export default App;
