import sendRequest from './sendRequest';

const BASE_URL = '/reviews/';

export function create(reviewData) {
  return sendRequest('/reviews/', 'POST', reviewData);
}

export function update(id, reviewData) {
  return sendRequest(`/reviews/${id}/`, 'PUT', reviewData);
}

export function show(id) {
  return sendRequest(`/reviews/${id}/`);
}

export function deleteReview(id) {
  return sendRequest(`/reviews/${id}/`, 'DELETE');
}

export function getGames() {
  return sendRequest('/games/');
}

export function addGame(gameData) {
  return sendRequest('/games/', 'POST', gameData);
}
