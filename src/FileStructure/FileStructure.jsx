import React, { useState, useEffect } from "react";
import Folder from "../Folder/Folder";
import File from "../File/File";
import "../FileStructure/FileStructure.css";

export default function FileStructure({ structure, path = "", onDelete, openFolders = new Set() }) {
  console.log(openFolders); // приходит нужный 
  const [openFoldersState, setOpenFoldersState] = useState(() => new Set(openFolders));
  
  const sortedFileStructure = Object.entries(structure).sort(
    ([nameA, valueA], [nameB, valueB]) => {
      const isFolderA = typeof valueA === "object";
      const isFolderB = typeof valueB === "object";
      return isFolderA === isFolderB ? nameA.localeCompare(nameB) : isFolderA ? -1 : 1;
    }
  );

  const handleFolderToggle = (fullPathToItem) => {
    setOpenFoldersState((prev) => {
      const updatedFolders = new Set(prev);
      if (updatedFolders.has(fullPathToItem)) {
        updatedFolders.delete(fullPathToItem);  // Закрыть папку
      } else {
        updatedFolders.add(fullPathToItem);  // Открыть папку
      }
      console.log(updatedFolders);
      return updatedFolders;
    });
  };

  return (
    <div style={{ paddingLeft: path ? 20 : 0 }}>
      {sortedFileStructure.map(([name, value]) => {
        const fullPathToItem = path ? `${path}/${name}` : name;
        const isFolder = typeof value === "object";

        return isFolder ? (
          <Folder
            key={fullPathToItem}
            name={name}
            value={value}
            path={fullPathToItem}
            openFolders={openFolders}
            onClick = {() => {
              handleFolderToggle(fullPathToItem)
            }}
          />
        ) : (
          <File key={fullPathToItem} name={name} path={fullPathToItem} onDelete={onDelete} />
        );
      })}
    </div>
  );
}