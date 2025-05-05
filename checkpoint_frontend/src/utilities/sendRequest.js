const BASE_URL = 'http://localhost:8000';

export default async function sendRequest(url, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = localStorage.getItem('token');
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${url}`, options);

  if (!res.ok) {
    let errorMsg = `Request failed with status ${res.status}`;
    try {
      const errorData = await res.json();
      errorMsg = Object.values(errorData).flat().join(' ') || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  if (res.status === 204) {
    return null;
  }

  return await res.json();
}
