import React from "react";

import "./Button.css";

export default function Button({
  type = "submit",
  children,
  onClick,
  value,
  style,
}) {
  return (
      <button className="button__add"
        type={type}
        onClick={onClick}
        value={value}
        style={style}
      >
        {children}
      </button>
  );
}
