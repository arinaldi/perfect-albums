import { ALERT_TYPES, MESSAGES } from '../constants';
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

const handleResponse = (res, signOut, showAlert) => {
  return new Promise((resolve, reject) => {
    if (res.status === 401) {
      if (res.url.includes('signin')) {
        reject(new Error(MESSAGES.SIGNIN));
      } else {
        reject(new Error(MESSAGES.UNAUTHORIZED));
        signOut();
        showAlert(ALERT_TYPES.ERROR, MESSAGES.UNAUTHORIZED);
      }
    } else if (!res.ok) {
      reject(new Error(MESSAGES.ERROR));
    }
    resolve(res);
  });
};

const Api = {
  get: (endpoint) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(),
    }).then(res => res.json())
  ),
  post: (endpoint, payload, signOut, showAlert) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    }).then(res => handleResponse(res, signOut))
  ),
  put: (endpoint, payload, signOut, showAlert) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    }).then(res => handleResponse(res, signOut, showAlert))
  ),
  delete: (endpoint, signOut, showAlert) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }).then(res => handleResponse(res, signOut, showAlert))
  ),
};

export default Api;
