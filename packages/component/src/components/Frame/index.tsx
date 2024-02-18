import { FC, PropsWithChildren, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import img from '../../assets/react.svg'

export const Frame: FC<PropsWithChildren> = () => {
  const nav = useNavigate();
  const tab = useMemo(
    () => [
      { label: '按钮', to: 'button' },
      { label: '测试', to: 'test' },
    ],
    [],
  );
  return (
    <div>
      <div>
        {tab.map(({ label, to }, index) => (
          <button key={index} onClick={() => nav(to)}>
            {label}
            <img src={img} width={12}/>
          </button>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
