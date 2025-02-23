import React from "react";

import "./ButtonClose.css";

export default function ButtonClose({
  type = "submit",
  children,
  onClick,
  value,
  style,
}) {
  return (
    <>
      <button className="button__close"
        type={type}
        onClick={onClick}
        value={value}
        style={style}
      >
        {children}
      </button>
    </>
  );
}
