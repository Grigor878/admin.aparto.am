import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../../../../../components/loader/Loader';
import { Item } from './components/Item';
import ReactPaginate from 'react-paginate';
import { useNavigate, useLocation } from 'react-router-dom';
import { next, previous } from '../../../../../assets/svgs/svgs';
import './Styles.scss';

export const List = () => {
    const { propertyData, filteredData } = useSelector((state) => state.property);
    const propertiesPerPage = 15;
    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const initialPage = parseInt(query.get('page')) || 1; 
    
    const [pageNumber, setPageNumber] = useState(initialPage);

    const properties = filteredData === null ? propertyData : filteredData;

    const propertiesVisited = (pageNumber - 1) * propertiesPerPage;
    const displayProperties = properties?.slice(propertiesVisited, propertiesVisited + propertiesPerPage);

    const pageCount = Math?.ceil(properties?.length / propertiesPerPage);

    const changePage = ({ selected }) => {
        const newPage = selected + 1;
        setPageNumber(newPage);
        window.scrollTo(0, 0);
        navigate(`?page=${newPage}`);
    };

    return (
        <div className="propertyList">
            {!propertyData && !filteredData ? (
                <Loader />
            ) : (
                <>
                    <Item data={displayProperties} />
                    <ReactPaginate
                        previousLabel={previous.icon}
                        nextLabel={next.icon}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'pagination'}
                        previousLinkClassName={'pagination__button'}
                        nextLinkClassName={'pagination__button'}
                        disabledClassName={'pagination__linkDisabled'}
                        activeClassName={'pagination__buttonActive'}
                        forcePage={pageNumber - 1}
                    />
                </>
            )}
        </div>
    );
};
