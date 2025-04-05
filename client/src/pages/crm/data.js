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
        {row.deal?.map((el, index) => (
          <span key={el}>
            {el}
            {index < row.deal.length - 1 && ","}
          </span>
        ))}
      </Link>
    ),
  },
  {
    name: "Գույքի տիպ",
    cell: (row) => (
      <Link to={`edit/${row.id}`} className="columFontSize">
        {row.property_type?.map((el, index) => (
          <span key={el}>
            {el}
            {index < row.property_type.length - 1 && ","}
          </span>
        ))}
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
    sortable: true,
    selector: (row) => row.agent,
  },
  {
    name: "Կարգավիճակ",
    // cell: (row) => <p className="columFontSize">{row.status}</p>,
    cell: (row) => <CrmStatus status={row.status} />,
    sortable: true,
    selector: (row) => row.status,
  },
];
