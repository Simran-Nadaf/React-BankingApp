import React, { useEffect, useState, useCallback } from 'react';
import { fetchCustomers, fetchCustomerById, updateCustomer } from '../services/customerService';
import Table from '../sharedcomponents/Table';
import Filter from '../sharedcomponents/Filter';
import CustomerUpdateForm from './CustomerUpdateForm';
import PageSize from '../sharedcomponents/PageSize';
import Pagination from '../sharedcomponents/Pagination';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);

  const debouncedLoadCustomers = useCallback(
    debounce(() => {
      loadCustomers();
    }, 300),
    [searchName, currentPage, pageSize, sortField, sortOrder]
  );

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const data = await fetchCustomers({
        page: currentPage - 1,
        pageSize,
        sortField,
        sortOrder,
        firstName: searchName,
      });
      setCustomers(data.customers);
      setTotalCustomers(data.totalItems);
    } catch (error) {
      setError('Error loading customers.');
      toast.error('Failed to load customers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debouncedLoadCustomers();
    return () => {
      debouncedLoadCustomers.cancel();
    };
  }, [debouncedLoadCustomers]);

  const handleSearchIdChange = async (e) => {
    const id = e.target.value;
    setSearchId(id);

    if (id) {
      try {
        setLoading(true);
        const customer = await fetchCustomerById(id);
        setCustomers([customer]);
        setTotalCustomers(1);
      } catch (error) {
        setError('Error fetching customer by ID.');
        setCustomers([]);
        setTotalCustomers(0);
        toast.error('Customer not found.');
      } finally {
        setLoading(false);
      }
    } else {
      loadCustomers();
    }
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleUpdateCustomer = async (customerData) => {
    try {
      await updateCustomer(customerData.id, customerData);
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === customerData.id ? customerData : customer
        )
      );
      toast.success('Customer updated successfully!');
      setShowModal(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized: Please log in as an admin.');
      } else if (error.response && error.response.status === 403) {
        toast.error('Forbidden: You do not have permission to update this customer.');
      } else {
        toast.error('Failed to update customer');
      }
      setError(error);
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="text-center">Banking Application</h1>
      <div className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              value={searchId}
              onChange={handleSearchIdChange}
              placeholder="Search by ID"
              className="form-control"
            />
          </div>
          <div className="col-md-8">
            <Filter 
              searchName={searchName} 
              onSearchNameChange={handleSearchNameChange} 
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </div>
      {customers && customers.length > 0 ? (
        <Table
          data={customers}
          onUpdate={handleOpenModal}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSortChange}
        />
      ) : (
        <div>No customers found</div>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <CustomerUpdateForm
              customerId={selectedCustomer.id}
              onUpdate={handleUpdateCustomer}
              onClose={handleCloseModal}
            />
          )}
        </Modal.Body>
      </Modal>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <PageSize
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
        <Pagination
          currentPage={currentPage}
          totalItems={totalCustomers}
          itemsPerPage={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
