export interface ImportRemoteOptions {
  url: string;
  scope: string;
  module: string;
  subModule?: string;
  bustRemoteEntryCache?: boolean;
}

function loadSource(path: string, event: (e: Event) => void, scope: string): void {
  window.__mkInProgress = window.__mkInProgress ?? {};
  if (window.__mkInProgress[path]) {
    window.__mkInProgress[path].push(event);
  } else {
    const dataWebpackPrefix = '@mk/frame:';

    let loadScript: HTMLScriptElement | null = null;
    if (void 0 !== scope) {
      for (let g = document.getElementsByTagName('script'), i = 0; i < g.length; i++) {
        const a = g[i];
        if (a.getAttribute('src') == path || a.getAttribute('data-webpack') == dataWebpackPrefix + scope) {
          loadScript = a;
          break;
        }
      }
    }

    let loadTimer = -1;

    const callback = (n: any) => {
      if (!loadScript) {
        clearTimeout(loadTimer);
        return;
      }

      loadScript.onerror = loadScript.onload = null;

      const I = window.__mkInProgress[path];

      delete window.__mkInProgress[path];
      loadScript.parentNode && loadScript.parentNode.removeChild(loadScript);
      I && I.forEach((e) => e(n));
    };

    if (!loadScript) {
      loadScript = document.createElement('script');
      loadScript.charset = 'utf-8';
      // @ts-ignore
      loadScript.timeout = 120;
      __webpack_require__.nc && loadScript.setAttribute('nonce', __webpack_require__.nc);
      loadScript.setAttribute('data-webpack', dataWebpackPrefix + scope);
      loadScript.src = path;
      window.__mkInProgress[path] = [event];

      loadScript.onerror = callback;
      loadScript.onload = callback;
      document.head.appendChild(loadScript);
    } else {
      console.log(1);
    }

    loadTimer = window.setTimeout(
      callback.bind(null, {
        type: 'timeout',
        target: loadScript,
      }),
      12e4,
    );
  }
}

const loadRemote = (
  url: ImportRemoteOptions['url'],
  scope: ImportRemoteOptions['scope'],
  bustRemoteEntryCache: ImportRemoteOptions['bustRemoteEntryCache'],
) =>
  new Promise<void>((resolve, reject) => {
    const timestamp = bustRemoteEntryCache ? `?t=${new Date().getTime()}` : '';

    loadSource(
      `${url}${timestamp}`,
      (event: Event) => {
        if (event?.type === 'load') {
          // Script loaded successfully:
          return resolve();
        }
        const realSrc = (event?.target as HTMLScriptElement)?.src;
        const eventType = event?.type;
        const error = new Error();
        error.message = `Loading script failed.\nMissing: ${realSrc}\nEvent type: ${eventType}`;
        error.name = 'ScriptExternalLoadError';
        reject(error);
      },
      scope,
    );
  });

const initSharing = async () => {
  if (!__webpack_share_scopes__?.default) {
    await __webpack_init_sharing__('default');
  }
};

// __initialized and __initializing flags prevent some concurrent re-initialization corner cases
const initContainer = async (containerScope: any) => {
  try {
    if (!containerScope.__initialized && !containerScope.__initializing) {
      containerScope.__initializing = true;
      await containerScope.init(__webpack_share_scopes__.default);
      containerScope.__initialized = true;
      delete containerScope.__initializing;
    }
  } catch (error) {
    console.error(error);
  }
};

/*
    Dynamically import a remote module using Webpack's loading mechanism:
    https://webpack.js.org/concepts/module-federation/
  */
export const importRemote = async <T>({
  url,
  scope,
  module,
  subModule = 'default',
  bustRemoteEntryCache = true,
}: ImportRemoteOptions): Promise<T> => {
  if (!window[scope]) {
    // Load the remote and initialize the share scope if it's empty
    await Promise.all([loadRemote(url, scope, bustRemoteEntryCache), initSharing()]);
    if (!window[scope]) {
      throw new Error(
        `Remote loaded successfully but ${scope} could not be found! Verify that the name is correct in the Webpack configuration!`,
      );
    }
    // Initialize the container to get shared modules and get the module factory:
    const [, moduleFactory] = await Promise.all([
      initContainer(window[scope]),
      window[scope].get(module.startsWith('./') ? module : `./${module}`),
    ]);
    return { default: moduleFactory()?.[subModule] } as T;
  } else {
    const moduleFactory = await window[scope].get(module.startsWith('./') ? module : `./${module}`);
    return { default: moduleFactory()?.[subModule] } as T;
  }
};
