import { useContext } from 'react';

import { Context } from '../components/Provider';

const useAppState = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useAppState must be used within a Provider');
  }

  return context;
};

export default useAppState;
