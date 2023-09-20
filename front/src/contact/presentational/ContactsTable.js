import {cloneElement} from "react";
import {useSort} from "base/table/hooks";

import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";
import {useContactsTable} from "contact/data";

import {TableSortingHead} from "base/table/components";
import {MenuActions} from "base/ui/menu";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const ContactsTable = ({
    contacts = [],
    customTableColumns = null,
    selectedElement = null,
    onSelectElement = null,
    elementActions = [],
}) => {
    const {ROLES} = useAuth();
    const {tableColumns} = useContactsTable();
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "name",
        "asc"
    );

    const columns = customTableColumns || tableColumns;
    const tableRowStyle = {
        cursor: onSelectElement ? "pointer" : "auto",
    };

    const handleRequestSort = (event, property) => {
        const isAsc = attribute === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setAttribute(property);
    };

    const handleSelectElement = (event, element) => {
        const cellIndex = event.target.cellIndex;
        if (
            cellIndex !== undefined &&
            cellIndex !== columns.length &&
            onSelectElement
        ) {
            onSelectElement(element.id);
        }
    };

    const headCells = elementActions.length
        ? [
              ...columns,
              {
                  id: "actions",
                  width: 7,
              },
          ]
        : columns;

    return (
        <>
            <TableContainer sx={{width: "100%"}}>
                <Table aria-labelledby="Tabla de contactos" sx={{tableLayout: "fixed"}}>
                    <TableSortingHead
                        order={order}
                        attribute={attribute}
                        onRequestSort={handleRequestSort}
                        headCells={headCells}
                        showActions={elementActions?.length}
                    />
                    <TableBody>
                        {contacts.sort(sortFunction).map((element, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={index}
                                    sx={tableRowStyle}
                                    selected={selectedElement === element.id}
                                    onClick={event =>
                                        handleSelectElement(event, element)
                                    }
                                >
                                    {columns.map((cellAttribute, index) => {
                                        return (
                                            <TableCell key={cellAttribute.id}>
                                                {cellAttribute.formatFunction
                                                    ? cellAttribute.formatFunction(
                                                          element
                                                      )
                                                    : element[cellAttribute.id]}
                                            </TableCell>
                                        );
                                    })}
                                    {elementActions?.length ? (
                                        <TableCell>
                                            <AuthAction
                                                roles={[
                                                    ROLES.EDIT,
                                                    ROLES.MANAGEMENT,
                                                    ROLES.SUPERVISION,
                                                ]}
                                            >
                                                <MenuActions>
                                                    {elementActions.map(actionMenu =>
                                                        cloneElement(actionMenu, {
                                                            element,
                                                        })
                                                    )}
                                                </MenuActions>
                                            </AuthAction>
                                        </TableCell>
                                    ) : null}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ContactsTable;
