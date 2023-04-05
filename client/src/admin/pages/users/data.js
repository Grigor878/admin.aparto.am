import { Link } from "react-router-dom";
import { admin, agent, moderator } from "../../svgs/svgs";

export const userTableData = [
  {
    id: 1,
    name: "Vagharshak Aharonyan",
    email: "vagharshak@aparto.am",
    phone: "098 111 111",
    role: <p className="users__table-role">{agent.icon} Agent</p>,
    edit: <Link to="edit" className="users__table-link">Edit</Link>,
  },
  {
    id: 2,
    name: "Vagharshak Aharonyan",
    email: "vagharshak@aparto.am",
    phone: "098 111 111",
    role: <p className="users__table-role">{agent.icon} Agent</p>,
    edit: <Link to="edit" className="users__table-link">Edit</Link>,
  },
  {
    id: 3,
    name: "Vagharshak Aharonyan",
    email: "vagharshak@aparto.am",
    phone: "098 111 111",
    role: <p className="users__table-role">{moderator.icon} Moderator</p>,
    edit: <Link to="edit" className="users__table-link">Edit</Link>,
  },
  {
    id: 4,
    name: "Vagharshak Aharonyan",
    email: "vagharshak@aparto.am",
    phone: "098 111 111",
    role: <p className="users__table-role">{moderator.icon} Moderator</p>,
    edit: <Link to="edit" className="users__table-link">Edit</Link>,
  },
  {
    id: 5,
    name: "Vagharshak Aharonyan",
    email: "vagharshak@aparto.am",
    phone: "098 111 111",
    role: <p className="users__table-role">{admin.icon} Admin</p>,
    edit: <Link to="edit" className="users__table-link">Edit</Link>,
  },
];

export const userTableColumns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phone,
    // sortable: true,
  },
  {
    name: "Role",
    selector: (row) => row.role,
    // sortable: true,
  },
  {
    name: "",
    selector: (row) => row.edit,
    // sortable: true,
  },
];
