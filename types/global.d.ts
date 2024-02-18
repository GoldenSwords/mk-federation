declare global {
  interface Window {
    __mkInProgress: { [id: string]: Array<(e: Event) => void> };
    [id: string]: any;
  }

  const __webpack_require__: any;

  const __webpack_share_scopes__: any;

  const __webpack_init_sharing__: any;

  declare module '*.svg';
  declare module '*.png';
  declare module '*.gif';
  declare module '*.jpg';
  declare module '*.jpeg';
  declare module '*.ttf';
  declare module '*.scss';
}

export {};
