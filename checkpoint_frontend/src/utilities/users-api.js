import sendRequest from "./sendRequest"
const url = "/users/"

export async function signup(formData) {
  try {
    const { access, user } = await sendRequest(`${url}signup/`, "POST", formData)
    localStorage.setItem("token", access)
    return user
  } catch {
    localStorage.removeItem("token")
    return null
  }
}

export async function login(formData) {
  try {
    const { access, user } = await sendRequest(`${url}login/`, "POST", formData)
    localStorage.setItem("token", access)
    return user
  } catch {
    localStorage.removeItem("token")
    return null
  }
}

export function logout() {
  localStorage.removeItem("token")
}

export async function getUser() {
  try {
    const { access, user } = await sendRequest(`${url}token/refresh/`)
    localStorage.setItem("token", access)
    return user
  } catch {
    return null
  }
}
