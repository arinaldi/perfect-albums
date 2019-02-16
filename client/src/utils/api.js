const getHeaders = (withAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };

  if (withAuth) {
    headers.authorization = localStorage.getItem('token');
  }

  return headers;
}

const Api = {
  get: endpoint => (
    fetch(endpoint, {
      method: 'GET',
      headers: getHeaders()
    })
  ),
  post: (endpoint, payload) => (
    fetch(endpoint, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(payload)
    })
  ),
  put: (endpoint, payload) => (
    fetch(endpoint, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(payload)
    })
  ),
  delete: endpoint => (
    fetch(endpoint, {
      method: 'DELETE',
      headers: getHeaders(true)
    })
  )
};

export default Api;