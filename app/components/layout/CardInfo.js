/* eslint-disable */

/**
 * Card info component
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, object, oneOf, string, node } from 'prop-types';
import cn from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import WarningIcon from '@material-ui/icons/WarningOutlined';
import UpdateIcon from '@material-ui/icons/UpdateOutlined';
import BalotIcon from '@material-ui/icons/BallotOutlined';
import BarChartIcon from '@material-ui/icons/BarChartOutlined';

import { switchcase } from '../../commons/utils';

import styles from '../styles/cardInfo';

const defaultAvatarIcon = null;
const defaultStatIcon = null;

const AppCardInfo = props => {
  const {
    classes,
    avatar,
    title,
    description,
    small,
    text,
    color,
    link,
    type
  } = props;

<<<<<<< 44e1816833dbd8ae38ce6969cf54acb61ff581af
<<<<<<< 2a45e2dcbb846119025aa7e5bc49d2a62c6d4d5e
=======
>>>>>>> dashboard cards icon stats colors
  const infoStatIcon = (
    <BalotIcon
      className={cn(classes.cardStatsIcon, classes[color + 'CardStatsIcon'])}
    />
  );

  const barStatIcon = (
    <BarChartIcon
      className={cn(classes.cardStatsIcon, classes[color + 'CardStatsIcon'])}
    />
  );
  const updateStatIcon = (
    <UpdateIcon
      className={cn(classes.cardStatsIcon, classes[color + 'CardStatsIcon'])}
    />
  );
  const warningStatIcon = (
    <WarningIcon
      className={cn(classes.cardStatsIcon, classes[color + 'CardStatsIcon'])}
    />
  );
<<<<<<< 44e1816833dbd8ae38ce6969cf54acb61ff581af
=======
  const defaultAvatarIcon = null;
  const defaultStatIcon = null;
  const infoAvatarIcon = <BalotIcon className={classes.cardIcon} />;
  const infoStatIcon = <InfoIcon className={classes.cardIcon} />;
>>>>>>> wip cards avatars
=======
>>>>>>> dashboard cards icon stats colors

  // TODO: avatars
  const renderAvatarIcon = type => {
    const icon = switchcase({
<<<<<<< 44e1816833dbd8ae38ce6969cf54acb61ff581af
<<<<<<< 2a45e2dcbb846119025aa7e5bc49d2a62c6d4d5e
=======
>>>>>>> dashboard cards icon stats colors
      info: () => null,
      stats: () => null,
      update: () => null,
      warning: () => null
<<<<<<< 44e1816833dbd8ae38ce6969cf54acb61ff581af
=======
      info: () => infoAvatarIcon,
      update: () => <UpdateIcon className={classes.cardIcon} />,
      warning: () => <WarningIcon className={classes.cardIcon} />
>>>>>>> wip cards avatars
=======
>>>>>>> dashboard cards icon stats colors
    })(defaultAvatarIcon)(type);

    return icon;
  };

  const renderStatIcon = type => {
    const icon = switchcase({
      info: () => infoStatIcon,
<<<<<<< 44e1816833dbd8ae38ce6969cf54acb61ff581af
<<<<<<< 2a45e2dcbb846119025aa7e5bc49d2a62c6d4d5e
      stats: () => barStatIcon,
      update: () => updateStatIcon,
      warning: () => warningStatIcon
=======
      update: () => (
        <UpdateIcon
          className={
            classes.cardStatsIcon + ' ' + classes[type + 'CardStatsIcon']
          }
        />
      ),
      warning: () => (
        <WarningIcon
          className={
            classes.cardStatsIcon + ' ' + classes[type + 'CardStatsIcon']
          }
        />
      )
>>>>>>> wip cards avatars
=======
      stats: () => barStatIcon,
      update: () => updateStatIcon,
      warning: () => warningStatIcon
>>>>>>> dashboard cards icon stats colors
    })(defaultStatIcon)(type);

    return icon;
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: cn(classes.cardHeader, {
            [classes[color + 'CardHeader']]: color && avatar
          }),
          avatar: classes.cardAvatar
        }}
        avatar={type && renderAvatarIcon(type)}
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
          {description}
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {type && renderStatIcon(type)}
        {link !== undefined ? (
          <a href={link.href} className={classes.cardStatsLink}>
            {link.text}
          </a>
        ) : text !== undefined ? (
          <small className={classes.text}>{text}</small>
        ) : null}
      </CardActions>
    </Card>
  );
};

// AppCardInfo.propTypes = {
//   classes: objectOf(object).isRequired,
//   title: node.isRequired,
//   description: node.isRequired,
//   small: node,
//   color: oneOf([
//     'warning',
//     'primary',
//     'danger',
//     'success',
//     'info',
//     'rose',
//     'gray'
//   ]),
//   text: string
// };

export default withStyles(styles)(AppCardInfo);
