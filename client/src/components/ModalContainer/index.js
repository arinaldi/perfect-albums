import React, { Fragment, useContext } from 'react';

import { MODAL_TYPES } from '../../constants';
import { Context } from '../Provider';
import CreateReleaseModal from '../CreateReleaseModal';
import CreateSongModal from '../CreateSongModal';
import DeleteDataModal from '../DeleteDataModal';

const ModalContainer = () => {
  const { state: { modal } } = useContext(Context);

  switch (modal.type) {
  case MODAL_TYPES.NEW_RELEASE_CREATE:
    return <CreateReleaseModal />;
  case MODAL_TYPES.FEATURED_SONGS_CREATE:
    return <CreateSongModal />;
  case MODAL_TYPES.DATA_DELETE:
    return <DeleteDataModal />;
  default:
    return <Fragment />;
  }
};

export default ModalContainer;
