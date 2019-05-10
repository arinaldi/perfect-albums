import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

import { MyContext } from '../containers/MyProvider';

let type = '';
let message = '';

const AppAlert = () => {
  const { state: { alert } } = useContext(MyContext);
  const alertClass = alert.isOpen ? 'alert-show' : 'alert-hide';

  useEffect(() => {
    type = alert.type;
    message = alert.message;
  }, [alert]);

  return (
    <div className='alert-container'>
      <Alert
        className={alertClass}
        variant={alert.type || type}
      >
        {alert.message || message}
      </Alert>
    </div>
  );
};

export default AppAlert;
