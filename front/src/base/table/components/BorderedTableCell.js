import MuiTableCell from "@mui/material/TableCell";
import styled from "@mui/material/styles/styled";

const BorderedTableCell = styled(MuiTableCell)(({theme}) => ({
    border: "1px solid " + theme.palette["grey"]["500"],
    padding: 10,
}));

export default BorderedTableCell;
