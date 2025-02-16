import React from "react";

import "../Input/Input.css"

export default function InputSearch ({ type = "text", value, onChange, placeholder }){
    return (
            <form className="Input">
                <input className="Input__text"
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </form>
    )
};

