// // import axios from 'axios';
// // import handleApiError from '../utils/handleApiError'; // Import handleApiError function

// // // Replace with your actual API URL
// // const LOGIN_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/auth/login';

// // export const login = async ({ email, password }) => {
// //   try {
// //     console.log('Sending login request to:', LOGIN_API_URL);
// //     const response = await axios.post(LOGIN_API_URL, { email, password });
// //     console.log('Login response:', response.data);
// //     return response.data; 
// //   } catch (error) {
// //     handleApiError(error); // Use centralized error handling
// //     throw error; // Re-throw the error after handling
// //   }
// // };

// // authService.js

import axios from 'axios';

const LOGIN_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/auth';

// Function to handle user registration
export const register = async (formData) => {
  const form = new FormData();
  form.append('firstName', formData.firstName);
  form.append('lastName', formData.lastName);
  form.append('email', formData.email);
  form.append('password', formData.password);
  form.append('aadhaarCard', formData.aadhaarCard);
  form.append('panCard', formData.panCard);
  form.append('role', formData.role);

  try {
    const response = await axios.post(`${LOGIN_API_URL}/register`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Improved error handling
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Function to handle login and token storage
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${LOGIN_API_URL}/login`, { email, password });
    const { token } = response.data;

    if (token) {
      localStorage.setItem('token', token);
      return token;
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw new Error('Login failed. Please check your credentials.');
  }
};

// Function to verify if the token belongs to an admin
export const verifyAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post(`${LOGIN_API_URL}/verify-admin`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming a 200 status code indicates the user is an admin
    return response.status === 200;
  } catch (error) {
    console.error('Admin verification failed:', error.response?.data || error.message);
    return false;
  }
};

// Function to verify if the logged-in user is verified
// export const verifyUser = async (customerId) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(`${LOGIN_API_URL}/verify-user`, {
//       params: { customerId },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data; // Should return true or false
//   } catch (error) {
//     console.error('User verification failed:', error);
//     return false;
//   }
// };

// Function to logout and clear token
export const logout = () => {
  localStorage.removeItem('token');
};

// import axios from 'axios';

// const LOGIN_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/auth';

// // Function to handle user registration
// export const register = async (formData) => {
//   const form = new FormData();
//   form.append('firstName', formData.firstName);
//   form.append('lastName', formData.lastName);
//   form.append('email', formData.email);
//   form.append('password', formData.password);
//   form.append('aadhaarCard', formData.aadhaarCard);
//   form.append('panCard', formData.panCard);
//   form.append('role', formData.role);

//   try {
//     const response = await axios.post(`${LOGIN_API_URL}/register`, form, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Registration error:', error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
//   }
// };

// // Function to handle login and token storage
// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${LOGIN_API_URL}/login`, { email, password });
//     const { token, role } = response.data;

//     if (token) {
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role); // Store role in local storage
//       return { token, role };
//     } else {
//       throw new Error('No token received from the server');
//     }
//   } catch (error) {
//     console.error('Login failed:', error.response?.data || error.message);
//     throw new Error('Login failed. Please check your credentials and try again.');
//   }
// };

// // Function to verify if the token belongs to an admin
// export const verifyAdmin = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token found. Please log in again.');
//     }

//     const response = await axios.post(`${LOGIN_API_URL}/verify-admin`, null, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.status === 200;
//   } catch (error) {
//     console.error('Admin verification failed:', error.response?.data || error.message);
//     return false;
//   }
// };

// // Function to verify if the logged-in user is verified
// export const verifyUser = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('No token found. Please log in again.');
//     }

//     const role = localStorage.getItem('role');
//     if (role !== 'CUSTOMER') {
//       throw new Error('User is not a customer.');
//     }

//     const response = await axios.get(`${LOGIN_API_URL}/verify-user`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data; // Should return true or false based on verification status
//   } catch (error) {
//     console.error('User verification failed:', error.response?.data || error.message);
//     return false;
//   }
// };

// // Function to logout and clear token
// export const logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('role'); // Clear role from local storage
// };

// src/services/authService.js
// import axios from 'axios';

// const LOGIN_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/auth';

// // Function to handle user registration
// export const register = async (formData) => {
//   const form = new FormData();
//   form.append('firstName', formData.firstName);
//   form.append('lastName', formData.lastName);
//   form.append('email', formData.email);
//   form.append('password', formData.password);
//   form.append('aadhaarCard', formData.aadhaarCard);
//   form.append('panCard', formData.panCard);
//   form.append('role', formData.role);

//   try {
//     const response = await axios.post(`${LOGIN_API_URL}/register`, form, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Registration error:', error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
//   }
// };

// // Function to handle login and token storage
// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${LOGIN_API_URL}/login`, { email, password });
//     const { token, role, userId } = response.data;

//     if (token) {
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role); // Store role in local storage
//       localStorage.setItem('userId', userId); // Store user ID in local storage
//       return { token, role, userId };
//     } else {
//       throw new Error('No token received from the server');
//     }
//   } catch (error) {
//     console.error('Login failed:', error.response?.data || error.message);
//     throw new Error('Login failed. Please check your credentials and try again.');
//   }
// };

// // Function to verify if the logged-in user is a customer and their status
// export const verifyCustomer = async (customerId) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(`${LOGIN_API_URL}/verify-customer/${customerId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     return response.data; // Assuming the response data is a boolean indicating verification status
//   } catch (error) {
//     console.error('Verification error:', error);
//     throw error;
//   }
// };
// export const verifyAdmin = async () => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     throw new Error('No token found');
//   }

//   try {
//     const response = await axios.get(`${LOGIN_API_URL}/auth/verify-admin`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data; // Assuming the API returns a boolean or object indicating admin status
//   } catch (error) {
//     console.error('Error verifying admin status:', error);
//     throw error; // Rethrow to handle in ProtectedRoute
//   }
// };
// // Function to logout and clear token
// export const logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('role'); // Clear role from local storage
//   localStorage.removeItem('userId'); // Clear user ID from local storage
// };
