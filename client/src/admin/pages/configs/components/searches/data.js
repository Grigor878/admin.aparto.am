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

export const searches = [
  {
    searchText: "opera baxramyan kaskad araratin nayi kofe dni",
    resultCount: 5,
    date: "May 17 2023",
  },
  {
    searchText: "opera baxramyan kaskad araratin nayi kofe dni achqs",
    resultCount: 0,
    date: "Aug 28 2023",
  },
  {
    searchText: "opera baxramyan kaskad araratin nayi kofe dni achqs shoyi",
    resultCount: 18,
    date: "Apr 17 2023",
  },
];

export const searchColumns = [
  {
    name: "Որոնում",
    sortable: true,
    selector: (row) => row.searchText,
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
