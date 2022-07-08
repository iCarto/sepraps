import {useSort} from "hooks";
import {AuthAction, useAuth} from "auth";

import {MenuAction, TableSortingHead} from "components/common/presentational";
import {ActionsMenu} from "components/common/presentational";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import CheckIcon from "@mui/icons-material/Check";

const headCells = [
    {
        id: "name",
        label: "Nombre",
        width: 15,
    },
    {
        id: "post",
        label: "Cargo",
        width: 15,
    },
    {
        id: "gender",
        label: "Género",
        width: 5,
    },
    {
        id: "phone",
        label: "Celular",
        width: 10,
    },
    {
        id: "email",
        label: "E-mail",
        width: 10,
    },
    {
        id: "comments",
        label: "Observaciones",
        width: 25,
    },
    {
        id: "is_staff",
        label: "Interno",
        width: 5,
    },
    {
        id: "actions",
        width: 5,
    },
];

const ContactsTable = ({contacts = [], handleActions = null}) => {
    const {ROLES} = useAuth();

    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "name",
        "asc"
    );

    const tableRowStyle = {
        "&:last-child td, &:last-child th": {
            border: 0,
        },
        paddingRight: "12px",
    };

    const handleRequestSort = (event, property) => {
        const isAsc = attribute === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setAttribute(property);
    };

    const handleClick = (rowId, buttonName) => {
        handleActions(rowId, buttonName.split("-")[0]);
    };

    return (
        <TableContainer sx={{width: "100%"}}>
            <Table aria-labelledby="Contacts table">
                <TableSortingHead
                    order={order}
                    attribute={attribute}
                    onRequestSort={handleRequestSort}
                    headCells={headCells}
                    actionsHeadcell={handleActions}
                />
                <TableBody>
                    {contacts.sort(sortFunction).map((contact, index) => {
                        return (
                            <TableRow hover key={index} sx={tableRowStyle}>
                                <TableCell component="th" scope="row">
                                    {contact.name}
                                </TableCell>
                                <TableCell>{contact.post_name}</TableCell>
                                <TableCell>{contact.gender_name}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.comments}</TableCell>
                                <TableCell>
                                    {contact.is_staff ? (
                                        <CheckIcon color="success" />
                                    ) : (
                                        ""
                                    )}
                                </TableCell>
                                {handleActions ? (
                                    <TableCell>
                                        <AuthAction
                                            roles={[
                                                ROLES.EDIT,
                                                ROLES.MANAGEMENT,
                                                ROLES.SUPERVISION,
                                            ]}
                                        >
                                            <ActionsMenu>
                                                <MenuAction
                                                    name="edit-contact"
                                                    icon={<EditIcon />}
                                                    text="Modificar contacto"
                                                    itemId={contact.id}
                                                    handleClick={handleClick}
                                                />
                                                <MenuAction
                                                    name="remove-contact"
                                                    icon={<LinkOffIcon />}
                                                    text="Quitar contacto"
                                                    itemId={contact.id}
                                                    handleClick={handleClick}
                                                />
                                                <MenuAction
                                                    name="delete-contact"
                                                    icon={<DeleteIcon color="error" />}
                                                    text="Eliminar contacto"
                                                    itemId={contact.id}
                                                    handleClick={handleClick}
                                                />
                                            </ActionsMenu>
                                        </AuthAction>
                                    </TableCell>
                                ) : null}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ContactsTable;
