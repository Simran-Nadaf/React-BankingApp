import axios from 'axios';

// Use environment variables for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/transactions';

// Helper function to get the authentication token from local storage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found.');
    throw new Error('No authentication token found.');
  }
  return token;
};

// Function to fetch all transactions with pagination (Admin and Customer)
export const fetchAllTransactions = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { page, pageSize },
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });

    return {
      data: response.data.transactions,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error('Error fetching all transactions:', error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch a transaction by ID (Admin and Customer)
export const fetchTransactionById = async (id) => {
  if (!id) {
    console.error('Invalid transaction ID:', id);
    throw new Error('Invalid transaction ID');
  }

  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch transaction with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch transactions by date range with pagination (Admin and Customer)
export const fetchTransactionsByDateRange = async (startDate, endDate, page = 1, pageSize = 10) => {
  if (!startDate || !endDate) {
    console.error('Invalid date range:', startDate, endDate);
    throw new Error('Invalid date range');
  }

  try {
    const response = await axios.get(`${API_URL}/date-range`, {
      params: { startDate, endDate, page, pageSize },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return {
      data: response.data.transactions,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error('Failed to fetch transactions by date range:', error.response?.data || error.message);
    throw error;
  }
};

// Function to create a new transaction (Admin only)
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}`, transactionData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create transaction:', error.response?.data || error.message);
    throw error;
  }
};

// Function to update a transaction by ID (Admin only)
export const updateTransaction = async (id, transactionData) => {
  if (!id) {
    console.error('Invalid transaction ID:', id);
    throw new Error('Invalid transaction ID');
  }

  try {
    const response = await axios.put(`${API_URL}/${id}`, transactionData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update transaction with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Function to delete a transaction by ID (Admin only)
export const deleteTransaction = async (id) => {
  if (!id) {
    console.error('Invalid transaction ID:', id);
    throw new Error('Invalid transaction ID');
  }

  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  } catch (error) {
    console.error(`Failed to delete transaction with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Function to handle money transfer between accounts (Admin only)
export const transferMoneyWithinAccounts = async (customerId, fromAccountId, toAccountId, amount) => {
  if (!customerId || !fromAccountId || !toAccountId || !amount) {
    console.error('Invalid transfer data:', customerId, fromAccountId, toAccountId, amount);
    throw new Error('Invalid transfer data');
  }

  try {
    const response = await axios.post(`${API_URL}/transfer-within-accounts`, {
      customerId, fromAccountId, toAccountId, amount
    }, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to transfer money within accounts:', error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch transactions by account ID and date range
export const getTransactionsByAccountIdAndDateRange = async (accountId, startDate, endDate) => {
  if (!accountId) {
    console.error('Invalid account ID:', accountId);
    throw new Error('Invalid account ID');
  }

  try {
    const response = await axios.get(`${API_URL}/passbook`, {
      params: { accountId, startDate, endDate },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch transactions by account ID and date range:', error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch passbook entries for a given account ID
export const getPassbook = async (accountId, startDate, endDate) => {
  if (!accountId) {
    console.error('Invalid account ID:', accountId);
    throw new Error('Invalid account ID');
  }

  try {
    const response = await axios.get(`${API_URL}/passbook`, {
      params: { accountId, startDate, endDate },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch passbook entries:', error.response?.data || error.message);
    throw error;
  }
};
