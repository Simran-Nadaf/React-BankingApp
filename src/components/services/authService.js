import axios from 'axios';

// Replace with your actual API URL
const LOGIN_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/auth/login';

export const login = async ({ email, password }) => {
  try {
    console.log('Sending login request to:', LOGIN_API_URL);
    const response = await axios.post(LOGIN_API_URL, { email, password });
    console.log('Login response:', response.data);
    return response.data; // Make sure to return the entire data object if the token is inside it
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};
