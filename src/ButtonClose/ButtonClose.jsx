import React from "react";

import "../ButtonClose/ButtonClose.css";

export default function ButtonClose({
  type = "submit",
  children,
  onClick,
  value,
  style,
}) {
  return (
    <div>
      <button className="Button__close"
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
