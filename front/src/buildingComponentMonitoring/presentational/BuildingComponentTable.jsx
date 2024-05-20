import {TableSortingHead} from "base/table/components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useBuildingComponentsTable} from "buildingComponentMonitoring/data";

const BuildingComponentTable = ({buildingComponents = []}) => {
    const {tableColumns} = useBuildingComponentsTable();
    console.log({buildingComponents});

    return (
        <>
            <TableContainer sx={{width: "100%"}}>
                <Table aria-labelledby="Tabla de contactos" sx={{tableLayout: "fixed"}}>
                    <TableSortingHead
                        headCells={tableColumns}
                        showActions={false}
                        order="real_end_date"
                        attribute="asc"
                    />
                    <TableBody>
                        {buildingComponents.map((element, index) => {
                            return (
                                <TableRow hover key={index}>
                                    {tableColumns.map((cellAttribute, index) => {
                                        return (
                                            <TableCell key={cellAttribute.id}>
                                                {cellAttribute.formatFunction
                                                    ? cellAttribute.formatFunction(
                                                          element
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
        </>
    );
};

export default BuildingComponentTable;
