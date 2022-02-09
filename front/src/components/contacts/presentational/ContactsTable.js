import {useSort} from "hooks";

import {TableAction, TableSortingHead} from "components/common/presentational";
import {ActionsMenu} from "components/common/presentational";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";

const headCells = [
    {
        id: "name",
        label: "Nombre",
    },
    {
        id: "post",
        label: "Puesto",
    },
    {
        id: "gender",
        label: "Género",
    },
    {
        id: "phone",
        label: "Celular",
    },
    {
        id: "email",
        label: "E-mail",
    },
    {
        id: "comments",
        label: "Observaciones",
    },
    {
        id: "actions",
    },
];

const ContactsTable = ({contacts, handleAction = null}) => {
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "name",
        "asc"
    );

    const tableRowStyle = {
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    };

    const handleRequestSort = (event, property) => {
        const isAsc = attribute === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setAttribute(property);
    };

    const handleClick = (rowId, buttonName) => {
        handleAction(rowId, buttonName.split("-")[0]);
    };

    return (
        <TableContainer>
            <Table sx={{minWidth: 750}} aria-labelledby="tableTitle">
                <TableSortingHead
                    order={order}
                    attribute={attribute}
                    onRequestSort={handleRequestSort}
                    headCells={headCells}
                />
                <TableBody>
                    {contacts.sort(sortFunction).map((row, index) => {
                        return (
                            <TableRow hover key={index} sx={tableRowStyle}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.post_name}</TableCell>
                                <TableCell>{row.gender}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.comments}</TableCell>
                                <TableCell>
                                    {handleAction ? (
                                        <ActionsMenu>
                                            <TableAction
                                                name="edit-contact"
                                                icon={<EditIcon />}
                                                text="Editar contacto"
                                                rowId={row.id}
                                                handleClick={handleClick}
                                            />
                                            <TableAction
                                                name="remove-contact"
                                                icon={<DeleteIcon />}
                                                text="Quitar contacto"
                                                rowId={row.id}
                                                handleClick={handleClick}
                                            />
                                            <TableAction
                                                name="delete-contact"
                                                icon={<ClearIcon />}
                                                text="Eliminar contacto"
                                                rowId={row.id}
                                                handleClick={handleClick}
                                            />
                                        </ActionsMenu>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ContactsTable;
