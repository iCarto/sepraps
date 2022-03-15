import {ActionsMenu, MenuAction} from "components/common/presentational";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import {useOutletContext} from "react-router-dom";

const ProjectLinkedLocalitiesTable = ({handleActions = null}) => {
    let project;
    [project] = useOutletContext();
    const localities = project?.linked_localities;

    const handleClick = (localityCode, buttonName) => {
        handleActions(localityCode, buttonName.split("-")[0]);
    };

    const tableRowStyle = {
        "&:last-child td, &:last-child th": {
            border: 0,
        },
        paddingRight: "12px",
    };

    return (
        <TableContainer>
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
                        {handleActions && <TableCell sx={{width: "62px"}}></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {localities?.map(locality => (
                        <TableRow key={locality.code} sx={tableRowStyle}>
                            <TableCell component="th" scope="row">
                                {locality.locality_name}
                            </TableCell>
                            <TableCell>{locality.district_name}</TableCell>
                            <TableCell>{locality.department_name}</TableCell>
                            {handleActions ? (
                                <TableCell>
                                    <ActionsMenu>
                                        <MenuAction
                                            name="edit-contact"
                                            icon={<EditIcon />}
                                            text="Editar localidad"
                                            itemId={locality.code}
                                            handleClick={handleClick}
                                        />
                                        <MenuAction
                                            name="remove-contact"
                                            icon={<LinkOffIcon />}
                                            text="Quitar localidad"
                                            itemId={locality.code}
                                            handleClick={handleClick}
                                        />
                                    </ActionsMenu>
                                </TableCell>
                            ) : null}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProjectLinkedLocalitiesTable;
