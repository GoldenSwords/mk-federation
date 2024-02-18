import axios from 'axios';

import { IRoute, IRoutes } from '../model';

axios.interceptors.response.use((response) => {
  /**
   * 验证数据格式
   */
  if (response.data.code === 200) {
    return response.data.payload;
  }
  console.error(response.data.message);
  throw new Error(response.data.message);
});

export const apis = {
  getModules: (): Promise<IRoutes> => {
    return axios.get('/module');
  },
  getRoutes: (): Promise<IRoute[]> => {
    return axios.get('/route');
  },
};
