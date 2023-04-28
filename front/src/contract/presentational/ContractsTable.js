import {useSort} from "base/table/hooks";

import {DateUtil, NumberUtil} from "base/format/utilities";
import {TableSortingHead} from "base/table/components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const headCells = [
    {
        id: "number",
        label: "Número",
        width: 8,
    },
    {
        id: "financing_program.short_name",
        label: "Programa",
        width: 12,
    },
    {
        id: "expected_execution_period",
        label: "Plazo previsto",
        width: 10,
    },
    {
        id: "awarding_date",
        label: "Fecha adj.",
        width: 10,
    },
    {
        id: "awarding_budget",
        label: "Monto adjudicado",
        width: 12,
    },
    {
        id: "contractor.name",
        label: "Contratista",
        width: 18,
    },
    {
        id: "comments",
        label: "Descripción",
    },
    {
        id: "actions",
        label: "Acciones",
        width: 0,
    },
];

const ContractsTable = ({
    contracts,
    selectedElement = null,
    onSelectElement = null,
}) => {
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "code",
        "asc"
    );

    const tableRowStyle = {
        paddingRight: "12px",
    };

    const handleRequestSort = (event, property) => {
        const isAsc = attribute === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setAttribute(property);
    };

    const handleClick = contract => {
        onSelectElement && onSelectElement(contract);
    };

    const noPointer = {cursor: "default"};

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table aria-labelledby="Contracts table" sx={{tableLayout: "fixed"}}>
                <TableSortingHead
                    order={order}
                    attribute={attribute}
                    onRequestSort={handleRequestSort}
                    headCells={headCells}
                />
                <TableBody>
                    {contracts.sort(sortFunction).map(contract => {
                        return (
                            <TableRow
                                hover
                                key={contract.id}
                                sx={tableRowStyle}
                                onClick={() => handleClick(contract)}
                                selected={selectedElement?.id === contract.id}
                                style={noPointer}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{width: "100%"}}
                                >
                                    {contract.number}
                                </TableCell>
                                <TableCell>
                                    {contract.financing_program?.short_name}
                                </TableCell>
                                <TableCell>
                                    {contract.expected_execution_period &&
                                        `${contract.expected_execution_period_in_months} meses`}
                                </TableCell>
                                <TableCell>
                                    {DateUtil.formatDate(contract.awarding_date)}
                                </TableCell>
                                <TableCell>
                                    {NumberUtil.formatCurrency(
                                        contract.awarding_budget
                                    )}
                                </TableCell>
                                <TableCell>{contract.contractor?.name}</TableCell>
                                <TableCell>{contract.comments}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ContractsTable;
