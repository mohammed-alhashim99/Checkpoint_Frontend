export default async function sendRequest(url, method = 'GET', data = null) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;  // ✅ التوكن يضاف هنا
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`http://localhost:8000${url}`, options);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Fetch failed: ${errText}`);
  }

  return res.json();
}
