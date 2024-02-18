import { useState } from 'react';

import { AddDialog } from './comp/dialog';
import { IRoutes } from './model';

export function ModuleRegister() {
  const header = [
    { label: '模块名称', column: 'label' },
    { label: '模块地址', column: 'url' },
    { label: '子模块', column: 'modules' },
  ];
  const [modules, setModules] = useState<IRoutes>({
    component: { label: '组件库', url: 'http://localhost', modules: { './Home': ['Home'] } },
  });

  const [add, setAdd] = useState(false);

  return (
    <>
      <button onClick={() => setAdd(!add)}>+</button>
      {add && <AddDialog onCancel={() => setAdd(!add)} onSubmit={(data) => setModules({ ...modules, ...data })} />}
      <table>
        <thead>
          <tr>
            <td>Scope</td>
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
                <td>{key}</td>
                {header.map(({ column }, index) => {
                  if (column === 'modules') {
                    const value = v[column as keyof typeof v] as { [id: string]: string[] };
                    return (
                      <td key={index}>
                        <select>
                          {Object.keys(value).map((item, index) => (
                            <option value={item} label={item} key={index} />
                          ))}
                        </select>
                      </td>
                    );
                  }
                  return (
                    <td key={index}>
                      {typeof v[column as keyof typeof v] === 'string' && `${v[column as keyof typeof v]}`}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
