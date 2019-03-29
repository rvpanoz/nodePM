/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable no-nested-ternary */

/**
 * npm install [<@scope>/]<name>@<version>
 */

const install = (options, idx) => {
  const command = ['install'];
  const { mode, version, name, pkgOptions, multiple, packages, single } =
    options || {};
  const defaults = ['--ignore-scripts', '--verbose'];

  if (!packages && !multiple && !name) {
    return Promise.reject('npm[install] package name parameter must be given');
  }

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;

  const commandOpts = single
    ? pkgOptions
      ? pkgOptions.map(option => `--${option}`)
      : []
    : pkgOptions && pkgOptions[idx].map(option => `--${option}`);

  const packagesToInstall = single
    ? version
      ? [`${name}@${version}`]
      : [name]
    : [packages[idx]];

  const commandOptions = commandOpts || [];

  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(packagesToInstall.filter(pkg => Boolean(pkg)))
    .concat(commandOptions);

  return run;
};

export default install;
