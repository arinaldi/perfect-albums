import React, { useEffect, useReducer } from 'react';

import Api from '../../utils/api';
import {
  ALERT_TYPES,
  STATE_EVENTS,
  STATE_STATUSES,
} from '../../constants';
import ErrorBoundary from '../ErrorBoundary';
import AppMessage from '../AppMessage/presenter';
import CreateReleaseModal from '../CreateReleaseModal';
import DeleteDataModal from '../DeleteDataModal';
import NewReleases from './presenter';
import { dataReducer, dataInitialState } from './dataReducer';
import { modalReducer, modalInitialState } from './modalReducer';

const NewReleasesContainer = () => {
  const [dataState, dataDispatch] = useReducer(dataReducer, dataInitialState);
  const [modalState, modalDispatch] = useReducer(modalReducer, modalInitialState);
  const { data, error, status } = dataState;
  const { isCreateOpen, isDeleteOpen, id, artist, title } = modalState;

  useEffect(() => {
    if (status === STATE_STATUSES.LOADING) {
      let isCanceled = false;

      Api.get('/api/releases')
        .then(res => res.json())
        .then(data => {
          if (isCanceled) return;
          dataDispatch({ type: STATE_EVENTS.RESOLVE, data });
        })
        .catch(error => {
          if (isCanceled) return;
          dataDispatch({ type: STATE_EVENTS.REJECT, error });
        });

      return () => {
        isCanceled = true;
      };
    }
  }, [status]);

  const dispatchFetch = () => {
    dataDispatch({ type: STATE_EVENTS.FETCH });
  };

  if (error) {
    return <AppMessage type={ALERT_TYPES.ERROR} message={error.message} />;
  }

  return (
    <ErrorBoundary>
      <NewReleases
        cancel={() => dataDispatch({ type: STATE_EVENTS.CANCEL })}
        data={data}
        handleCreateOpen={() => modalDispatch({ type: 'OPEN_CREATE' })}
        handleDeleteOpen={({ id, artist, title }) => modalDispatch({
          type: 'OPEN_DELETE',
          payload: { id, artist, title },
        })}
        refresh={dispatchFetch}
        status={status}
      />
      <CreateReleaseModal
        isOpen={isCreateOpen}
        closeModal={() => modalDispatch({ type: 'CLOSE_CREATE' })}
        refresh={dispatchFetch}
      />
      <DeleteDataModal
        isOpen={isDeleteOpen}
        dataType='Release'
        closeModal={() => modalDispatch({ type: 'CLOSE_DELETE' })}
        path='releases'
        data={{ id, artist, title }}
        refresh={dispatchFetch}
      />
    </ErrorBoundary>
  );
};

export default NewReleasesContainer;
