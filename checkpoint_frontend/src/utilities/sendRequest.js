export default async function sendRequest(url, method = "GET", payload = null) {
        const token = localStorage.getItem("token")
      
        const options = {
          method,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(payload && { "Content-Type": "application/json" })
          },
          ...(payload && { body: JSON.stringify(payload) })
        }
      
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + url, options)
        if (!res.ok) throw new Error("Fetch failed")
        return await res.json()
      }
      