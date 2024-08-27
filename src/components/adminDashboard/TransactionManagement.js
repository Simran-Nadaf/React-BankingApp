import React, { useEffect, useState, useCallback } from 'react';
import {
  fetchAllTransactions,
  fetchTransactionById,
  fetchTransactionsByDateRange,
  getPassbook,
} from '../services/transactionService';
import TransactionTable from './TransactionTable';
import Filter from '../sharedcomponents/Filter';
import PageSize from '../sharedcomponents/PageSize';
import Pagination from '../sharedcomponents/Pagination';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchId, setSearchId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [accountId, setAccountId] = useState('');

  const debouncedLoadTransactions = useCallback(
    debounce(() => {
      loadTransactions();
    }, 300),
    [searchId, startDate, endDate, currentPage, pageSize]
  );

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      let data, totalPages;
      if (searchId) {
        // Fetch by ID if searchId is present
        const response = await fetchTransactionById(searchId);
        setTransactions(response ? [response] : []);
        setTotalPages(1);
      } else if (startDate && endDate) {
        // Fetch by date range if dates are provided
        const response = await fetchTransactionsByDateRange(startDate, endDate, currentPage - 1, pageSize);
        data = response.data;
        totalPages = response.totalPages;
        setTransactions(data);
        setTotalPages(totalPages);
      } else {
        // Fetch all transactions otherwise
        const response = await fetchAllTransactions(currentPage - 1, pageSize);
        data = response.data;
        totalPages = response.totalPages;
        setTransactions(data);
        setTotalPages(totalPages);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Error loading transactions.');
      toast.error('Failed to load transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debouncedLoadTransactions();
    return () => {
      debouncedLoadTransactions.cancel();
    };
  }, [debouncedLoadTransactions]);

  const handleSearchById = () => {
    debouncedLoadTransactions();
  };

  const handleFetchTransactionsByDateRange = () => {
    debouncedLoadTransactions();
  };

  const handlePassbook = async () => {
    if (accountId) {
      setLoading(true);
      setError(null);
      try {
        const response = await getPassbook(accountId, startDate, endDate);
        setTransactions(response);
        setTotalPages(1);
      } catch (error) {
        console.error('Error fetching passbook:', error);
        setError('Error fetching passbook.');
        toast.error('Failed to fetch passbook.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="text-center">Transaction Management</h1>
      <div className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="form-control"
            />
            <button className="btn btn-primary mt-2" onClick={handleSearchById}>Search</button>
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control mt-2"
            />
            <button className="btn btn-primary mt-2" onClick={handleFetchTransactionsByDateRange}>Filter by Date Range</button>
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              placeholder="Account ID"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="form-control"
            />
            <button className="btn btn-primary mt-2" onClick={handlePassbook}>Get Passbook</button>
          </div>
        </div>
      </div>
      {transactions && transactions.length > 0 ? (
        <TransactionTable transactions={transactions} />
      ) : (
        <div>No transactions found</div>
      )}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <PageSize
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
        <Pagination
          currentPage={currentPage}
          totalItems={totalPages * pageSize} // Assuming totalPages and pageSize together give total count
          itemsPerPage={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default TransactionManagement;
