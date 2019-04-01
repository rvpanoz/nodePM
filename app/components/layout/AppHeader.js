import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import SearchBox from 'components/common/SearchBox';
import InstallFromSource from 'components/common/InstallFromSource';
import { setActivePage, runCacheOperation } from 'models/ui/actions';

import Settings from './Settings';
import styles from './styles/appHeader';

const mapState = ({
  common: {
    onlineStatus: { status },
    activePage,
    loader: { loading },
    npm: { env },
    mode,
    directory
  }
}) => ({
  status,
  activePage,
  loading,
  env,
  mode,
  directory
});

const Header = ({ classes, onDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialog, setDialog] = useState({ open: false });
  const { activePage, loading, env, status, mode, directory } = useMappedState(
    mapState
  );

  const dispatch = useDispatch();

  const handleCache = useCallback(() => {
    // clear npm cache, npm verify cache

    const parameters = {
      ipcEvent: 'verify',
      cmd: ['verify'],
      mode,
      directory
    };

    dispatch(
      runCacheOperation({
        channel: 'ipc-event',
        options: {
          ...parameters
        }
      })
    );
  }, [mode, directory]);

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={8} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <SearchBox onlineStatus={status} disabled={loading} />
            </Grid>
            <Grid item>
              <Typography className={classes.link} component="a" href="#">
                Github
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Open settings">
                <IconButton
                  color="inherit"
                  onClick={e => setAnchorEl(e.currentTarget)}
                >
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={8}>
            <Grid item xs>
              <Typography color="inherit" variant="h5">
                Dashboard
              </Typography>
            </Grid>
            <Grid item>
              <Button
                title="Open install options"
                className={classes.button}
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => setDialog({ open: true })}
              >
                Install
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs
          value={activePage}
          textColor="inherit"
          onChange={(e, value) => dispatch(setActivePage(value))}
        >
          <Tab textColor="inherit" label="Packages" value="packages" />
          <Tab
            textColor="inherit"
            label="Problems"
            value="problems"
            disabled={loading}
          />
          <Tab textColor="inherit" label="Reports" value="reports" />
        </Tabs>
      </AppBar>
      <Popover
        id="settings-pop"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Settings
          items={[
            {
              primaryText: 'Environment',
              secondaryText: env.userAgent
            },
            {
              primaryText: 'Registry',
              secondaryText: env.metricsRegistry
            },
            {
              primaryText: 'Cache',
              secondaryText: env.cache,
              action: () => handleCache(),
              title: 'Verify npm cache'
            }
          ]}
          loading={loading}
        />
      </Popover>
      {dialog && dialog.open && (
        <Dialog open={dialog.open} aria-labelledby="install-from-source">
          <DialogTitle classes={{ root: classes.dialogTitle }}>
            Install packages
          </DialogTitle>
          <Divider light />
          <DialogContent>
            <InstallFromSource
              mode={mode}
              directory={directory}
              close={() =>
                setDialog({
                  open: false,
                  content: null
                })
              }
            />
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
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
};

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
