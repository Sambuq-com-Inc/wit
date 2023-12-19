import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[login, setLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform HR login validation
    try {
      const url = 'http://localhost:8001/api/hrlogin';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      sessionStorage.setItem('login', login);

      if (response.ok) {
        const data = await response.json();
        // Login successful
        console.log('Login successful');
        console.log('User Name:', data.name);
        window.location.href = '/Dashboard';
      } else {
        // Login failed
        window.alert('Invalid login details');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className='mainlogin'>
      <form className='loginform' onSubmit={handleSubmit}>
        <h2 className='loginhead'>HR Login</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={()=>setLogin(true)} type="submit" className="btn btn-primary">
          HR Login
        </button>
      </form>
    </div>
  );
};

export default Login;
