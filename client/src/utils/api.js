import { getToken } from './storage';

const getHeaders = (withAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };

  if (withAuth) {
    headers.authorization = `Bearer ${getToken()}`;
  }

  return headers;
}

const Api = {
  get: (endpoint) => (
    fetch(endpoint, {
      method: 'GET',
      headers: getHeaders(),
    }).then(res => res.json())
  ),
  post: (endpoint, payload) => (
    fetch(endpoint, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    })
  ),
  put: (endpoint, payload) => (
    fetch(endpoint, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    })
  ),
  delete: endpoint => (
    fetch(endpoint, {
      method: 'DELETE',
      headers: getHeaders(true),
    })
  )
};

export default Api;