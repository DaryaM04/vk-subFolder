export function filterData(data, query, openFolders = new Set()) {
    if (!query) return { filteredData: data, openFolders: new Set() };
  
    const filterRecursive = (obj, currentPath) => {
      let result = {};
      let hasMatch = false;
  
      for (const key in obj) {
        const newPath = currentPath ? `${currentPath}/${key}` : key;
        if (typeof obj[key] === "object") {
          const { filteredSubtree, hasMatch: childHasMatch } = filterRecursive(obj[key], newPath);
          if (childHasMatch) {
            if (currentPath) openFolders.add(currentPath);
            console.log(openFolders)
            result[key] = filteredSubtree;
            hasMatch = true;
          }
        }  if (key.toLowerCase().includes(query.toLowerCase())) {
            console.log(currentPath)
            if (currentPath) openFolders.add(currentPath);
            console.log(openFolders)
            result[key] = obj[key];
            hasMatch = true;
        }
      }

      return { filteredSubtree: result, hasMatch };
    };
    const { filteredSubtree } = filterRecursive(data, "");
    const sortedOpenFolders = new Set([...openFolders].sort((a, b) => a.localeCompare(b)));
    return { filteredData: filteredSubtree, sortedOpenFolders };
}