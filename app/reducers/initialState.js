export default {
  mode: 'global',
  manager: 'npm',
  activePage: 'packages',
  directory: null,
  enableNotifications: false,
  notifications: [],
  commands: [],
  npm: {
    env: ''
  },
  uiException: {
    message: null
  },
  snackbarOptions: {
    open: false,
    message: null
  },
  loader: {
    loading: false,
    message: null
  },
  packageLoader: {
    loading: false,
    message: null
  },
  packages: {
    active: null,
    paginations: {
      page: 0,
      rowsPerPage: 10
    },
    data: {
      packages: [],
      packagesOutdated: []
    },
    operations: {
      selected: [],
      packagesInstallOptions: [],
      action: {
        name: null,
        error: null
      }
    },
    project: {
      name: null,
      version: null,
      description: null,
      license: null,
      author: null
    },
    sorting: {
      sortBy: 'name',
      sortDir: 'asc'
    },
    filtering: {
      filters: []
    },
    metadata: {
      lastUpdatedAt: null,
      fromSearch: false,
      fromSort: false
    }
  }
};
