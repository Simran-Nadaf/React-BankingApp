import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { fetchCustomerById } from '../services/customerService';

const CustomerUpdateForm = ({ customerId, onUpdate, onClose }) => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isActive: true,
  });

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const customer = await fetchCustomerById(customerId);
        setCustomerData(customer);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    loadCustomer();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(customerData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={customerData.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={customerData.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="isActive">
        <Form.Check
          type="checkbox"
          name="isActive"
          label="Active"
          checked={customerData.isActive}
          onChange={(e) =>
            setCustomerData((prevData) => ({
              ...prevData,
              isActive: e.target.checked,
            }))
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </Form>
  );
};

export default CustomerUpdateForm;
