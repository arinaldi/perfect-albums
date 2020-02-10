import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';

import Api from '../../utils/api';
import { getToken, removeToken } from '../../utils/storage';
import { providerReducer, providerInitialState } from '../../reducers/provider';
import { DISPATCH_TYPES } from '../../constants';

const StateContext = createContext();
const DispatchContext = createContext();

const Provider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(providerReducer, providerInitialState);

  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();

      if (token) {
        try {
          const res = await Api.get('/api/auth', true);

          if (res.status === 200) {
            dispatch({
              payload: true,
              type: DISPATCH_TYPES.SET_USER,
            });
          } else {
            removeToken();
          }
        } catch (err) {
          removeToken();
        }
      }
    };

    checkUser();
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAppState = () => {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a Provider');
  }

  return context;
};

const useAppDispatch = () => {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a Provider');
  }

  return context;
};

const useApp = () => {
  return [useAppState(), useAppDispatch()];
};

export { Provider, useApp, useAppDispatch, useAppState };
