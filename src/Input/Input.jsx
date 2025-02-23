import React from "react";

import "../Input/Input.css"

export default function Input ({ type="text", value, onChange, placeholder, className }){
    return (
        <input 
            className={`input ${className}`}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
};

