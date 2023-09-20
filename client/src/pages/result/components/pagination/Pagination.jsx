import React from 'react';
import './Pagination.scss';
import { next, previous } from '../../../../assets/svgs/svgs';

export const Pagination = ({ currentPage, lastPage, setPage }) => {
  const renderButtons = () => {
    const buttons = [];

    const showFirst = 2;
    const showLast = 3;

    let start = Math.max(1, currentPage - showFirst + 1);
    let end = Math.min(lastPage, currentPage + showLast - 1);

    if (currentPage > 1) {
      buttons.push(
        <button
          key="previous"
          className="pagination__selector"
          onClick={() => setPage(currentPage - 1)}
        >
          {previous.icon}
        </button>
      );
    }

    if (start > 1) {
      buttons.push(
        <button
          key={1}
          className="pagination__button"
          onClick={() => setPage(1)}
        >
          1
        </button>
      );

      if (start > 2) {
        buttons.push(<span key="ellipsis1">...</span>);
      }
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination__button ${currentPage === i ? 'pagination__buttonActive' : ''
            }`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    if (end < lastPage) {
      if (end < lastPage - 1) {
        buttons.push(<span key="ellipsis2">...</span>);
      }

      buttons.push(
        <button
          key={lastPage}
          className="pagination__button"
          onClick={() => setPage(lastPage)}
        >
          {lastPage}
        </button>
      );
    }

    if (currentPage < lastPage) {
      buttons.push(
        <button
          key="next"
          className="pagination__selector"
          onClick={() => setPage(currentPage + 1)}
        >
          {next.icon}
        </button>
      );
    }

    return buttons;
  };

  return <div className="pagination">{renderButtons()}</div>;
};
