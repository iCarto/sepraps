import {useOutletContext} from "react-router-dom";

import {ProjectSectionTitle} from "../subPageElements";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ProjectSectionLinkedLocalities = () => {
    const project = useOutletContext();

    return (
        <>
            <ProjectSectionTitle>Localidades vinculadas</ProjectSectionTitle>
            <TableContainer sx={{mt: 1}}>
                <Table aria-label="localities table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{textTransform: "uppercase"}}>
                                Localidad
                            </TableCell>
                            <TableCell sx={{textTransform: "uppercase"}}>
                                Distrito
                            </TableCell>
                            <TableCell sx={{textTransform: "uppercase"}}>
                                Departamento
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {project[0].linked_localities.map(locality => (
                            <TableRow
                                key={locality.locality_name}
                                sx={{"&:last-child td, &:last-child th": {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {locality.locality_name}
                                </TableCell>
                                <TableCell>{locality.district_name}</TableCell>
                                <TableCell>{locality.department_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ProjectSectionLinkedLocalities;
