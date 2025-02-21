import React, { useState, useEffect } from "react";

import { data as initialData } from "../data.js";
import Root from "../Root/Root.jsx";
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";

import { filterData } from "../utilits.js";

import "./App.css";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newFile, setNewFile] = useState("");
  const [data, setData] = useState(initialData);

  const [filteredData, setFilteredData] = useState(data); 
  const [openFoldersState, setOpenFoldersState] = useState(new Set()); 


  const handleAddFile = () => {
    if (!newFile.trim()) return;

    setData((prevData) => ({
      ...prevData,
      [`${newFile}`]: true,
    }));
    setNewFile("");
  };

  const handleDeleteFile = (fullPath) => {
    setData((prevData) => {
      const updatedData = structuredClone(prevData);
      const pathParts = fullPath.split("/");


      let current = updatedData;
      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }

      delete current[pathParts[pathParts.length - 1]];

      return updatedData;
    });
  };

  useEffect(() => {
    const { filteredData, reversedOpenFolders } = filterData(data, searchQuery);
    setFilteredData(filteredData); 
    setOpenFoldersState(reversedOpenFolders); 
    console.log("openFolders", reversedOpenFolders);
  }, [searchQuery, data]); 

  const isSearchEmpty = Object.keys(data).length > 0;


  return (
    <div className="app">
      <div className="input__add">
        <Input
          placeholder="Введите название"
          type="search"
          value={newFile}
          onChange={(e) => setNewFile(e.target.value)}
        />

        <Button onClick={handleAddFile}>
          Создать
        </Button>
      </div>
      <search role="search" className="search">
        <Input
          placeholder="Поиск"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </search>
      {isSearchEmpty ? (
         <Root
          structure={searchQuery ? filteredData : data}
          onDelete={handleDeleteFile}
          openFoldersState={openFoldersState}
          setOpenFoldersState={setOpenFoldersState}
        />
      ) : <p>Ничего не найдено</p>}
       
    </div>
  );
}
