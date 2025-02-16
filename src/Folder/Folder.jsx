import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import FileStructure from "../FileStructure/FileStructure";

import "../Folder/Folder.css";

export default function Folder({ name, value, path, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFile, setHasFile] = useState(Object.keys(value).length > 0);

  useEffect(() => {
    const isEmpty = Object.keys(value).length === 0;
    if (isEmpty) {
      setIsOpen(false);
    }
    setHasFile(!isEmpty);
  }, [value]);

  return (
    <>
      <div className="folder_header">
        <div
          onClick={() => hasFile && setIsOpen(!isOpen)}
          className={`folder__toggle {!hasFile ? "folder__toggle-disabled" : ""}`}
        >
          {isOpen ? (
            <div className="toggle-open">-</div>
          ) : hasFile ? (
            <div className="toggle-close">+</div>
          ) : (
            ""
          )}
        </div>
        <div className="folder__name">{name}</div>
      </div>

      {isOpen && (
        <div className="folder__open-active">
          <FileStructure structure={value} path={path} onDelete={onDelete} />
        </div>
      )}
    </>
  );
}

