export default {
  directory: null,
  loading: false,
  snackbar: {
    action: null,
    actionText: '',
    message: ''
  },
  settings: null,
  settingsOpen: false,
  menuOpen: false,
  mode: 'GLOBAL',
  snackBarOpen: false,
  drawerOpen: false,
  npmCmd: '',
  messages: [],
  cmdOptions: [],
  packages: {
    isLoading: false,
    total: 0,
    active: null,
    packages: [],
    selected: [],
    group: null,
    expanded: false,
    version: '',
    tabIndex: 0,
    defaultActions: [
      {
        text: 'install',
        color: 'primary',
        iconCls: 'update'
      },
      {
        text: 'uninstall',
        color: 'default',
        iconCls: 'trash'
      }
    ],
    actions: []
  },
  packageJSON: {
    license: null,
    author: '',
    name: '',
    dependencies: [],
    devDependencies: [],
    optionalDependencies: []
  }
}
