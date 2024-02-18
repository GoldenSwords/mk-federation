const { ModuleFederationPlugin } = require('webpack').container;
const pkg = require('../package.json');

class MKFederationPlugin {
  /**
   * @param {import('webpack').container.ModuleFederationPlugin.options} options
   */
  constructor(options) {
    this.options = options;
  }

  apply(complier) {
    const shared = Object.keys(pkg.dependencies)
      .filter((item) => !pkg.dependencies[item].startsWith('workspace:'))
      .reduce((data, next) => {
        data[next] = pkg.dependencies[next];
        return data;
      }, {});

    new ModuleFederationPlugin({
      ...this.options,
      filename: 'remoteEntry.js',
      shared: {
        ...shared,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: pkg.dependencies['react-router-dom'],
        },
        '@mantine/core': { singleton: true, eager: true, requiredVersion: pkg.dependencies['@mantine/core'] },
      },
    }).apply(complier);
  }
}

module.exports = MKFederationPlugin;
