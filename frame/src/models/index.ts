export interface IRouteMenu {
  label: string;
  to: string;
}

export interface IModuleRoute {
  path: string;
  scope: string;
  module: string;
  subModule?: string;
  url: string;
  menu?: IRouteMenu;
  children?: IRoute[];
}

export interface IDirectRoute {
  path: string;
  to: string;
  replace?: boolean;
}

export type IRoute = IModuleRoute | IDirectRoute;

export interface IFrameRoute extends IModuleRoute {
  elelemnt: JSX.Element;
}
