import { Link } from "react-router-dom";
import { admin, agent, moderator } from "../../svgs/svgs";
import { capitalize } from "../../../helpers/formatters";

export const userCustomColumns = [
  {
    name: "Name",
    selector: (row) => row.full_name.en,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phone.tel1,
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

export const userAdminColumns = [
  {
    name: "Name",
    selector: (row) => row.full_name.en,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phone.tel1,
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
    selector: (row) => row.status,
  },
  {
    name: "",
    key: "action",
    text: "Action",
    cell: (row) => {
      return (
        <Link to={`edit/${row.id}`} className="users__table-link">
          Edit
        </Link>
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
