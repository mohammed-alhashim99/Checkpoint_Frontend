import sendRequest from './sendRequest';

const BASE_URL = '/reviews/';

// 🔸 إنشاء مراجعة جديدة
export async function create(data) {
  return sendRequest(BASE_URL, 'POST', data);
}

// 🔸 تعديل مراجعة موجودة
export async function update(id, data) {
  return sendRequest(`${BASE_URL}${id}/`, 'PUT', data);
}

// 🔸 جلب مراجعة واحدة (للتعديل أو الحذف)
export async function show(id) {
  return sendRequest(`${BASE_URL}${id}/`);
}

// 🔸 حذف مراجعة
export async function deleteReview(id) {
  return sendRequest(`${BASE_URL}${id}/`, 'DELETE');
}
