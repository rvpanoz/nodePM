import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '100%'
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.light
  },
  info: {
    backgroundColor: theme.palette.text.secondary
  },
  secondary: {
    backgroundColor: theme.palette.secondary.dark
  },
  warning: {
    backgroundColor: theme.palette.error.light
  },
  icon: {
    fontSize: 25
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex'
  },
  text: {
    fontSize: 14,
    color: theme.palette.common.white
  }
});

const AppSnackbarContent = ({
  classes,
  message,
  onClose,
  variant,
  ...other
}) => (
    <SnackbarContent
      className={classNames(classes[variant], classes.root)}
      message={
        <div id="app-snackbar" className={classes.message}>
          {variant === 'info' && (
            <InfoIcon className={classNames(classes.icon, classes.iconVariant)} />
          )}
          {variant === 'error' && (
            <ErrorIcon
              className={classNames(classes.icon, classes.iconVariant)}
            />
          )}
          {variant === 'warning' && (
            <WarningIcon
              className={classNames(classes.icon, classes.iconVariant)}
            />
          )}
          {variant === 'success' && (
            <CheckCircleIcon
              className={classNames(classes.icon, classes.iconVariant)}
            />
          )}
          <Typography className={classes.text}>{message}</Typography>
        </div>
      }
      action={[
        typeof onClose === 'function' && (
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        )
      ]}
      {...other}
    />
  );

AppSnackbarContent.defaultProps = {
  variant: 'info',
};

AppSnackbarContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'primary']),
};

const AppSnackbarContentWrapper = withStyles(styles)(AppSnackbarContent);
export default AppSnackbarContentWrapper;
