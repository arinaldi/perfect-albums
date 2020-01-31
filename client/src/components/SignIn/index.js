import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Api from '../../utils/api';

import { Context } from '../Provider';
import ErrorBoundary from '../ErrorBoundary';
import AppMessage from '../AppMessage/presenter';
import SignIn from './presenter';

const SignInContainer = () => {
  const { state, signIn } = useContext(Context);
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
    <ErrorBoundary>
      <SignIn
        username={credentials.username}
        password={credentials.password}
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {error && <AppMessage message={error} />}
    </ErrorBoundary>
  );
};

export default SignInContainer;
