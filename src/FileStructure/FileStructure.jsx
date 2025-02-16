import React, { useState, useEffect } from "react";
import Folder from "../Folder/Folder";
import File from "../File/File";
import "../FileStructure/FileStructure.css";

export default function FileStructure({ structure, path = "", onDelete }) {
  const [openFoldersState, setOpenFoldersState] = useState(new Set());
  console.log(openFoldersState);


  const sortedFileStructure = Object.entries(structure).sort(
    ([nameA, valueA], [nameB, valueB]) => {
      const isFolderA = typeof valueA === "object";
      const isFolderB = typeof valueB === "object";
      return isFolderA === isFolderB ? nameA.localeCompare(nameB) : isFolderA ? -1 : 1;
    }
  );

  return (
    <div style={{ paddingLeft: path ? 20 : 0 }}>
      {sortedFileStructure.map(([name, value]) => {
        const fullPathToItem = path ? `${path}/${name}` : name;
        const isFolder = typeof value === "object";
        const isOpen = openFoldersState.has(fullPathToItem);

        return isFolder ? (
          <Folder
            key={fullPathToItem}
            name={name}
            value={value}
            path={fullPathToItem}
            isOpen={isOpen}
            onClick = {() => {
              setOpenFoldersState((prev) => {
                console.log("New openFoldersState:", updatedFolders);
                const updatedFolders = new Set(prev);
                if (updatedFolders.has(fullPathToItem)) {
                  updatedFolders.delete(fullPathToItem);
                } else {
                  updatedFolders.add(fullPathToItem);
                }
                console.log("New openFoldersState:", updatedFolders);
                return updatedFolders;
              });
            }}
            onDelete={onDelete}
          />
        ) : (
          <File key={fullPathToItem} name={name} path={fullPathToItem} onDelete={onDelete} />
        );
      })}
    </div>
  );
}