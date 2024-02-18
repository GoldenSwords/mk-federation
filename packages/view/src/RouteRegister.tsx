import { useEffect, useState } from 'react';

import './App.css';

import { apis } from './apis';
import { AddDialog } from './comp/dialog';
import { IRoute, IRoutes } from './model';

function App() {
  const header = [
    { label: '层级', column: 'parent' },
    { label: 'Path', column: 'path' },
    { label: 'Scope', column: 'scope' },
    { label: '地址', column: 'url' },
    { label: '模块', column: 'module' },
    { label: '子模块', column: 'subModule' },
  ];

  const [routes, setRoutes] = useState<IRoutes>();

  const [modules, setModules] = useState<IRoute[]>([]);

  const [add, setAdd] = useState(false);

  useEffect(() => {
    apis.getModules().then((data) => setRoutes(data));
    apis.getRoutes().then((data) => setModules(data));
  }, []);

  console.log(routes, modules);

  return (
    <>
      <button onClick={() => setAdd(!add)}>+</button>
      {add && <AddDialog onCancel={() => setAdd(!add)} onSubmit={(data) => setModules({ ...modules, ...data })} />}
      <table>
        <thead>
          <tr>
            {header.map(({ label }, index) => (
              <td key={index}>{label}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(modules).map((key, index) => {
            const v = modules[key as keyof typeof modules];
            return (
              <tr key={index}>
                {header.map(({ column }, index) => {
                  return <td key={index}>{v[column as keyof typeof v] || '--'}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
