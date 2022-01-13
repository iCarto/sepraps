import {useSort} from "hooks";

import {TableSortingHead} from "components/common/presentational";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

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
];

const ContactsTable = ({contacts}) => {
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "name",
        "asc"
    );

    const handleRequestSort = (event, property) => {
        const isAsc = attribute === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setAttribute(property);
    };

    return (
        <Box sx={{width: "100%"}}>
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
                                <TableRow
                                    hover
                                    key={index}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.post_name}</TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.comments}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ContactsTable;
