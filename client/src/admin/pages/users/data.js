import { Link } from "react-router-dom";
import { admin, agent, moderator } from "../../svgs/svgs";
import { capitalize } from "../../../helpers/formatters";

export const userAdminColumns = [
  {
    name: "Name",
    cell: (row) => <p className="columFontSize">{row.full_name.en}</p>,
    sortable: true,
    selector: (row) => row.full_name.en,
  },
  {
    name: "Email",
    cell: (row) => <p className="columFontSize">{row.email}</p>,
    sortable: true,
    selector: (row) => row.email,
  },
  {
    name: "Phone Number",
    cell: (row) => <p className="columFontSize">{row.phone?.tel1}</p>,
  },
  {
    name: "Role",
    cell: (row) => {
      return (
        <p className="users__table-role">
          {row.role === "admin"
            ? admin.icon
            : row.role === "agent"
            ? agent.icon
            : moderator.icon}
          {capitalize(row.role)}
        </p>
      );
    },
  },
  {
    name: "Status",
    cell: (row) => <p className="columFontSize">{row.status}</p>,
  },
  {
    name: "",
    key: "action",
    text: "Action",
    cell: (row) => {
      return (
        <Link to={`edit/${row.id}`} className="users__table-link columnDelete">
          Edit
        </Link>
      );
    },
  },
];

export const userCustomColumns = [
  {
    name: "Name",
    cell: (row) => <p className="columFontSize">{row.full_name.en}</p>,
    sortable: true,
    selector: (row) => row.email,
  },
  {
    name: "Email",
    cell: (row) => <p className="columFontSize">{row.email}</p>,
    sortable: true,
    selector: (row) => row.email,
  },
  {
    name: "Phone Number",
    cell: (row) => <p className="columFontSize">{row.phone?.tel1}</p>,
  },
  {
    name: "Role",
    cell: (row) => {
      return (
        <p className="users__table-role">
          {row.role === "admin"
            ? admin.icon
            : row.role === "agent"
            ? agent.icon
            : moderator.icon}
          {capitalize(row.role)}
        </p>
      );
    },
  },
];

export const addUserInputs = [
  {
    id: "user_name_am",
    type: "text",
    placeholder: "Enter user name",
    name: "Name",
  },
  {
    id: "user_name_ru",
    type: "text",
    placeholder: "Enter user name",
    name: "Name RUS",
  },
  {
    id: "user_name_en",
    type: "text",
    placeholder: "Enter user name",
    name: "Name ENG",
  },
  {
    id: "user_mail",
    type: "email",
    placeholder: "Enter user email",
    name: "Email",
  },
];
