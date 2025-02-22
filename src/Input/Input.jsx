import React from "react";

import "../Input/Input.css"

export default function Input ({ type = "text", value, onChange, placeholder }){
    return (
            <form role="search">
                <input 
                    className="input"
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </form>
    )
};

