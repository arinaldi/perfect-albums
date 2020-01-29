import React, { useContext } from 'react';

import { useStateMachine } from '../../utils/hooks';
import { MODAL_TYPES, STATE_EVENTS } from '../../constants';
import ErrorBoundary from '../ErrorBoundary';
import { Context } from '../Provider';
import NewReleases from './presenter';

const NewReleasesContainer = () => {
  const { openModal } = useContext(Context);
  const [state, dispatch] = useStateMachine('/api/releases');
  const { data, error, status } = state;

  const dispatchFetch = () => {
    dispatch({ type: STATE_EVENTS.FETCH });
  };

  return (
    <ErrorBoundary>
      <NewReleases
        cancel={() => dispatch({ type: STATE_EVENTS.CANCEL })}
        error={error}
        data={data}
        handleCreateOpen={() => openModal({
          type: MODAL_TYPES.NEW_RELEASE_CREATE,
          callback: dispatchFetch,
        })}
        handleDeleteOpen={data => openModal({
          type: MODAL_TYPES.DATA_DELETE,
          data: {
            ...data,
            dataType: 'Release',
            path: 'releases',
          },
          callback: dispatchFetch,
        })}
        refresh={dispatchFetch}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default NewReleasesContainer;
