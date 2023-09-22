import {MenuAction} from "base/ui/menu";
import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";

import {MenuActions} from "base/ui/menu";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import {cloneElement} from "react";

const ProjectLinkedLocalitiesTable = ({localities, elementActions = null}) => {
    const {ROLES} = useAuth();

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
                        {elementActions?.length && (
                            <TableCell sx={{width: "62px"}}></TableCell>
                        )}
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
                            {elementActions?.length ? (
                                <TableCell>
                                    <AuthAction
                                        roles={[
                                            ROLES.EDIT,
                                            ROLES.MANAGEMENT,
                                            ROLES.SUPERVISION,
                                        ]}
                                    >
                                        <MenuActions>
                                            {elementActions.map(actionMenu =>
                                                cloneElement(actionMenu, {
                                                    element: locality,
                                                })
                                            )}
                                        </MenuActions>
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
