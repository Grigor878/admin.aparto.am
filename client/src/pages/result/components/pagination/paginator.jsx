import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ReactPaginate from "react-paginate";
import styles from "./paginator.module.scss";

export const Paginator = ({
  data,
  itemsPerPage,
  onPageChange,
  page,
  setParams,
}) => {
  const mobile = useMediaQuery({ maxWidth: 768 });

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (!page) {
      setParams({ page: 1 });
    } else {
      const pageNumber = parseInt(page, 10) || 1;
      const newOffset = (pageNumber - 1) * itemsPerPage;
      setItemOffset(newOffset);
    }
  }, [page, itemsPerPage, setParams]);

  useEffect(() => {
    const pageCount = Math.ceil(data?.length / itemsPerPage);
    if (page > pageCount) {
      setParams({ page: pageCount });
    }
    onPageChange(itemOffset, itemsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, page, itemsPerPage, itemOffset]);

  const pageCount = Math.ceil(data?.length / itemsPerPage);

  const arrowPrev = !mobile ? "Նախորդը" : "<";
  const arrowNext = !mobile ? "Հաջորդը" : ">";

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setParams({ page: newPage });
    window.scrollTo(0, 0);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      previousLabel={page > 1 ? arrowPrev : null}
      nextLabel={page < pageCount ? arrowNext : null}
      renderOnZeroPageCount={null}
      containerClassName={styles.pagination}
      activeClassName={styles.paginationActive}
      forcePage={page - 1}
    />
  );
};
