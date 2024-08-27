import React from 'react';
import { Form } from 'react-bootstrap';

const Filter = ({ searchName, onSearchNameChange, pageSize, onPageSizeChange }) => (
  <div className="d-flex justify-content-between align-items-center">
    <Form.Control
      type="text"
      placeholder="Search by Name"
      value={searchName}
      onChange={onSearchNameChange}
      className="mr-2"
    />
    <Form.Control as="select" value={pageSize} onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </Form.Control>
  </div>
);

export default Filter;
