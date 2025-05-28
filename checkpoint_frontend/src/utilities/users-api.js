import sendRequest from "./sendRequest";

const url = "/users/";

export async function signup(formData) {
  try {
    const formattedData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
    };
    const response = await sendRequest(`${url}signup/`, "POST", formattedData);
    localStorage.setItem("token", response.access);
    localStorage.setItem("user", JSON.stringify(response.user));
    return response.user;
  } catch (err) {
    localStorage.removeItem("token");
    return null;
  }
}


export async function login(formData) {
  try {
    const response = await sendRequest(`${url}login/`, "POST", formData);
    localStorage.setItem("token", response.access);
    localStorage.setItem("user", JSON.stringify(response.user)); 
    return response.user;
  } catch (err) {
    localStorage.removeItem("token");
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); 
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
