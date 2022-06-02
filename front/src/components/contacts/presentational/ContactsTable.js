import {useSort} from "hooks";

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

const ContactsTable = ({contacts = [], handleActions = null}) => {
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
                                {handleActions ? (
                                    <TableCell>
                                        <ActionsMenu>
                                            <MenuAction
                                                name="edit-contact"
                                                icon={<EditIcon />}
                                                text="Editar contacto"
                                                itemId={row.id}
                                                handleClick={handleClick}
                                            />
                                            <MenuAction
                                                name="remove-contact"
                                                icon={<LinkOffIcon />}
                                                text="Quitar contacto"
                                                itemId={row.id}
                                                handleClick={handleClick}
                                            />
                                            <MenuAction
                                                name="delete-contact"
                                                icon={<DeleteIcon color="error" />}
                                                text="Eliminar contacto"
                                                itemId={row.id}
                                                handleClick={handleClick}
                                            />
                                        </ActionsMenu>
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
