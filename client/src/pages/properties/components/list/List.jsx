import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../../components/loader/Loader";
import { Item } from "./components/Item";
import ReactPaginate from "react-paginate";
import { next, previous } from "../../../../assets/svgs/svgs";
import { setPage } from "../../../../store/slices/usersSlice";
import {
  setPagination,
  setPropertyData,
} from "../../../../store/slices/propertySlice";
import "./Styles.scss";

export const List = () => {
  const { propertyData, pagination } = useSelector((state) => state.property);

  const currentPage = pagination?.current_page || 1;
  const pageCount = pagination?.last_page || 0;

  const dispatch = useDispatch();

  const changePage = ({ selected }) => {
    const newPage = selected + 1;

    dispatch(setPage(newPage));
    dispatch(setPropertyData(null));
    dispatch(setPagination({}));
  };

  return (
    <div className="propertyList">
      {!propertyData ? (
        <Loader />
      ) : (
        <>
          <Item data={propertyData} />
          <ReactPaginate
            previousLabel={previous.icon}
            nextLabel={next.icon}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__button"}
            nextLinkClassName={"pagination__button"}
            disabledClassName={"pagination__linkDisabled"}
            activeClassName={"pagination__buttonActive"}
            forcePage={currentPage - 1}
          />
        </>
      )}
    </div>
  );
};
