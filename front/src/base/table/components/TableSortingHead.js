import {visuallyHidden} from "@mui/utils";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";

function TableSortingHead({
    order,
    attribute,
    onRequestSort,
    headCells,
    showActions = false,
}) {
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    const displayedCells = showActions ? headCells.slice(0, -1) : headCells;

    return (
        <>
            <colgroup>
                {headCells.map((headCell, index) => (
                    <col key={index} width={headCell.width + "%"} />
                ))}
            </colgroup>
            <TableHead>
                <TableRow>
                    {displayedCells.map(headCell => (
                        <Tooltip
                            key={headCell.id}
                            title={headCell.title || ""}
                            disableHoverListener={!headCell.title}
                        >
                            <TableCell
                                key={headCell.id}
                                sortDirection={
                                    attribute === headCell.id ? order : false
                                }
                                sx={{paddingRight: 1}}
                            >
                                <TableSortLabel
                                    sx={{textTransform: "uppercase"}}
                                    active={attribute === headCell.id}
                                    direction={
                                        attribute === headCell.id ? order : "asc"
                                    }
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
                        </Tooltip>
                    ))}
                    {showActions && <TableCell></TableCell>}
                </TableRow>
            </TableHead>
        </>
    );
}

export default TableSortingHead;
