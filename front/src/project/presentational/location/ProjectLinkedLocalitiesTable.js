import {MenuAction} from "base/ui/menu";
import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";

import {ActionsMenu} from "base/ui/menu";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const ProjectLinkedLocalitiesTable = ({localities, handleActions = null}) => {
    const {ROLES} = useAuth();

    const handleClick = (localityCode, buttonName) => {
        handleActions(localityCode, buttonName.split("-")[0]);
    };

    return (
        <TableContainer>
            <Table aria-label="localities table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{pl: 0, textTransform: "uppercase"}}>
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
                        <TableRow key={locality.code}>
                            <TableCell component="th" scope="row" sx={{pl: 0}}>
                                {locality.name}
                            </TableCell>
                            <TableCell>{locality.district_name}</TableCell>
                            <TableCell>{locality.department_name}</TableCell>
                            {handleActions ? (
                                <TableCell>
                                    <AuthAction
                                        roles={[
                                            ROLES.EDIT,
                                            ROLES.MANAGEMENT,
                                            ROLES.SUPERVISION,
                                        ]}
                                    >
                                        <ActionsMenu>
                                            <MenuAction
                                                key="remove-contact"
                                                icon={<LinkOffIcon />}
                                                text="Quitar localidad"
                                                element={locality.code}
                                                handleClick={handleClick}
                                            />
                                        </ActionsMenu>
                                    </AuthAction>
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
