import React, { useContext } from 'react';
import Toast from 'react-bootstrap/Toast';

import { MyContext } from '../containers/MyProvider';
import { TOAST_TIMEOUT } from '../constants';

const ToastAlert = () => {
  const { state: { toast }, closeToast } = useContext(MyContext);

  return (
    <div
      aria-live='polite'
      aria-atomic='true'
      style={{
        position: 'relative',
        zIndex: 99,
      }}
    >
      <Toast
        onClose={closeToast}
        show={toast.isOpen}
        delay={TOAST_TIMEOUT}
        autohide
        style={{
          position: 'absolute',
          top: 0,
          right: 10,
          minWidth: '300px',
        }}
      >
        <Toast.Header className={toast.type}>
          <strong className='mr-auto capitalize'>{toast.type}</strong>
        </Toast.Header>
        <Toast.Body style={{ backgroundColor: 'white' }}>{toast.message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastAlert;
