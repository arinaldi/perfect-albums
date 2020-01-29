import { TOAST_TYPES, MESSAGES } from '../constants';
import { getToken } from './storage';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://perfectalbums.herokuapp.com'
  : 'http://localhost:3001';

const getHeaders = (withAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };

  if (withAuth) {
    headers.authorization = `Bearer ${getToken()}`;
  }

  return headers;
};

const handleResponse = (res, signOut, showToast) => {
  return new Promise((resolve, reject) => {
    if (res.status === 401) {
      if (res.url.includes('signin')) {
        reject(new Error(MESSAGES.SIGNIN));
      } else {
        reject(new Error(MESSAGES.UNAUTHORIZED));
        signOut();
        showToast({
          type: TOAST_TYPES.ERROR,
          message: MESSAGES.UNAUTHORIZED,
        });
      }
    } else if (!res.ok) {
      reject(new Error(MESSAGES.ERROR));
    }
    resolve(res);
  });
};

const Api = {
  get: (endpoint, withAuth = false) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(withAuth),
    }).then(res => handleResponse(res))
  ),
  post: (endpoint, payload, signOut, showToast) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    }).then(res => handleResponse(res, signOut, showToast))
  ),
  put: (endpoint, payload, signOut, showToast) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    }).then(res => handleResponse(res, signOut, showToast))
  ),
  delete: (endpoint, signOut, showToast) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }).then(res => handleResponse(res, signOut, showToast))
  ),
};

export default Api;
