import React, { useState, useEffect } from "react";
import FileStructure from "../FileStructure/FileStructure";

import "../Folder/Folder.css";
import ButtonFolder from "../ButtonFolder/ButtonFolder";

export default function Folder({ name, value, path, onClick, openFoldersState, setOpenFoldersState }) {
  console.log(path);
  console.log("openFoldersState", openFoldersState); // обновленный openFoldersState от filterData 
  const [isOpen, setIsOpen] = useState(false);
  const [hasFile, setHasFile] = useState(Object.keys(value).length > 0);

  useEffect(() => {
    const isEmpty = Object.keys(value).length === 0;
    if (isEmpty) {
      setIsOpen(false);
    }
    setHasFile(!isEmpty);
    console.log( typeof openFoldersState);

    // Проверка на открытие/закрытие папки в зависимости от состояния openFoldersState
    if (openFoldersState && openFoldersState instanceof Set && openFoldersState.has(path)) {
      setIsOpen(true);
  } else {
      setIsOpen(false);
  }
  }, [openFoldersState, path, value]);

  const handleFolderToggle = (path) => {
    setOpenFoldersState((prev) => {
      const updatedFolders = new Set(prev);
      if (updatedFolders.has(path)) {
        updatedFolders.delete(path); 
      } else {
        updatedFolders.add(path); 
      }
      console.log("updatedFolders", updatedFolders)
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
          <FileStructure structure={value} path={path} onClick={onClick} setOpenFoldersState={setOpenFoldersState} openFoldersState={openFoldersState}/>
        </div>
      )}
    </>
  );
}

