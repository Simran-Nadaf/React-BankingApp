// AccountManagement.js
import React, { useState, useEffect } from 'react';
import {
  fetchAllAccounts,
  fetchAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../services/accountService';
import AccountTable from './AccountTable';
import AccountForm from './AccountForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner, Modal } from 'react-bootstrap';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load all accounts on component mount
  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const data = await fetchAllAccounts();
      setAccounts(data);
    } catch (error) {
      toast.error('Failed to load accounts.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (accountData) => {
    try {
      const newAccount = await createAccount(accountData);
      setAccounts([...accounts, newAccount]);
      toast.success('Account created successfully!');
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to create account.');
    }
  };

  const handleUpdateAccount = async (accountData) => {
    // Check if accountData is provided and if it contains a valid id
    if (!accountData) {
      console.error('Invalid account data provided:', accountData);
      toast.error('Invalid account data.');
      return;
    }
  
    if (!accountData.id) {
      console.error('Account data is missing an id:', accountData);
      toast.error('Account ID is missing.');
      return;
    }
  
    try {
      const updatedAccount = await updateAccount(accountData.id, accountData);
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === updatedAccount.id ? updatedAccount : account
        )
      );
      toast.success('Account updated successfully!');
      setShowModal(false);
      setIsEditing(false);
      setSelectedAccount(null);
    } catch (error) {
      console.error('Failed to update account:', error.response?.data || error.message);
      toast.error(`Failed to update account: ${error.response?.data?.message || error.message}`);
    }
  };
  

  const handleDeleteAccount = async (id) => {
    try {
      await deleteAccount(id);
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== id)
      );
      toast.success('Account deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete account.');
    }
  };

  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCreateClick = () => {
    setSelectedAccount(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccount(null);
  };

  return (
    <div>
      <h1>Account Management</h1>
      <button onClick={handleCreateClick} className="btn btn-primary mb-3">
        Create Account
      </button>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <AccountTable
          accounts={accounts}
          onEdit={handleEditClick}
          onDelete={handleDeleteAccount}
        />
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Account' : 'Create Account'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AccountForm
            account={selectedAccount}
            onSave={isEditing ? handleUpdateAccount : handleCreateAccount}
            onClose={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default AccountManagement;
