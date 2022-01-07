import {useSort} from "hooks";

import {TableSortingHead} from "components/common/presentational";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// THIS TO BE REPLACED BY A USEEFFECT ONCE FINAL CONTACT DATA IS ADDED TO THE API
function createFakeData(name, role, gender, phone, email, notes) {
    return {
        name,
        role,
        gender,
        phone,
        email,
        notes,
    };
}

const rows = [
    createFakeData(
        "María Rodríguez Rodríguez",
        "Prestador",
        "M",
        "666 777 881",
        "contacto1@prueba.com",
        "Observaciones"
    ),
    createFakeData(
        "Ana Galindo Galindo",
        "Prestador",
        "N/A",
        "666 777 882",
        "contacto2@prueba.com",
        "Observaciones"
    ),
    createFakeData(
        "Pedro Pérez Pérez",
        "Contratista",
        "H",
        "666 777 883",
        "contacto3@prueba.com",
        "Observaciones"
    ),
];
// useEffect(() => {
//     setFilteredProjects([...projects].filter(searchFunction).sort(sortFunction));
// }, [attribute, order, searchText]);

const headCells = [
    {
        id: "name",
        label: "Nombre",
    },
    {
        id: "role",
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
        id: "notes",
        label: "Observaciones",
    },
];

const ContactsTable = ({searchFunction}) => {
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
                        {rows
                            .filter(searchFunction)
                            .sort(sortFunction)
                            .map((row, index) => {
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
                                        <TableCell>{row.role}</TableCell>
                                        <TableCell>{row.gender}</TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.notes}</TableCell>
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
