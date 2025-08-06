import React, { useState } from 'react';
import API from '../api';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await API.post('token/', { username, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  return (
    <form onSubmit={loginUser}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
