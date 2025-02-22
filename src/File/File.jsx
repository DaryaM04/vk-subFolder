import React from "react";

import ButtonClose from "../ButtonClose/ButtonClose";
import "./File.css";

export default function File({ name, path, onDelete }) {

  return (
    <div className="file">
      <div className="file__name">{name}</div>
      <ButtonClose onClick={() => onDelete(path)} className = "button__close">
        ×
      </ButtonClose>
    </div>
  );
}
