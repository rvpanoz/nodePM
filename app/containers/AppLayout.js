import { ipcRenderer } from 'electron';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import theme from 'styles/theme';

import Navigator from 'components/layout/Navigator';
import Header from 'components/layout/AppHeader';
import { Packages } from 'components/pages/packages';
import SnackbarContent from 'components/common/SnackbarContent';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import { Notifications } from 'components/pages/notifications';
import { setSnackbar, toggleLoader } from 'models/ui/actions';
import { runTool } from 'models/packages/actions';
import { switchcase, shrinkDirectory, parseNpmAudit } from 'commons/utils';

import { drawerWidth } from 'styles/variables';
import styles from './styles/appLayout';

const mapState = ({
  common: {
    mode,
    directory,
    activePage,
    loader: { loading },
    npm: { env },
    snackbarOptions,
    notifications
  },
  modules: {
    metadata: { lastUpdatedAt },
    project: { name, version, description }
  }
}) => ({
  lastUpdatedAt,
  activePage,
  mode,
  directory,
  name,
  version,
  loading,
  description,
  env,
  notifications,
  snackbarOptions
});

const AppLayout = ({ classes }) => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const [dialog, setDialog] = useState({ open: false, content: null });

  const {
    activePage,
    snackbarOptions,
    mode,
    directory,
    notifications,
    packages,
    packagesOutdated,
    env,
    ...restProps
  } = useMappedState(mapState);

  const dispatch = useDispatch();

  const runNpmTool = (toolName, options) => {
    setDialog({
      open: false,
      content: null
    });

    dispatch(
      runTool({
        channel: 'ipc-event',
        ipcEvent: toolName,
        cmd: [toolName],
        options,
        mode,
        directory
      })
    );
  };

  useEffect(() => {
    ipcRenderer.on('tool-close', (event, errors, cliResult, command) => {
      const toolName = command && command[0];

      const content = switchcase({
        audit: () => parseNpmAudit(cliResult)
      })(null)(toolName);

      dispatch(
        toggleLoader({
          loading: false,
          message: null
        })
      );

      if (content) {
        setDialog({
          open: true,
          content
        });
      } else {
        dispatch(
          setSnackbar({
            open: true,
            message: 'npm audit fix completed'
          })
        );
      }
    });

    return () => ipcRenderer.removeAllListeners('tool-close');
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Navigator
            mode={mode}
            fullDirectory={directory}
            directory={directory && shrinkDirectory(directory)}
            PaperProps={{ style: { width: drawerWidth } }}
            userAgent={env && env.userAgent}
            {...restProps}
          />
        </nav>
        <div className={classes.appContent}>
          <Header onDrawerToggle={() => toggleDrawer(!drawerOpen)} />
          <main className={classes.mainContent}>
            {switchcase({
              packages: () => <Packages />,
              problems: () => (
                <Notifications mode={mode} directory={directory} />
              )
            })(<Packages />)(activePage)}
          </main>
        </div>
        {snackbarOptions && snackbarOptions.open && snackbarOptions.message && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: snackbarOptions.type === 'error' ? 'center' : 'right'
            }}
            open={snackbarOptions.open}
            autoHideDuration={5000}
          >
            <SnackbarContent
              variant={snackbarOptions.type}
              message={snackbarOptions.message}
              onClose={() =>
                dispatch(
                  setSnackbar({
                    open: false,
                    message: null,
                    type: null
                  })
                )
              }
            />
          </Snackbar>
        )}
        {dialog && dialog.content && (
          <Dialog
            fullWidth
            open={dialog.open}
            aria-labelledby="npm-audit-results"
          >
            <DialogTitle>Results</DialogTitle>
            <DialogContent>
              <Grid container justify="space-between">
                {dialog.content
                  .filter(item => !Array.isArray(item.value))
                  .map(item => (
                    <Grid item key={item.name}>
                      <Typography className={classes.label}>
                        {item.name === 'dependencies'
                          ? item.name
                          : item.name.split('Dependencies').join('\t')}
                      </Typography>
                      <Typography className={classes.value}>
                        {item.value}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
              <Divider light />
              <List
                disablePadding
                dense
                subheader={
                  <Typography className={classes.subheader}>
                    Vulnerabilities
                  </Typography>
                }
                className={classes.list}
              >
                {dialog.content
                  .filter(item => Array.isArray(item.value))
                  .map(item => {
                    const { value } = item;

                    return value.map(valueItem => (
                      <ListItem key={valueItem.name}>
                        <ListItemText
                          primary={
                            <Typography className={classes.label}>
                              {valueItem.name}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Typography className={classes.value}>
                            {valueItem.value}
                          </Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ));
                  })}
              </List>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  setDialog({
                    open: false,
                    content: null
                  })
                }
                color="secondary"
              >
                Close
              </Button>
              <Button
                color="primary"
                onClick={() => runNpmTool('audit', ['fix'])}
              >
                Fix
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </MuiThemeProvider>
  );
};

AppLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AppLayout);
