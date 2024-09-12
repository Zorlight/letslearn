const getFilterAllTableData = <T>(
  filterInput: string,
  columnTitles: object,
  getFilteredData: (filterInput: string, col: string) => T[]
) => {
  let filteredAllTableData: Set<T> = new Set();
  const columnKeys = Object.keys(columnTitles);

  // for each column title, find the data that matches the filter input
  columnKeys.forEach((col) => {
    const filteredData = getFilteredData(filterInput, col);
    filteredData.forEach((question: any) => filteredAllTableData.add(question));
  });

  //convert set to array
  const filteredData = Array.from(filteredAllTableData);
  return filteredData;
};

export { getFilterAllTableData };
