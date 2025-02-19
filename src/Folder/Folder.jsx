import React, { useState, useEffect } from "react";
import FileStructure from "../FileStructure/FileStructure";

import "../Folder/Folder.css";
import ButtonFolder from "../ButtonFolder/ButtonFolder";

export default function Folder({ name, value, path, onClick, openFolders }) {
  console.log(name);
  console.log(openFolders)
  console.log(Array.from(openFolders).some(item => item.includes('dir1')))
  const [isOpen, setIsOpen] = useState(false);
  const [hasFile, setHasFile] = useState(Object.keys(value).length > 0);

  useEffect(() => {
    const isEmpty = Object.keys(value).length === 0;
    if (isEmpty) {
      setIsOpen(false);
    }
    setHasFile(!isEmpty);
    if (Array.from(openFolders).some(item => item.includes(name))) {
      console.log(5);
      setIsOpen(true);
    }
  }, [openFolders, name]);

  const handleFolderClick = () => {
    setIsOpen(!isOpen); 
    if (onClick) {
      onClick(path);
    }
  };

  return (
    <>
      <div className="folder" onClick={handleFolderClick}>
      {hasFile && (
        <ButtonFolder
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="folder__icon">{isOpen ? '−' : '+'}</div>
        </ButtonFolder>
      )}
        <div className="folder__name">{name}</div>
      </div>

      {isOpen && (
        <div className="folder__open_active">
          <FileStructure structure={value} path={path} onClick={onClick} />
        </div>
      )}
    </>
  );
}

