import React, { useEffect } from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const Pagination = ({ baseUrl, totalPages, currentPage }) => {
  const history = useHistory();
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleOnClick = (e, page) => {
    e.preventDefault();
    history.push(`${baseUrl}/${page}`);
  };
  return (
    <div>
      <BSPagination>
        <BSPagination.Prev
          href={`${baseUrl}/${currentPage - 1}`}
          onClick={(e) => handleOnClick(e, currentPage - 1)}
          disabled={currentPage <= 1}
        />
        {pages.map((page) => (
          <BSPagination.Item
            href={`${baseUrl}/${page}`}
            key={page}
            active={page === currentPage}
            onClick={(e) => handleOnClick(e, page)}
          >
            {page}
          </BSPagination.Item>
        ))}
        <BSPagination.Next
          href={`${baseUrl}/${currentPage + 1}`}
          onClick={(e) => handleOnClick(e, currentPage + 1)}
          disabled={currentPage >= totalPages}
        />
      </BSPagination>
    </div>
  );
};

export default Pagination;
