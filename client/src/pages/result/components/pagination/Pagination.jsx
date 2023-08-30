import React from 'react'
import './Pagination.scss'

export const Pagination = ({ currentPage, lastPage, setPage }) => {
    const renderButtons = () => {
      const buttons = [];
      for (let i = 1; i <= lastPage; i++) {
        buttons.push(
          <button
            key={i}
            className={`pagination__button ${
              currentPage === i ? "pagination__buttonActive" : ""
            }`}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        );
      }
      return buttons;
    };
  
    return <div className="pagination">{renderButtons()}</div>;
  };
  
