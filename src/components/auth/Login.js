// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { login } from '../services/authService';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// // import './Login.css'; // Import your CSS file

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     try {
// //       console.log('Attempting login with:', { email, password });
// //       const data = await login({ email, password });
// //       console.log('Login data received:', data);

// //       if (data?.token) {
// //         localStorage.setItem('token', data.token);
// //         toast.success('Login successful!');
// //         navigate('/admin');
// //       } else {
// //         toast.error('Login failed! Only admins can log in.');
// //       }
// //     } catch (error) {
// //       toast.error('Login failed! ' + (error.response?.data?.message || error.message));
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <div className="login-image">
// //         {/* Optional: Add a text or overlay here */}
// //       </div>
// //       <div className="login-card">
// //         <div className="card">
// //           <h2 className="text-center mb-4">Admin Login</h2>
// //           <form onSubmit={handleLogin}>
// //             <div className="form-group">
// //               <label>Email:</label>
// //               <input
// //                 type="email"
// //                 className="form-control"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label>Password:</label>
// //               <input
// //                 type="password"
// //                 className="form-control"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <button type="submit" className="btn btn-primary btn-block">
// //               Login
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default Login;
// LoginComponent.js
// import React, { useState } from 'react';
// import { login } from '../services/authService';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './Login.css'; // Import custom CSS
// import RegisterModal from '../auth/RegisterModal'; // Import RegisterModal component

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showRegister, setShowRegister] = useState(false); // State for modal visibility
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     try {
//       const { token, role } = await login(email, password); // Assuming login returns token and role
//       if (token) {
//         localStorage.setItem('token', token); // Store token in local storage
//         if (role === 'admin') {
//           navigate('/admin-dashboard'); // Redirect to admin dashboard
//         } else {
//           navigate('/user-dashboard'); // Redirect to user dashboard
//         }
//       } else {
//         setError('Invalid credentials. Please try again.');
//       }
//     } catch (e) {
//       console.error(e);
//       setError('Login failed. Please check your credentials and try again.');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 login-container">
//       <div className="card p-4 shadow-lg" style={{ width: '35rem', borderRadius: '15px' }}>
//         <div className="row no-gutters">
//           {/* Left Side: Image */}
//           <div className="col-md-6">
//             <div className="login-image"></div> {/* Background image */}
//           </div>
//           {/* Right Side: Login Form */}
//           <div className="col-md-6">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Login</h2>
//               {error && <div className="alert alert-danger text-center">{error}</div>}
//               <form onSubmit={handleLogin}>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block mt-3 login-btn">
//                   Login
//                 </button>
//               </form>
//               {/* Register button */}
//               <div className="text-center mt-3">
//                 <button 
//                   className="btn btn-secondary" 
//                   onClick={() => setShowRegister(true)}
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Register Modal */}
//       <RegisterModal 
//         show={showRegister} 
//         handleClose={() => setShowRegister(false)} 
//       />
//     </div>
//   );
// };

// export default Login;


// // src/components/Login.js
// // src/components/Login.js
import React, { useState } from 'react';
import { login, verifyAdmin } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import RegisterModal from './RegisterModal';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const token = await login(email, password);
      if (token) {
        localStorage.setItem('token', token); // Store token in local storage

        const isAdmin = await verifyAdmin(); // Ensure `verifyAdmin` uses the token
        if (isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (e) {
      console.error(e);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-container">
      <div className="card p-4 shadow-lg" style={{ width: '35rem', borderRadius: '15px' }}>
        <div className="row no-gutters">
          <div className="col-md-6">
            <div className="login-image"></div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger text-center">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3 login-btn">
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowRegisterModal(true)}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterModal
        show={showRegisterModal}
        handleClose={() => setShowRegisterModal(false)}
      />
    </div>
  );
};

export default Login;


// // src/components/auth/Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login, verifyUser } from '../services/authService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.css';
// import RegisterModal from './RegisterModal';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     try {
//       const { token, role } = await login(email, password); // Assume login returns both token and role
//       if (token) {
//         localStorage.setItem('token', token); // Store token in local storage

//         if (role === 'ADMIN') {
//           toast.success('Welcome Admin! Redirecting to dashboard...');
//           navigate('/admin/dashboard');
//         } else {
//           // For non-admin, you need a way to get userId or customerId
//           const userId = localStorage.getItem('userId'); // Ensure you have stored userId
//           if (userId) {
//             const isUserVerified = await verifyUser(userId); // Verify user status
//             if (isUserVerified) {
//               toast.success('Welcome User! Redirecting to dashboard...');
//               navigate('/user/dashboard');
//             } else {
//               toast.error('User verification failed. Please contact support.');
//             }
//           } else {
//             toast.error('User ID not found. Please contact support.');
//           }
//         }
//       } else {
//         toast.error('Invalid credentials. Please try again.');
//       }
//     } catch (e) {
//       console.error(e);
//       toast.error('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 login-container">
//       <div className="card p-4 shadow-lg" style={{ width: '35rem', borderRadius: '15px' }}>
//         <div className="row no-gutters">
//           <div className="col-md-6">
//             <div className="login-image"></div>
//           </div>
//           <div className="col-md-6">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Login</h2>
//               <form onSubmit={handleLogin}>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block mt-3 login-btn">
//                   Login
//                 </button>
//               </form>
//               <div className="text-center mt-3">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setShowRegisterModal(true)}
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <RegisterModal
//         show={showRegisterModal}
//         handleClose={() => setShowRegisterModal(false)}
//       />
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;

// src/components/auth/Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login, verifyCustomer } from '../services/authService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.css';
// import RegisterModal from './RegisterModal';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const { token, role, customerId } = await login(email, password); // Assume login returns token, role, and customerId

//       if (token) {
//         localStorage.setItem('token', token); // Store token in local storage
//         localStorage.setItem('role', role); // Store role in local storage
//         localStorage.setItem('customerId', customerId); // Store customer ID in local storage

//         if (role === 'ADMIN') {
//           toast.success('Welcome Admin! Redirecting to dashboard...');
//           navigate('/admin/dashboard');
//         } else {
//           const storedCustomerId = localStorage.getItem('customerId'); // Retrieve customer ID
//           if (storedCustomerId) {
//             const isCustomerVerified = await verifyCustomer(storedCustomerId); // Verify customer status
//             if (isCustomerVerified) {
//               toast.success('Welcome User! Redirecting to dashboard...');
//               navigate('/user/dashboard');
//             } else {
//               toast.error('Customer verification failed. Please contact support.');
//             }
//           } else {
//             toast.error('Customer ID not found. Please contact support.');
//           }
//         }
//       } else {
//         toast.error('Invalid credentials. Please try again.');
//       }
//     } catch (e) {
//       console.error(e);
//       toast.error('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 login-container">
//       <div className="card p-4 shadow-lg" style={{ width: '35rem', borderRadius: '15px' }}>
//         <div className="row no-gutters">
//           <div className="col-md-6">
//             <div className="login-image"></div>
//           </div>
//           <div className="col-md-6">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Login</h2>
//               <form onSubmit={handleLogin}>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block mt-3 login-btn">
//                   Login
//                 </button>
//               </form>
//               <div className="text-center mt-3">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setShowRegisterModal(true)}
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <RegisterModal
//         show={showRegisterModal}
//         handleClose={() => setShowRegisterModal(false)}
//       />
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;
