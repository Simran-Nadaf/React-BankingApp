import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import MainDashboard from './components/adminDashboard/MainDashboard';
import CustomerManagement from './components/adminDashboard/CustomerManagement';
import AccountManagement from './components/adminDashboard/AccountManagement';
import TransactionManagement from './components/adminDashboard/TransactionManagement';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} />

        {/* Route for the main dashboard after login */}
        <Route path="/admin/dashboard" element={<MainDashboard />} />

        {/* Route for customer management */}
        <Route path="/admin/customers" element={<CustomerManagement />} />

        {/* Route for account management */}
        <Route path="/admin/accounts" element={<AccountManagement />} />

        {/* Route for transaction management */}
        <Route path="/admin/transactions" element={<TransactionManagement />} />

        {/* Redirect to main dashboard if no route matches */}
        <Route path="*" element={<MainDashboard />} />
      </Routes>
      {/* Toast notifications container */}
      <ToastContainer />
    </Router>
  );
}

export default App;
