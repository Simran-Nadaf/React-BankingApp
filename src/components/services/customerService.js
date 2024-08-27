import axios from 'axios';

// Use environment variables for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/customers';

// Helper function to get the authentication token from local storage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found.');
    throw new Error('No authentication token found.');
  }
  return token;
};

// Function to fetch a customer by ID
export const fetchCustomerById = async (id) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customer by ID:', error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch all customers with pagination, sorting, and optional search by firstName
export const fetchCustomers = async ({ page = 0, pageSize = 10, sortField = 'id', sortOrder = 'asc', firstName = '' }) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        size: pageSize,
        sort: `${sortField},${sortOrder}`,
        ...(firstName && { firstName }),  // Only include firstName if it is not an empty string
      },
    };

    const response = await axios.get(`${API_URL}/search`, config);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customers:', error.response?.data || error.message);
    throw error;
  }
};

// Function to update a customer
export const updateCustomer = async (id, customerData) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_URL}/${id}`, customerData, config);
    return response.data;
  } catch (error) {
    console.error('Failed to update customer:', error.response?.data || error.message);
    throw error;
  }
};

// Function to create a new customer
export const createCustomer = async (customerData) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(API_URL, customerData, config);
    return response.data;
  } catch (error) {
    console.error('Failed to create customer:', error.response?.data || error.message);
    throw error;
  }
};