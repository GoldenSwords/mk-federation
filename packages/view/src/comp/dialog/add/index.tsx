import { FC, useMemo, useState } from 'react';

import { IRoutes } from 'packages/view/src/model';

import { Input } from '../../input';

interface IProps {
  onSubmit: (config: IRoutes) => void;
  onCancel: () => void;
}

export const AddDialog: FC<IProps> = ({ onCancel, onSubmit }) => {
  const [label, setLabel] = useState('');
  const [scope, setScope] = useState('');
  const [url, setUrl] = useState('');
  const [modules, setModules] = useState<Set<string>>(new Set());

  const values = useMemo(() => [...modules], [modules]);

  return (
    <div>
      <Input label="模块" value={scope} onChange={setScope} />
      <Input label="名称" value={label} onChange={setLabel} />
      <Input label="地址" value={url} onChange={setUrl} />
      <div>
        <button
          onClick={() => {
            setModules(new Set([...modules, '新模块']));
          }}
        >
          添加
        </button>
      </div>
      {values.map((name, index) => (
        <Input
          value={name}
          key={index}
          onChange={(value) => {
            setModules(new Set(...values.slice(0, index), value, ...values.slice(index + 1)));
          }}
        />
      ))}

      <div>
        <button onClick={onCancel}>取消</button>
        <button
          disabled={label.length === 0 || url.length === 0 || modules.size === 0}
          onClick={() =>
            onSubmit({
              [scope]: {
                label,
                url,
                modules: values.reduce(
                  (data, item) => {
                    data[item] = [];
                    return data;
                  },
                  {} as { [id: string]: string[] },
                ),
              },
            })
          }
        >
          提交
        </button>
      </div>
    </div>
  );
};
