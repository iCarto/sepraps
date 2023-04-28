import {useAuth} from "base/user/provider";
import {useSort} from "base/table/hooks";
import {TableSortingHead} from "base/table/components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const pageSize = parseInt(process.env.REACT_APP_PAGE_SIZE);

const StatsTable = ({tableColumns = [], elements = []}) => {
    const {ROLES} = useAuth();

    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "nombre",
        "asc"
    );

    const tableRowStyle = {
        "&:last-child td, &:last-child th": {
            border: 0,
        },
        paddingRight: "12px",
        cursor: "pointer",
    };

    const handleRequestSort = (event, property) => {
        const isAsc = attribute === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setAttribute(property);
    };

    return (
        <TableContainer sx={{width: "100%"}}>
            <Table aria-labelledby="Tabla" size="small">
                <TableSortingHead
                    order={order}
                    attribute={attribute}
                    onRequestSort={handleRequestSort}
                    headCells={[
                        ...tableColumns,
                        {
                            id: "actions",
                            width: 5,
                        },
                    ]}
                />
                <TableBody>
                    {elements.sort(sortFunction).map((element, index) => {
                        return (
                            <TableRow hover key={index} sx={tableRowStyle}>
                                {tableColumns
                                    .sort(sortFunction)
                                    .map((cellAttribute, index) => {
                                        return (
                                            <TableCell key={cellAttribute.id}>
                                                {cellAttribute.formatFunction
                                                    ? cellAttribute.formatFunction(
                                                          element[cellAttribute.id]
                                                      )
                                                    : element[cellAttribute.id]}
                                            </TableCell>
                                        );
                                    })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StatsTable;
