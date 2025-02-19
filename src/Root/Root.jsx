import React, { useState } from "react";
import classNames from "classnames";
import FileStructure from "../FileStructure/FileStructure";
import ButtonFolder from "../ButtonFolder/ButtonFolder";
import "../Root/Root.css";

export default function Root({ structure, searchQuery, onDelete, openFolders }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="root">
        <ButtonFolder
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="folder__icon">{isOpen ? "-" : "+"}</div>
        </ButtonFolder>
        <div className="root__name">{"root"}</div>
      </div>

      {isOpen && (
        <div className="folder__open_active">
          <FileStructure
            structure={structure}
            searchQuery={searchQuery}
            onDelete={onDelete}
            openFolders={openFolders}
          />
        </div>
      )}
    </>
  );
}
