/* eslint-disable */
/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { runAudit } from 'models/npm/actions';
import { iMessage } from 'commons/utils';
import { AppLoader, HelperText } from 'components/common'
import { AUDIT_ERRORS } from 'constants/AppConstants';

import {
  Actions,
  Advisories,
  AdvisoryDetails,
  OverviewCard,
  ListDotTypes
} from './components';

import styles from './styles/audit';

const WithStylesHelperText = withStyles(styles)(HelperText);

const mapState = ({
  common: {
    mode, directory
  },
  ui: {
    loaders: {
      auditLoader: { loading, message }
    }
  },
  npm: {
    auditData
  }
}) => ({
  loading, message, mode, directory, auditData
})

const Audit = ({ classes, data }) => {
  const dispatch = useDispatch();
  const {
    loading,
    message,
    mode,
    auditData
  } = useMappedState(mapState);

  const [active, setActive] = useState(null);
  const { content, error } = auditData || {};

  if (error) {
    const props = Object.assign({}, error, {
      isError: true
    });

    return <WithStylesHelperText {...props} />;
  }
  console.log(loading, message)
  if (!content) {
    const options = {
      text: iMessage('info', 'npmAuditInfo'),
      detail: mode === 'global' ? iMessage('warning', 'noGlobalAudit') : null,
      actionText: iMessage('action', 'runAudit'),
      actionHandler: () => dispatch(
        runAudit({
          ipcEvent: 'npm-audit',
          cmd: ['audit']
        })
      ),
      actionDisabled: mode === 'global'
    };

    return <HelperText {...options} />;
  }

  const {
    metadata: {
      dependencies,
      devDependencies,
      optionalDependencies,
      vulnerabilities
    },
    actions,
    advisories
  } = content || {};

  const overviewData = { dependencies, devDependencies, optionalDependencies };

  return (
    <AppLoader loading={loading} message={message}>
      <div className={classes.root}>
        <Hidden mdDown>
          <Grid container spacing={8} className={classes.gridContainer}>
            <Grid item lg={6} md={6} sm={12} xl={6}>
              <OverviewCard
                title={iMessage('title', 'overview')}
                data={overviewData}
              />
            </Grid>
            <Grid item xs={6} sm={12} md={6} lg={6} xl={6}>
              <ListDotTypes data={vulnerabilities} />
            </Grid>
          </Grid>
        </Hidden>
        <Grid container spacing={8} className={classes.gridContainer}>
          <Grid item sm={12} md={9} lg={9} xl={9} className={classes.transition}>
            <Advisories data={advisories} handleClick={setActive} />
          </Grid>
          {active && (
            <Grid item sm={12} md={3} lg={3} xl={3}>
              <AdvisoryDetails
                data={active}
                handleClose={() => setActive(null)}
              />
            </Grid>
          )}
          {!active ? (
            <Grid item sm={12} md={3} lg={3} xl={3}>
              <Actions data={actions} />
            </Grid>
          ) : null}
        </Grid>
      </div>
    </AppLoader>
  );
};

Audit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
      PropTypes.string
    ])
  ),
  loading: PropTypes.bool,
  message: PropTypes.string
};

export default withStyles(styles, { withTheme: false })(Audit);
