import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/register' : '/api/login';
    const apiUrl = `https://fast_todoApp-backend.cloud-stacks.com${endpoint}`;

    try {
      const response = await axios.post(apiUrl, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (isRegistering) {
        alert('Registration successful. Please login.');
        setIsRegistering(false);
      } else {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setErrorMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <p className="toggle-auth">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? ' Login here' : ' Register here'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
