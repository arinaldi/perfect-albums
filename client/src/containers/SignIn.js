import React, { useState, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import { MyContext } from './MyProvider';
import SignIn from '../components/SignIn';
import AppMessage from '../components/AppMessage';

import Api from '../utils/api';

const SignInContainer = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { state, signIn } = useContext(MyContext);

  const handleChange = ({ target: { name, value } }) => {
    if (error) setError('');

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post('/api/signin', credentials);
      const data = await res.json();

      signIn(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  if (state.isAuthenticated) {
    return <Redirect to='/admin' />;
  }

  return (
    <Fragment>
      {error && <AppMessage message={error} />}
      <SignIn
        username={credentials.username}
        password={credentials.password}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default SignInContainer;
