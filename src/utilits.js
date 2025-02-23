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
      }

      // Если находим совпадение
      if (key.toLowerCase() === query.toLowerCase()) {
        // Добавляем все родительские пути в openFolders
        let tempPath = currentPath;
        while (tempPath) {
          openFolders.add(tempPath); // Добавляем родительские папки
          const lastSlashIndex = tempPath.lastIndexOf('/');
          tempPath = lastSlashIndex === -1 ? '' : tempPath.substring(0, lastSlashIndex); // Отрезаем последний сегмент пути
        }
        result[key] = obj[key];
        hasMatch = true;
      }
    }

    return { filteredSubtree: result, hasMatch };
  };

  const { filteredSubtree } = filterRecursive(data, "");
  const reversedOpenFolders = new Set([...openFolders].reverse());
  return { filteredData: filteredSubtree, reversedOpenFolders };
}