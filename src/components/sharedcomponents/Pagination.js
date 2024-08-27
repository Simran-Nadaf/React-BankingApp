import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <Pagination>
      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default CustomPagination;
