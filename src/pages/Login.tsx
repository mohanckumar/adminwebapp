import React, { useState } from 'react'
// import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  // inside Login component
const navigate = useNavigate()

const handleLogin = async () => {
  // const { data, error } = await supabase.auth.signInWithPassword({
  //   email,
  //   password,
  // })

  // if (error) {
  //   setError(error.message)
  // } else {
  //   setError('')
  //   setMessage('Login successful!')
  //   navigate('/dashboard') // navigate to Dashboard
  // }
}

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  )
}

export default Login
