import {useSort} from "base/table/hooks";

import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";
import {useContactsTable} from "contact/data";

import {TableSortingHead} from "base/table/components";
import {ActionsMenu} from "base/shared/components";
import {MenuAction} from "base/ui/menu";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import CheckIcon from "@mui/icons-material/Check";

const tableRowStyle = {
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    paddingRight: 1,
};

const ContactsTable = ({
    contacts = [],
    customTableColumns = null,
    handleActions = null,
    showEditAction = true,
    showRemoveAction = true,
    showDeleteAction = true,
}) => {
    const {ROLES} = useAuth();
    const {tableColumns} = useContactsTable();
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "name",
        "asc"
    );

    const columns = customTableColumns || tableColumns;
    const showIsStaffColumn = columns?.some(column => column.id === "is_staff");

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
            <Table aria-labelledby="Tabla de contactos">
                <TableSortingHead
                    order={order}
                    attribute={attribute}
                    onRequestSort={handleRequestSort}
                    headCells={[
                        ...columns,
                        {
                            id: "actions",
                            width: 5,
                        },
                    ]}
                    showActionsHeadCell={handleActions}
                />
                <TableBody>
                    {contacts.sort(sortFunction).map((contact, index) => {
                        return (
                            <TableRow hover key={index} sx={tableRowStyle}>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.post_label}</TableCell>
                                <TableCell>{contact.gender_name}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.comments}</TableCell>
                                {showIsStaffColumn ? (
                                    <TableCell>
                                        {contact.is_staff ? (
                                            <CheckIcon color="success" />
                                        ) : (
                                            ""
                                        )}
                                    </TableCell>
                                ) : null}
                                {handleActions ? (
                                    <TableCell sx={{paddingX: 0}}>
                                        <AuthAction
                                            roles={[
                                                ROLES.EDIT,
                                                ROLES.MANAGEMENT,
                                                ROLES.SUPERVISION,
                                            ]}
                                        >
                                            <ActionsMenu>
                                                {showEditAction && (
                                                    <MenuAction
                                                        name="edit-contact"
                                                        icon={<EditIcon />}
                                                        text="Modificar contacto"
                                                        itemId={contact.id}
                                                        handleClick={handleClick}
                                                    />
                                                )}
                                                {showRemoveAction && (
                                                    <MenuAction
                                                        name="remove-contact"
                                                        icon={<LinkOffIcon />}
                                                        text="Quitar contacto"
                                                        itemId={contact.id}
                                                        handleClick={handleClick}
                                                    />
                                                )}
                                                {showDeleteAction && (
                                                    <MenuAction
                                                        name="delete-contact"
                                                        icon={
                                                            <DeleteIcon color="error" />
                                                        }
                                                        text="Eliminar contacto"
                                                        itemId={contact.id}
                                                        handleClick={handleClick}
                                                    />
                                                )}
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
