import React, { useContext } from 'react';

import { useStateMachine } from '../../utils/hooks';
import { MODAL_TYPES, STATE_EVENTS } from '../../constants';
import ErrorBoundary from '../ErrorBoundary';
import { Context } from '../Provider';
import NewReleases from './presenter';

const NewReleasesContainer = () => {
  const { openModal } = useContext(Context);
  const [state, dispatch] = useStateMachine('/api/releases');
  const { data, status } = state;

  const cancel = () => {
    dispatch({ type: STATE_EVENTS.CANCEL });
  };

  const refresh = () => {
    dispatch({ type: STATE_EVENTS.FETCH });
  };

  const handleCreateOpen = () => {
    openModal({
      type: MODAL_TYPES.NEW_RELEASE_CREATE,
      callback: refresh,
    });
  };

  const handleDeleteOpen = (data) => {
    openModal({
      type: MODAL_TYPES.DATA_DELETE,
      data: {
        ...data,
        dataType: 'Release',
        path: 'releases',
      },
      callback: refresh,
    });
  };

  return (
    <ErrorBoundary>
      <NewReleases
        cancel={cancel}
        data={data}
        handleCreateOpen={handleCreateOpen}
        handleDeleteOpen={handleDeleteOpen}
        refresh={refresh}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default NewReleasesContainer;
