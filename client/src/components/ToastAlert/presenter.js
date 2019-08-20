import React, { useContext } from 'react';
import Toast from 'react-bootstrap/Toast';

import { TOAST_TIMEOUT } from '../../constants';

import { Context } from '../Provider';

const ToastAlert = () => {
  const { state: { toast }, closeToast } = useContext(Context);
  const zIndex = toast.isOpen ? 99 : 0;

  return (
    <div
      aria-live='polite'
      aria-atomic='true'
      style={{
        position: 'relative',
        zIndex,
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