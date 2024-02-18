import { CSSProperties, FC, ReactNode, useEffect, useMemo, useState } from 'react';

import classnames from 'classnames';

import {
  FactoryPayload,
  MantineTheme,
  PartialVarsResolver,
  TransformVars,
  getThemeColor,
  useStyles,
} from '@mantine/core';

import './index.scss';

export interface ISwitchProps {
  label: ReactNode;
  disabled: boolean;
  value: boolean;
  className: string;
  onChange(val: boolean): void;
  style: CSSProperties;
  vars: PartialVarsResolver<IStyle>;
}

interface IVars {
  root:
    | '--m3-switch-bg'
    | '--m3-switch-hover-bg'
    | '--m3-switch-active-bg'
    | '-m3-switch-thumb-bg'
    | '--m3-switch-thumb-hover-bg'
    | '--m3-switch-thumb-active-bg'
    | '--m3-switch-label-color'
    | '--m3-switch-size'
    | '--m3-switch-thumb-margin'
    | '--m3-switch-label-margin'
    | '--m3-switch-disabled-opacity';
}

interface IStyle extends FactoryPayload {
  stylesNames: string;
  vars: IVars;
}

// const varsResolver = (
//   theme: MantineTheme,
//   props: FactoryPayload['props'],
//   ctx: FactoryPayload['ctx'],
// ): TransformVars<FactoryPayload['vars']> => {
//   return {
//     root: props.vars?.(theme, props, ctx) ?? {},
//   };
// };

export const Switch: FC<Partial<ISwitchProps>> = (props) => {
  const { label, disabled, className, value, style, vars, onChange } = props;
  const [active, setActive] = useState(value);

  const id = useMemo(() => `id_${Math.round(Math.random() * 1e11).toString(32)}`, []);

  useEffect(() => setActive(value), [value]);

  const getStyle = useStyles<IStyle>({
    name: 'switch',
    props,
    vars,
    // varsResolver,
    classes: {},
    className,
    style,
  });

  return (
    <label htmlFor={id} {...getStyle('root')}>
      <input
        id={id}
        checked={active}
        type="checkbox"
        disabled={disabled}
        onChange={({ target: { checked } }) => (onChange ?? setActive)(checked)}
        {...getStyle('input')}
      />
      <div>
        <div className={classnames({ active })}>
          <div className={classnames({ active })} />
        </div>
        {!!label && <span>{label}</span>}
      </div>
    </label>
  );
};
