export interface IRouteDataModel {
  label: string;
  url: string;
  modules: { [id: string]: string[] };
}

export interface IRoutes {
  [id: string]: IRouteDataModel;
}

export interface IRoute {
  id: string;
  path: string;
  scope: string;
  url: string;
  module: string;
  subModule: string;
  parent: string;
}

export interface IPayload<T> {
  code: number;
  message: string;
  payload: T;
}
