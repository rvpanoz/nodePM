type Operations = {
  action: Object | String,
  packagesInstallOptions: []
}

type Notifications = {
  action: Object | String,
  notifications: []
}

type Common = {
  directory: string | null,
  manager: string,
  mode: string,
  operations: Operations,
  onlinestatus?: string
}

type Packages = {
  active: Object | null,
  packagesFromSearch: [],
  packagesData: [],
  packagesOutdated: [],
  metadata: any
}

type Npm = {
  env: any,
  operationStatus: string,
  operationCommand: string,
  operationPackages: [string],
  command_error?: string,
  command_message?: string
}

type Ui = {
  activePage: string,
  paused?: boolean,
  commandErrors: [],
  dialog: any,
  filtering: any,
  pagination: any,
  loaders: any,
  snackbar: any,
  sorting: any,
  selected: [],
  uiException: string | null
}

export interface AppState {
  manager: string;
  packages: Packages;
  notifications: Notifications;
  ui: Ui;
  common: Common;
  npm: Npm;
  uiException?: string;
}

