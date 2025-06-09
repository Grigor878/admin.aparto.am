import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { BtnAdd } from "../buttons/BtnAdd";
import "./TopPart.scss";

const TopPart = ({ data, type }) => {
  const { userGlobal } = useSelector((state) => state?.userGlobal);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  let newPath = pathname.split("/")[2];

  return (
    <div className="topPart">
      <h3>
        {newPath === "users" ? data?.length + " Օգտատեր" : null}
        {/* {newPath === "properties" && data?.length !== undefined ? data?.length + " Գույք" : null} */}
        {newPath === "properties" && data?.total !== undefined
          ? data?.total + " Գույք"
          : null}
      </h3>

      {(userGlobal?.role === "admin" && type === "users") ||
      type === "properties" ? (
        <BtnAdd onClick={() => navigate("add")} />
      ) : null}
    </div>
  );
};

export default TopPart;
