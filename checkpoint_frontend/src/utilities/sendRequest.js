const BASE_URL = 'http://localhost:8000'; // ← غيّره إذا كنت تستخدم عنوان آخر لـ Django backend

export default async function sendRequest(url, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // ✅ أضف التوكن إذا كان موجود
  const token = localStorage.getItem('token');
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ أضف البيانات إذا فيه body
  if (body) {
    options.body = JSON.stringify(body);
  }

  // ✅ أرسل الطلب للـ backend وليس frontend
  const res = await fetch(`${BASE_URL}${url}`, options);

  // ❌ لو فيه خطأ، ارجع رسالة مفهومة
  if (!res.ok) {
    let errorMsg = `Request failed with status ${res.status}`;
    try {
      const errorData = await res.json();
      errorMsg = errorData.error || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  // ✅ حالة الحذف: No Content
  if (res.status === 204) {
    return null;
  }

  // ✅ تحليل JSON فقط لما يكون موجود
  return await res.json();
}
