import React, { useState, useEffect } from "react";

import FileStructure from "../FileStructure/FileStructure";
import ButtonFolder from "../ButtonFolder/ButtonFolder";
import "./Folder.css";

export default function Folder({ 
  name, 
  value, 
  path, 
  onClick, 
  onDelete, 
  openFoldersState, 
  setOpenFoldersState 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFile, setHasFile] = useState(Object.keys(value).length > 0);

  useEffect(() => {
    const isEmpty = Object.keys(value).length === 0;
    if (isEmpty) {
      setIsOpen(false);
    }
    setHasFile(!isEmpty);
    
    // Проверка на открытие/закрытие папки в зависимости от состояния openFoldersState
    (openFoldersState && openFoldersState instanceof Set && openFoldersState.has(path)) ? setIsOpen(true) :  setIsOpen(false);
  }, [openFoldersState, path, value]);

  const handleFolderToggle = (path) => {
    
    setOpenFoldersState((prev) => {
      const updatedFolders = new Set(prev);
      updatedFolders.has(path) ? updatedFolders.delete(path) : updatedFolders.add(path);

      return updatedFolders;
    });
  };

  return (
    <>
      <div className="folder">
      {hasFile && (
        <ButtonFolder
          onClick = {() => {
            handleFolderToggle(path);
            setIsOpen((prev) => !prev);
          }}
        >
          <div className="folder__icon">{isOpen ? '−' : '+'}</div>
        </ButtonFolder>
      )}
        <div className="folder__name">{name}</div>
      </div>

      {isOpen && (
        <div className="folder__content">
          <FileStructure 
            structure={value} 
            path={path} 
            onClick={onClick} 
            onDelete={onDelete} 
            setOpenFoldersState={setOpenFoldersState} 
            openFoldersState={openFoldersState} 
          />
        </div>
      )}
    </>
  );
}

