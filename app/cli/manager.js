/* eslint-disable */

import cp from 'child_process';
import path from 'path';
import chalk from 'chalk';
import mk from '../mk';

const { spawn } = cp;
const { log } = console;
const { config } = mk;
const {
  defaultSettings: { defaultManager }
} = config;

// default arguments
const defaultsArgs = {
  list: ['--json', '--depth=0', '--parseable', '--verbose']
};

// current working directory
const cwd = process.cwd();

const execute = (
  manager = defaultManager,
  commandArgs = [],
  mode,
  directory,
  callback
) => {
  const resultP = new Promise(resolve => {
    const result = [];
    let errors = '';

    log(chalk.whiteBright.bold(`running: ${manager} ${commandArgs.join(' ')}`));
    callback('flow', `${manager} ${commandArgs.join(' ')}`);

    // on windows use npm.cmd
    const command = spawn(
      /^win/.test(process.platform) ? `${manager}.cmd` : manager,
      commandArgs,
      {
        env: process.env,
        cwd: mode === 'local' && directory ? path.dirname(directory) : cwd
      }
    );

    command.stdout.on('data', data => {
      result.push(String(data));
    });

    command.stderr.on('data', error => {
      const errorString = String(error);

      errors += errorString;
      callback('error', String(errorString), null);
    });

    command.on('exit', code => {
      log(chalk.yellow.bold(`child exited with code ${code}`));
    });

    command.on('close', () => {
      log(
        chalk.greenBright.bold(`finished: ${manager} ${commandArgs.join(' ')}`)
      );

      const resultString = result.join('');

      const results = {
        status: 'close',
        errors,
        data: resultString,
        cmd: commandArgs
      };

      return resolve(results);
    });
  });

  return resultP;
};

/**
 * List command - use npm
 **/

const list = (options, callback) => {
  const command = ['list'];
  const { mode, directory, linked } = options || {};

  if (!callback || typeof callback !== 'function') {
    return Promise.reject(
      'manager[list]: callback must be given and must be a function'
    );
  }

  if (!mode || typeof mode !== 'string') {
    return Promise.reject(
      'manager[list]: mode must be given and must be one of "global" or "local"'
    );
  }

  const run =
    mode === 'global' && !directory
      ? linked
        ? command.concat(defaultsArgs.list, ['--link', '-g'])
        : command.concat(defaultsArgs.list, ['-g'])
      : command.concat(defaultsArgs.list);

  // returns a Promise
  return execute('npm', run, mode, directory, callback);
};

/**
 * Outdated command - use npm
 */
const outdated = (options, callback) => {
  const command = ['outdated'];
  const { mode, directory } = options || {};

  if (!callback || typeof callback !== 'function') {
    return Promise.reject(
      'manager[outdated]: callback must be given and must be a function'
    );
  }

  if (!mode || typeof mode !== 'string') {
    return Promise.reject(
      'manager[outdated]: mode must be given and must be one of "global" or "local"'
    );
  }

  const run =
    mode === 'global' && !directory
      ? command.concat(defaultsArgs.list, ['-g'])
      : command.concat(defaultsArgs.list);

  // returns a Promise
  return execute('npm', run, mode, directory, callback);
};

/**
 * search for packages - use npm
 */
const search = (opts, callback) => {
  const command = ['search'];
  const { directory, mode, pkgName } = opts;
  const defaults = ['--depth=0', '--json'];

  if (!pkgName) {
    return Promise.reject('npm[search] package name parameter must be given');
  }

  const run = command.concat(defaults, pkgName);

  return execute('npm', run, mode, directory, callback);
};

const install = (opts, callback, idx) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const commands = require('./npm');

    const { install } = commands.default;
    const run = install(opts, idx);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
};

const update = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const commands = require('./npm');
    const { update } = commands.default;
    const run = update(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
};

const uninstall = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const commands = require('./npm');
    const { uninstall } = commands.default;
    const run = uninstall(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
};

// npm view [<@scope>/]<name>[@<version>]
const view = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const commands = require('./npm');
    const { view } = commands.default;
    const run = view(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
};

const runAudit = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const commands = require('./npm');
    const { audit } = commands.default;
    const run = audit(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

const runDoctor = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const commands = require('./npm');
    const { doctor } = commands.default;
    const run = doctor(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

const runPrune = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const commands = require('./npm');
    const { prune } = commands.default;
    const run = prune(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

const runDedupe = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const commands = require('./npm');
    const { dedupe } = commands.default;
    const run = dedupe(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  audit: runAudit,
  doctor: runDoctor,
  prune: runPrune,
  dedupe: runDedupe,
  list,
  outdated,
  search,
  install,
  update,
  uninstall,
  view
};
