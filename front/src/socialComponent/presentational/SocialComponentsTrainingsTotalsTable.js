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

const SocialComponentsTrainingsTotalsTable = ({
    trainingData,
    totalsOnly = false,
    small = false,
}) => {
    const headCells = !totalsOnly
        ? [
              {
                  id: "contract_number",
                  label: "Contrato",
                  width: 6,
              },
              {
                  id: "contractor_name",
                  label: "Contratista",
                  width: 8,
              },
              {
                  id: "social_component_monitoring_name",
                  label: "Servicio",
                  width: 10,
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
                  label: "Participantes",
                  width: 7,
              },
              {
                  id: "number_of_women",
                  label: "Mujeres",
                  width: 6,
              },
              {
                  id: "women_percentage",
                  label: "% mujeres",
                  width: 6,
              },
              {
                  id: "number_of_hours",
                  label: "Horas",
                  width: 6,
              },
              {
                  id: "number_of_digital_materials",
                  label: "Materiales digitales",
                  width: 6,
              },
              {
                  id: "number_of_printed_materials",
                  label: "Materiales impresos",
                  width: 6,
              },
          ]
        : [
              {
                  id: "number_of_participants",
                  label: "Participantes",
                  width: 7,
              },
              {
                  id: "number_of_women",
                  label: "Mujeres",
                  width: 6,
              },
              {
                  id: "women_percentage",
                  label: "% mujeres",
                  width: 6,
              },
              {
                  id: "number_of_hours",
                  label: "Horas",
                  width: 6,
              },
              {
                  id: "number_of_digital_materials",
                  label: "Materiales digitales",
                  width: 6,
              },
              {
                  id: "number_of_printed_materials",
                  label: "Materiales impresos",
                  width: 6,
              },
          ];

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table
                aria-labelledby="Data table"
                sx={{tableLayout: "fixed"}}
                size={small ? "small" : "medium"}
            >
                <colgroup>
                    {headCells.map((headCell, index) => (
                        <col key={index} width={headCell.width + "%"} />
                    ))}
                </colgroup>
                <TableHead>
                    <TableRow>
                        {headCells.map(headCell => {
                            return (
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
                            );
                        })}
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
