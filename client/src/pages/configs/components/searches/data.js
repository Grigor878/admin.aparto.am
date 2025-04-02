export const searchTypes = [
  {
    id: 1,
    value: "With Result",
  },
  {
    id: 2,
    value: "No Result",
  },
];

export const searchColumns = [
  {
    name: "Որոնում",
    cell: (row) => <p className="columFontSize">{row.searchText}</p>,
  },
  {
    name: "Արդյունք",
    sortable: true,
    selector: (row) => row.resultCount,
    cell: (row) => <p className="columFontSize">{row.resultCount}</p>,
    width: "250px",
  },
  {
    name: "Ամսաթիվ",
    sortable: true,
    selector: (row) => row.date,
    cell: (row) => <p className="columFontSize">{row.date}</p>,
    width: "170px",
  },
];
