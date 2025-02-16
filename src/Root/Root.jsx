import React, { useState } from "react";
import FileStructure from"../FileStructure/FileStructure"
import "../Root/Root.css";

export default function Root({ structure, searchQuery, onDelete, openFolders }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="root">
      <div className="root__header">
        <div
          className={`root__toggle ${isOpen ? "root_toggle-active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <div className="toggle-open">-</div>
          ) : (
            <div className="toggle-close">+</div>
          )}
        </div>
        <div className="root__name">{"root"}</div>
      </div>

      {isOpen && (
        <div className="folder__open-active">
          <FileStructure
            structure={structure}
            searchQuery={searchQuery}
            onDelete={onDelete}
            openFolders={openFolders} 
          />
        </div>
      )}
    </div>
  );
}
