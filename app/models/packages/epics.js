import { tap, map, takeWhile, concatMap, skipWhile } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { isPackageOutdated } from 'commons/utils';
import {
  toggleLoader,
  clearCommands,
  clearNotifications,
  clearAll
} from 'models/ui/actions';

import {
  clearPackages,
  installPackages,
  updatePackages,
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  updateData,
  setPage
} from './actions';

const cleanNotifications = () => ({
  type: clearNotifications.type
});

const cleanCommands = () => ({
  type: clearCommands.type
});

const cleanPackages = () => ({
  type: clearPackages.type
});

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const setOutdated = payload => ({
  type: setOutdatedSuccess.type,
  payload
});

const setPackages = payload => ({
  type: setPackagesSuccess.type,
  payload
});

const pauseRequest = () => ({
  type: 'PAUSE_REQUEST'
});

const resumeRequest = () => ({
  type: 'RESUME_REQUEST'
});

const cleanAllEpic = action$ =>
  action$.pipe(
    ofType(clearAll.type),
    concatMap(() => [
      updateLoader({
        loading: false
      }),
      cleanNotifications(),
      cleanPackages(),
      cleanCommands()
    ])
  );

const packagesStartEpic = action$ =>
  action$.pipe(
    ofType(setPackagesStart.type),
    map(({ payload: { channel, options, paused } }) => {
      if (paused) {
        return pauseRequest();
      }

      ipcRenderer.send(channel, options);
      return resumeRequest();
    }),
    takeWhile(({ type }) => type !== 'PAUSE_REQUEST'),
    concatMap(() => [
      updateLoader({
        loading: true
      }),
      cleanNotifications(),
      cleanPackages(),
      cleanCommands()
    ])
  );

const installPackagesEpic = action$ =>
  action$.pipe(
    ofType(installPackages.type),
    map(({ payload }) => {
      ipcRenderer.send('ipc-event', payload);

      return updateLoader({
        loading: true
      });
    })
  );

const updatePackagesEpic = action$ =>
  action$.pipe(
    ofType(updatePackages.type),
    map(({ payload }) => {
      ipcRenderer.send('ipc-event', payload);

      return updateLoader({
        loading: true
      });
    })
  );

const packagesSuccessEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateData.type),
    takeWhile(({ payload: { dependencies } }) =>
      Boolean(dependencies && Array.isArray(dependencies))
    ),
    map(
      ({
        payload: {
          dependencies,
          outdated,
          projectName,
          projectVersion,
          projectDescription,
          projectLicense,
          projectAuthor
        }
      }) => {
        const withOutdated = dependencies.reduce((deps = [], dependency) => {
          const { name, __peerMissing, __error } = dependency;
          console.log(dependency);
          if (!__peerMissing && !__error) {
            const [isOutdated, outdatedPkg] = isPackageOutdated(outdated, name);
            const {
              author,
              bugs,
              deprecated,
              description,
              extraneous,
              licence,
              peerDependencies,
              version,
              __group
            } = dependency;

            const enhancedDependency = {
              author,
              bugs,
              deprecated,
              description,
              extraneous,
              licence,
              name,
              peerDependencies,
              version,
              latest: isOutdated ? outdatedPkg.latest : null,
              isOutdated,
              __error,
              __peerMissing,
              __group
            };

            deps.push(enhancedDependency);
          }

          return deps;
        }, []);

        return {
          dependencies: withOutdated || dependencies,
          outdated,
          projectName,
          projectVersion,
          projectDescription,
          projectLicense,
          projectAuthor
        };
      }
    ),
    concatMap(
      ({
        dependencies,
        outdated,
        projectName,
        projectVersion,
        projectDescription,
        projectLicense,
        projectAuthor
      }) => {
        const {
          common: { page },
          modules: {
            metadata: { fromSearch, fromSort }
          }
        } = state$.value;

        const actions = [updateLoader({ loading: false, message: null })];

        if (page !== 0) {
          actions.unshift(setPage({ page: 0 }));
        }

        return [
          setPackages({
            projectName,
            projectVersion,
            projectDescription,
            projectLicense,
            projectAuthor,
            fromSearch,
            fromSort,
            dependencies
          }),
          setOutdated({ outdated }),
          ...actions
        ];
      }
    )
  );

export default combineEpics(
  packagesStartEpic,
  packagesSuccessEpic,
  installPackagesEpic,
  cleanAllEpic,
  updatePackagesEpic
);
