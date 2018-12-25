/* eslint-disable */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import styles from '../styles/cardInfo';

const AppCard = props => {
  const { classes, title, description, small, text, color, type } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader + ' ' + classes[color + 'CardHeader'],
          avatar: classes.cardAvatar
        }}
        avatar={<InfoIcon className={classes.cardIcon} />}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography
          variant="headline"
          component="h2"
          className={classes.cardTitle}
        >
          {description}{' '}
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <WarningIcon
          className={
            classes.cardStatsIcon + ' ' + classes[color + 'CardStatsIcon']
          }
        />
      </CardActions>
    </Card>
  );
};

Card.defaultProps = {
  color: 'purple'
};

Card.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  small: PropTypes.node,
  color: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  text: PropTypes.node
};

export default withStyles(styles)(AppCard);
