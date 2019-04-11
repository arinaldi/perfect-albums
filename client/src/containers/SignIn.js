import React, { useState, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import SignIn from '../components/SignIn';
import AppMessage from '../components/AppMessage';

import Api from '../utils/api';

import { MyContext } from './MyProvider';

const SignInContainer = () => {
  const { state, signIn } = useContext(MyContext);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (error) setError('');

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await Api.post('/api/signin', credentials);
      const data = await res.json();

      setIsSubmitting(false);
      signIn(data.token);
    } catch (err) {
      setIsSubmitting(false);
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
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default SignInContainer;
