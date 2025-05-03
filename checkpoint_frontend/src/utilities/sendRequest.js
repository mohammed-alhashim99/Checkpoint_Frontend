export default async function sendRequest(url, method = 'GET', data = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(`http://localhost:8000${url}`, options);

  if (!res.ok) {
    const errText = await res.text();  // ← اطبع محتوى الخطأ بدلاً من "Fetch failed"
    throw new Error(`Fetch failed: ${errText}`);
  }

  return res.json();
}
