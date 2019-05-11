import React from 'react';

const ToastAlert = () => <div />;

export default ToastAlert;

/*
import React, { useContext, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';

import { MyContext } from '../containers/MyProvider';

// let type = '';
// let message = '';

const ToastAlert = () => {
  const { state: { toast }, closeToast } = useContext(MyContext);

  // useEffect(() => {
  //   type = alert.type;
  //   message = alert.message;
  // }, [alert]);

  return (
    <div
      aria-live='polite'
      aria-atomic='true'
      style={{
        position: 'relative',
        minHeight: '100px',
      }}
    >
      <Toast
        onClose={closeToast}
        show={toast.isOpen}
        delay={3000}
        autohide
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <Toast.Header>
          <strong className='mr-auto'>Alert</strong>
        </Toast.Header>
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </div>
  );

  // return (
  //   <div className='alert-container'>
  //     <Alert
  //       className={alertClass}
  //       variant={alert.type || type}
  //     >
  //       {alert.message || message}
  //     </Alert>
  //   </div>
  // );
};

export default ToastAlert;
*/
