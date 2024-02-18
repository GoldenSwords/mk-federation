import { FC, PropsWithChildren } from 'react';

import { Button as MB } from '@mantine/core';

export const Button: FC<PropsWithChildren> = ({ children }) => <MB>{children}</MB>;
