import {TextUtil} from "base/format/utilities";
import {TRAINING_DATA_FILTER} from "./SocialComponentsTrainingsFilter";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

const rowStyle = {
    "&:last-child td, &:last-child th": {
        borderTop: "solid 1px #c0c4c2",
    },
};

const parseHeadCells = headCells => {
    return headCells.map(headCell => {
        if (Array.isArray(headCell)) {
            const parsedStrings = headCell.map(string =>
                TextUtil.convertDBTags(string)
            );
            return parsedStrings.join(", ");
        }
        return TextUtil.convertDBTags(headCell);
    });
};

const SocialComponentsTrainingsTable = ({trainingData, trainingDataType}) => {
    const headCells = trainingData.code;
    const parsedHeadCells = parseHeadCells(headCells);

    const tableRowLabels =
        trainingDataType === TRAINING_DATA_FILTER.DATA_TYPE.WOMEN_MEN.code
            ? ["Número de mujeres", "Número de varones"]
            : trainingDataType === TRAINING_DATA_FILTER.DATA_TYPE.WOMEN_PERCENTAGE.code
            ? ["% de mujeres"]
            : trainingDataType === TRAINING_DATA_FILTER.DATA_TYPE.HOURS.code
            ? ["Número de horas"]
            : [];

    const tableCells =
        trainingDataType === TRAINING_DATA_FILTER.DATA_TYPE.WOMEN_MEN.code
            ? [
                  trainingData.number_of_women.map(value => parseInt(value)),
                  trainingData.number_of_men.map(value => parseInt(value)),
              ]
            : trainingDataType === TRAINING_DATA_FILTER.DATA_TYPE.WOMEN_PERCENTAGE.code
            ? [trainingData.women_percentage.map(value => parseInt(value))]
            : trainingDataType === TRAINING_DATA_FILTER.DATA_TYPE.HOURS.code
            ? [trainingData.number_of_hours.map(value => parseInt(value))]
            : [];

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table aria-labelledby="Data table" sx={{tableLayout: "fixed"}}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {parsedHeadCells?.map((row, index) => {
                            return (
                                <TableCell key={index} align="center">
                                    {row}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableCells.map((row, index) => (
                        <TableRow key={index} hover sx={rowStyle}>
                            <TableCell>{tableRowLabels[index]}</TableCell>
                            {row.map((value, index) => (
                                <TableCell key={index} align="center">
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SocialComponentsTrainingsTable;
