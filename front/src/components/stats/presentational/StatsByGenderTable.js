import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";

const StatsByGenderTable = ({data}) => {
    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table aria-labelledby="Data table" sx={{tableLayout: "fixed"}}>
                <TableHead>
                    <TableRow>
                        {data.map((row, index) => {
                            return (
                                <TableCell key={index} align="center">
                                    {row.gender_name}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow hover>
                        {data.map((row, index) => {
                            return (
                                <TableCell key={index} align="center">
                                    {row.total}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StatsByGenderTable;
