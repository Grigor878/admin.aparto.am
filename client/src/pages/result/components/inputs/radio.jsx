import React from "react"
import "./styles.scss"

export const Radio = ({ id, checked, onChange, text }) => {
    return (
        <label className="radio">
            <input type="radio" id={id} checked={checked} onChange={onChange} />
            <p>{text}</p>
        </label>
    );
};
