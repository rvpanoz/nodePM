'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Loader from '../common/Loader';
import AppModal from '../common/AppModal';
import {showMessageBox} from '../utils';
import PackageDetails from '../components/package/PackageDetails';

const PackageContainer = (props) => {
  return (
    <div className="package-container">
      <Loader loading={props.isLoading}>
        <PackageDetails
          mode={props.mode}
          directory={props.directory}
          active={props.active}
          packageActions={props.packageActions}
          setActive={props.setActive}
          toggleMainLoader={props.toggleMainLoader}
          isLoading={props.isLoading}
          cmdOptions={props.cmdOptions}
          addCommandOption={props.addCommandOption}
        />
      </Loader>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory,
    cmdOptions: state.global.cmdOptions,
    packageActions: state.packages.packageActions,
    active: state.packages.active,
    isLoading: state.packages.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCommandOption: (option) => {
      return dispatch(actions.addCommandOption(option))
    },
    toggleMainLoader: (bool) => {
      return dispatch(actions.toggleMainLoader(bool))
    },
    setActive: (pkg) => {
      return dispatch(actions.setActive(pkg));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer);
