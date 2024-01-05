import {DateUtil} from "base/format/utilities";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";

const rowStyle = {
    "&:last-child td, &:last-child th": {
        borderTop: "solid 1px #c0c4c2",
        fontWeight: "bold",
        fontStyle: "italic",
        backgroundColor: "grey.50",
    },
};

const SocialComponentsTrainingsTotalsTable = ({trainingData}) => {
    const headCells = [
        {
            id: "contract_number",
            label: "Contrato",
            width: 8,
        },
        {
            id: "contractor_name",
            label: "Contratista",
            width: 8,
        },
        {
            id: "start_date",
            label: "Fecha de inicio",
            width: 8,
            formatFunction: value => {
                return DateUtil.formatDate(value);
            },
        },
        {
            id: "end_date",
            label: "Fecha de finalización",
            width: 8,
            formatFunction: value => {
                return DateUtil.formatDate(value);
            },
        },
        {
            id: "target_population_label",
            label: "Población meta",
            width: 15,
            formatFunction: value => {
                return value && value.join(", ");
            },
        },
        {
            id: "method_label",
            label: "Método",
            width: 8,
        },
        {
            id: "number_of_participants",
            label: "Nº de participantes",
            width: 7,
        },
        {
            id: "number_of_women",
            label: "Nº de mujeres",
            width: 7,
        },
        {
            id: "women_percentage",
            label: "Porcentaje de mujeres",
            width: 7,
        },
        {
            id: "number_of_hours",
            label: "Nº de horas",
            width: 7,
        },
        {
            id: "number_of_digital_materials",
            label: "Nº de materiales digitales",
            width: 7,
        },
        {
            id: "number_of_printed_materials",
            label: "Nº de materiales impresos",
            width: 7,
        },
    ];

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table aria-labelledby="Data table" sx={{tableLayout: "fixed"}}>
                <colgroup>
                    {headCells.map((headCell, index) => (
                        <col key={index} width={headCell.width + "%"} />
                    ))}
                </colgroup>
                <TableHead>
                    <TableRow>
                        {headCells.map(headCell => (
                            <Tooltip
                                key={headCell.id}
                                title={headCell.title || ""}
                                disableHoverListener={!headCell.title}
                            >
                                <TableCell
                                    key={headCell.id}
                                    sx={{paddingRight: 1, textAlign: "center"}}
                                >
                                    {headCell.label}
                                </TableCell>
                            </Tooltip>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trainingData?.id?.map((row, rowIndex) => (
                        <TableRow key={rowIndex} hover sx={rowStyle}>
                            {headCells.map((headCell, cellIndex) => (
                                <TableCell key={cellIndex} align="center">
                                    {headCell.formatFunction
                                        ? headCell.formatFunction(
                                              trainingData[headCell.id][rowIndex]
                                          )
                                        : trainingData[headCell.id][rowIndex]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SocialComponentsTrainingsTotalsTable;
