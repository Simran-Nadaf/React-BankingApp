import React from 'react';
import { Form } from 'react-bootstrap';

const PageSize = ({ pageSize, onPageSizeChange }) => (
  <Form.Group controlId="pageSize">
    <Form.Label>Items per page</Form.Label>
    <Form.Control
      as="select"
      value={pageSize}
      onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </Form.Control>
  </Form.Group>
);

export default PageSize;
