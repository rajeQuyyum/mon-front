import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const API = import.meta.env.VITE_API || 'http://localhost:8000';


  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    axios.post(`${API}/admin/login`, { username, password })
      .then(result => {
        if (result.data.status === "success") {
          localStorage.setItem("admin", JSON.stringify(result.data.admin))
          navigate("/admin/dashboard")
        } else setError(result.data)
      })
      .catch(() => setError("Something went wrong. Try again."))
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-black p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Admin Login</h2>
        <input type="text" placeholder="Username" className="border p-2 w-full mb-3"
          value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-3"
          value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="bg-blue-500 text-white w-full py-2 rounded">Login</button>
      </form>
    </div>
  )
}

export default AdminLogin
