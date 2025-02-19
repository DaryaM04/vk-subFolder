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
            result[key] = filteredSubtree;
            hasMatch = true;
          }
        }  if (key.toLowerCase() === query.toLowerCase()) {
            if (currentPath) openFolders.add(currentPath);
            result[key] = obj[key];
            hasMatch = true;
        }
      }

      return { filteredSubtree: result, hasMatch };
    };
    const { filteredSubtree } = filterRecursive(data, "");
    return { filteredData: filteredSubtree, openFolders };
}