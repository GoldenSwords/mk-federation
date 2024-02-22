import { CSSProperties, FC, ReactNode, useEffect, useMemo, useState } from 'react';

import classnames from 'classnames';

import { Box, FactoryPayload, PartialVarsResolver, useStyles } from '@mantine/core';

import './index.scss';

interface IVarsStyle {
  '--m3-switch-bg': string;
  '--m3-switch-hover-bg': string;
  '--m3-switch-active-bg': string;
  '--m3-switch-thumb-bg': string;
  '--m3-switch-thumb-hover-bg': string;
  '--m3-switch-thumb-active-bg': string;
  '--m3-switch-label-color': string;
  '--m3-switch-size': string;
  '--m3-switch-thumb-margin': string;
  '--m3-switch-label-margin': string;
  '--m3-switch-disabled-opacity': string;
}

type ISwitchStyleProps = CSSProperties & Partial<IVarsStyle>;

export interface ISwitchProps {
  label: ReactNode;
  disabled: boolean;
  value: boolean;
  className: string;
  onChange(val: boolean): void;
  style: ISwitchStyleProps;
  vars: PartialVarsResolver<IStyle>;
}

interface IStyle extends FactoryPayload {
  stylesNames: string;
}

export const Switch: FC<Partial<ISwitchProps>> = (props) => {
  const { label, disabled, className, value, style, onChange } = props;
  const [active, setActive] = useState(value);

  const id = useMemo(() => `id_${Math.round(Math.random() * 1e11).toString(32)}`, []);

  useEffect(() => setActive(value), [value]);

  const getStyle = useStyles<IStyle>({
    name: 'switch',
    props,
    classes: {},
    className,
    style,
  });

  return (
    <Box component="label" htmlFor={id} {...getStyle('root')} aria-hidden>
      <input
        id={id}
        checked={active}
        type="checkbox"
        disabled={disabled}
        onChange={({ target: { checked } }) => (onChange ?? setActive)(checked)}
        {...getStyle('input')}
      />
      <Box component="div">
        <Box component="div" className={classnames({ active })} />
        {!!label && <Box component="span">{label}</Box>}
      </Box>
    </Box>
  );
};
