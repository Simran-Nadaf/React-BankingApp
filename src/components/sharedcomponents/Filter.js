// import React from 'react';
// import { Form } from 'react-bootstrap';

// const Filter = ({ searchName, onSearchNameChange, pageSize, onPageSizeChange }) => (
//   <div className="d-flex justify-content-between align-items-center">
//     <Form.Control
//       type="text"
//       placeholder="Search by Name"
//       value={searchName}
//       onChange={onSearchNameChange}
//       className="mr-2"
//     />
//     <Form.Control as="select" value={pageSize} onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}>
//       <option value={5}>5</option>
//       <option value={10}>10</option>
//       <option value={20}>20</option>
//     </Form.Control>
//   </div>
// );

// export default Filter;
// src/sharedcomponents/Filter.js

import React from 'react';

const Filter = ({ searchName, onSearchNameChange, onPageSizeChange, pageSize }) => {
  return (
    <div className="d-flex">
      <input
        type="text"
        value={searchName}
        onChange={onSearchNameChange}
        placeholder="Search by Name"
        className="form-control me-2"
      />
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="form-select"
      >
        {[10, 25, 50].map(size => (
          <option key={size} value={size}>{size} per page</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
