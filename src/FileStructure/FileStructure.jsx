import React, { useState } from "react";

import Folder from "../Folder/Folder";
import File from "../File/File";
import "./FileStructure.css";

export default function FileStructure( { 
  structure, 
  path = "", 
  onDelete, 
  setOpenFoldersState, 
  openFoldersState 
}) {
  const [newPath, setNewPath] = useState(path);
  
  const sortedFileStructure = Object.entries(structure).sort(
    ([nameA, valueA], [nameB, valueB]) => {
      const isFolderA = typeof valueA === "object";
      const isFolderB = typeof valueB === "object";

      return isFolderA === isFolderB ? nameA.localeCompare(nameB) : isFolderA ? -1 : 1;
    }
  );

  return (
    <div style={{ paddingLeft: newPath ? 20 : 0 }}>
      {sortedFileStructure.map(([name, value]) => {
        const fullPathToItem = newPath 
        ? `${newPath}/${name}` 
        : name;
        const isFolder = typeof value === "object";

        return isFolder ? (
          <Folder
            key={fullPathToItem}
            name={name}
            value={value}
            path={fullPathToItem}
            onDelete={onDelete}
            openFoldersState={openFoldersState} 
            setOpenFoldersState={setOpenFoldersState} 
          />
        ) : (
          <File 
            key={fullPathToItem} 
            name={name} 
            path={fullPathToItem} 
            onDelete={onDelete} 
          />
        );
      })}
    </div>
  );
}