export const crmUsersColumns = [
  {
    name: "Անուն",
    cell: (row) => <p className="columFontSize">{row.name}</p>,
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: "Հեռախոս",
    cell: (row) => <p className="columFontSize">{row.phone}</p>,
  },
  {
    name: "Գործարք",
    cell: (row) => <p className="columFontSize">{row.deal?.map((el) => el)}</p>,
  },
  {
    name: "Գույքի տիպ",
    cell: (row) => (
      <p className="columFontSize">{row.property_type?.map((el) => el)}</p>
    ),
  },
  {
    name: "Սենյակ",
    cell: (row) => <p className="columFontSize">{row.room}</p>,
  },
  {
    name: "Մասնագետ",
    cell: (row) => <p className="columFontSize">{row.agent}</p>,
  },
  {
    name: "Կարգավիճակ",
    cell: (row) => <p className="columFontSize">{row.status}</p>,
  },
];
