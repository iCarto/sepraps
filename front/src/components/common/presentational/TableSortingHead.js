import PropTypes from "prop-types";

import {visuallyHidden} from "@mui/utils";

import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

function TableSortingHead({
    order,
    attribute,
    onRequestSort,
    headCells,
    actionsHeadcell = null,
}) {
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <>
            <colgroup>
                {headCells.map((headCell, index) => (
                    <col key={index} width={headCell.width + "%"} />
                ))}
            </colgroup>
            <TableHead>
                <TableRow>
                    {headCells.slice(0, -1).map(headCell => (
                        <TableCell
                            key={headCell.id}
                            sortDirection={attribute === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                sx={{textTransform: "uppercase"}}
                                active={attribute === headCell.id}
                                direction={attribute === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {attribute === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                    {actionsHeadcell && <TableCell key="actions"></TableCell>}
                </TableRow>
            </TableHead>
        </>
    );
}

TableSortingHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    attribute: PropTypes.string.isRequired,
    headCells: PropTypes.array.isRequired,
};

export default TableSortingHead;
