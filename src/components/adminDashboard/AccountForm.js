import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const AccountForm = ({ account, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: '', // Add id here to ensure it's included when present
    accountNo: '',
    balance: '',
    customerId: '',
    bankId: '',
    active: true,
  });

  useEffect(() => {
    if (account) {
      setFormData({
        id: account.id || '', // Include id if it's available
        accountNo: account.accountNo || '',
        balance: account.balance,
        customerId: account.customerId,
        bankId: account.bankId,
        active: account.active,
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox and input fields properly
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      balance: parseFloat(formData.balance), // Ensure balance is a number
      customerId: parseInt(formData.customerId, 10), // Ensure customerId is a number
      bankId: parseInt(formData.bankId, 10), // Ensure bankId is a number
    };
    onSave(updatedData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formAccountNo">
        <Form.Label>Account Number</Form.Label>
        <Form.Control
          type="text"
          name="accountNo"
          value={formData.accountNo}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBalance">
        <Form.Label>Balance</Form.Label>
        <Form.Control
          type="number"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCustomerId">
        <Form.Label>Customer ID</Form.Label>
        <Form.Control
          type="number"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBankId">
        <Form.Label>Bank ID</Form.Label>
        <Form.Control
          type="number"
          name="bankId"
          value={formData.bankId}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formActive">
        <Form.Check
          type="checkbox"
          label="Active"
          name="active"
          checked={formData.active}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
      <Button variant="secondary" onClick={onClose} className="ms-2">
        Cancel
      </Button>
    </Form>
  );
};

export default AccountForm;
