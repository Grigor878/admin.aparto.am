import React, { useState } from "react";
import { BtnAdd } from "../../../../components/buttons/BtnAdd";
import { AddModal } from "../modal/AddModal";

export const CardTest = ({ title, name, data }) => {
  const [active, setActive] = useState(true);

  active
    ? (document.body.style.overflow = "auto")
    : (document.body.style.overflow = "hidden");

  return (
    <div className="structure__center-card">
      <h4>{title}</h4>
      <ul>
        <li>
          <span>Անվանում</span>
        </li>
        {data.map((el) => {
          return (
            <li key={el}>
              <p>{el}</p>
            </li>
          );
        })}
      </ul>
      <div className="structure__center-card-btn">
        <BtnAdd onClick={() => setActive(false)} />
      </div>
      <AddModal
        name={name}
        title={title}
        active={active}
        setActive={setActive}
      />
    </div>
  );
};
