// src/components/adminDashboard/CustomerCreateForm.js
import React, { useState } from 'react';
import { createCustomer } from '../services/customerService';
import { ToastContainer, toast } from 'react-toastify';

const CustomerCreateForm = ({ onClose }) => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    aadhaarCard: '',
    panCard: '',
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(customer);
      toast.success('Customer created successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create customer.');
    }
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={customer.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Aadhaar Card Path</label>
          <input
            type="text"
            name="aadhaarCard"
            value={customer.aadhaarCard}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Pan Card Path</label>
          <input
            type="text"
            name="panCard"
            value={customer.panCard}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Active</label>
          <input
            type="checkbox"
            name="isActive"
            checked={customer.isActive}
            onChange={(e) => setCustomer({ ...customer, isActive: e.target.checked })}
            className="form-control"
          />
        </div>
        <button type="submit" onClick={createCustomer} className="btn btn-primary">Create</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CustomerCreateForm;
