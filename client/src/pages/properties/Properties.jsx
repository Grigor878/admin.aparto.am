import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyData } from "../../store/slices/propertySlice";
import { useNavigate } from "react-router-dom";
import TopPart from "../../components/topPart/TopPart";
import { SearchBox } from "./components/searchBox/SearchBox";
import { List } from "./components/list/List";
import "./Properties.scss";

const Properties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { propertyData, pagination } = useSelector((state) => state.property);
  const { page } = useSelector((state) => state.users);

  const [properties, setProperties] = useState(null);

  useEffect(() => {
    !propertyData && dispatch(getPropertyData({ properties, page: page }));
  }, [dispatch, page, properties, propertyData]);

  useEffect(() => {
    navigate(`?page=${page}`);
  }, [navigate, page]);

  return (
    <article className="properties">
      <TopPart data={pagination} type="properties" />
      <SearchBox setProperties={setProperties} />
      <List />
    </article>
  );
};

export default Properties;
