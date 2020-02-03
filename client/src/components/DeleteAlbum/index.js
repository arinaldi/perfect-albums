import React, {
  useEffect,
  useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getQuery } from '../../utils';
import Api from '../../utils/api';
import { useStateMachine, useSubmit } from '../../utils/hooks';
import { STATE_STATUSES } from '../../constants';

import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import DeleteAlbum from './presenter';

const DeleteAlbumContainer = () => {
  const location = useLocation();
  const { id } = useParams();
  const [query, setQuery] = useState('');
  const [state] = useStateMachine(`/api/albums/${id}`);
  const { data, status } = state;
  const options = {
    action: 'deleted',
    apiFunc: Api.delete,
    data: null,
    path: `/api/albums/${id}`,
    query,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  useEffect(() => {
    const query = location.search ? getQuery(location.search) : '';

    setQuery(query);
  }, [location.search]);

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={status === STATE_STATUSES.LOADING} />
      <DeleteAlbum
        data={data}
        handleSubmit={handleSubmit}
        isDeleting={isSaving}
        query={query}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default DeleteAlbumContainer;
