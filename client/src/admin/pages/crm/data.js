import { Link } from "react-router-dom";
import { CrmStatus } from "./components/statuses/CrmStatus";

export const crmUsersColumns = [
  {
    name: "Անուն",
    cell: (row) => (
      <Link to={`edit/${row.id}`} className="columFontSize">
        {row.name}
      </Link>
    ),
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: "Հեռախոս",
    cell: (row) => (
      <Link to={`edit/${row.id}`} className="columFontSize">
        {row.phone}
      </Link>
    ),
  },
  {
    name: "Գործարք",
    cell: (row) => (
      <Link to={`edit/${row.id}`} className="columFontSize">
        {row.deal?.map((el) => el)}
      </Link>
    ),
  },
  {
    name: "Գույքի տիպ",
    cell: (row) => (
      <Link to={`edit/${row.id}`} className="columFontSize">
        {row.property_type?.map((el) => el)}
      </Link>
    ),
  },
  {
    name: "Սենյակ",
    cell: (row) => (
      <Link to={`edit/${row.id}`} className="columFontSize">
        {row.room}
      </Link>
    ),
  },
  {
    name: "Մասնագետ",
    cell: (row) => (
      <Link to={`edit/${row.id}`} className="columFontSize">
        {row.agent}
      </Link>
    ),
  },
  {
    name: "Կարգավիճակ",
    // cell: (row) => <p className="columFontSize">{row.status}</p>,
    cell: (row) => <CrmStatus status={row.status} />,
  },
];
