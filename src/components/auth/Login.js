import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Login.css'; // Import your CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting login with:', { email, password });
      const data = await login({ email, password });
      console.log('Login data received:', data);

      if (data?.token) {
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        navigate('/admin');
      } else {
        toast.error('Login failed! Only admins can log in.');
      }
    } catch (error) {
      toast.error('Login failed! ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        {/* Optional: Add a text or overlay here */}
      </div>
      <div className="login-card">
        <div className="card">
          <h2 className="text-center mb-4">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
