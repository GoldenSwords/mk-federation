import { createContext } from 'react';

export interface IContext {
  data: string[];
}

export const Context = createContext({} as IContext);
