import React from 'react';
import cn from 'classnames';
import { string, func, bool, objectOf } from 'prop-types';
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import styles from './styles/helperText';

const HelperText = ({
  classes,
  text,
  detail,
  actionText,
  actionHandler,
  actionDisabled
}) => (
  <div className={classes.containerColumn}>
    <Typography
      color="textSecondary"
      variant="subtitle1"
      className={cn(classes.noData, classes.withPadding)}
    >
      {text}
    </Typography>
    {detail && (
      <Typography
        color="textSecondary"
        variant="body2"
        className={classes.withPadding}
      >
        {detail}
      </Typography>
    )}
    {actionText && actionHandler && (
      <Button
        disabled={actionDisabled}
        color="primary"
        className={classes.buttonFix}
        variant="outlined"
        onClick={actionHandler}
      >
        {actionText}
      </Button>
    )}
  </div>
);

HelperText.propTypes = {
  classes: objectOf(string).isRequired,
  text: string,
  detail: string,
  actionText: string,
  actionHandler: func,
  actionDisabled: bool
};

export default withStyles(styles)(HelperText);
