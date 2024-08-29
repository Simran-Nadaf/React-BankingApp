// import axios from 'axios';
// import { handleApiError } from '../utils/handleApiError';

// // Use environment variables for API URL
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/auth';

// // Helper function to get the authentication token from local storage
// const getAuthToken = () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     console.error('No authentication token found.');
//     throw new Error('No authentication token found.');
//   }
//   return token;
// };

// // Function to register a new user
// export const register = async (formData) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     const errorMessage = handleApiError(error);
//     console.error('Failed to register:', errorMessage);
//     throw new Error(errorMessage);
//   }
// };

// // Function to get user transactions
// export const getUserTransactions = async () => {
//   try {
//     const token = getAuthToken();
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.get(`${API_URL}/transactions`, config);
//     return response.data;
//   } catch (error) {
//     const errorMessage = handleApiError(error);
//     console.error('Failed to get user transactions:', errorMessage);
//     throw new Error(errorMessage);
//   }
// };

// // Function to transfer money
// export const transferMoney = async (fromAccountId, toAccountId, amount) => {
//   try {
//     const token = getAuthToken();
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const data = { fromAccountId, toAccountId, amount };
//     const response = await axios.post(`${API_URL}/transfer`, data, config);
//     return response.data;
//   } catch (error) {
//     const errorMessage = handleApiError(error);
//     console.error('Failed to transfer money:', errorMessage);
//     throw new Error(errorMessage);
//   }
// };

// // Function to withdraw funds
// export const withdrawFunds = async (accountId, amount) => {
//   try {
//     const token = getAuthToken();
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const data = { accountId, amount };
//     const response = await axios.post(`${API_URL}/withdraw`, data, config);
//     return response.data;
//   } catch (error) {
//     const errorMessage = handleApiError(error);
//     console.error('Failed to withdraw funds:', errorMessage);
//     throw new Error(errorMessage);
//   }
// };

// // Function to deposit funds
// export const depositFunds = async (accountId, amount) => {
//   try {
//     const token = getAuthToken();
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const data = { accountId, amount };
//     const response = await axios.post(`${API_URL}/deposit`, data, config);
//     return response.data;
//   } catch (error) {
//     const errorMessage = handleApiError(error);
//     console.error('Failed to deposit funds:', errorMessage);
//     throw new Error(errorMessage);
//   }
// };

// // Function to get passbook entries
// export const getPassbook = async (accountId, startDate, endDate) => {
//   try {
//     const token = getAuthToken();
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         accountId,
//         ...(startDate && { startDate }),
//         ...(endDate && { endDate }),
//       },
//     };
//     const response = await axios.get(`${API_URL}/passbook`, config);
//     return response.data;
//   } catch (error) {
//     const errorMessage = handleApiError(error);
//     console.error('Failed to get passbook entries:', errorMessage);
//     throw new Error(errorMessage);
//   }
// };
import axios from 'axios';
import { handleApiError } from '../utils/handleApiError';

// Use environment variables for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api';

// Helper function to get the authentication token from local storage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found.');
    throw new Error('No authentication token found.');
  }
  return token;
};

// Function to register a new user
export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    console.error('Failed to register:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Function to get user transactions
export const getUserTransactions = async () => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/transactions`, config);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    console.error('Failed to get user transactions:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Function to transfer money
export const transferMoney = async (recipientAccount, amount) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = { recipientAccount, amount };
    const response = await axios.post(`${API_URL}/transfer`, data, config);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    console.error('Failed to transfer money:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Function to withdraw funds
export const withdrawFunds = async (amount) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = { amount };
    const response = await axios.post(`${API_URL}/withdraw`, data, config);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    console.error('Failed to withdraw funds:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Export other functions if necessary
