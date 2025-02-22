import React from "react";

import "./ButtonFolder.css";

export default function ButtonFolder({
  type = "submit",
  children,
  onClick,
  value,
  style,
}) {
  return (
    <div>
      <button className="button__folder"
        type={type}
        onClick={onClick}
        value={value}
        style={style}
      >
        {children}
      </button>
    </div>
  );
}
