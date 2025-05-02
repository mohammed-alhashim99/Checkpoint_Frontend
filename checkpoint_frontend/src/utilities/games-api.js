import sendRequest from "./sendRequest"
const url = "/games/"


export async function getAllGames() {
  try {
    return await sendRequest(url)
  } catch {
    return []
  }
}


export async function getGame(id) {
  try {
    return await sendRequest(`${url}${id}/`)
  } catch {
    return null
  }
}


export async function createGame(data) {
  try {
    return await sendRequest(url, "POST", data)
  } catch {
    return null
  }
}


export async function updateGame(id, data) {
  try {
    return await sendRequest(`${url}${id}/`, "PUT", data)
  } catch {
    return null
  }
}


export async function deleteGame(id) {
  try {
    return await sendRequest(`${url}${id}/`, "DELETE")
  } catch {
    return false
  }
}
