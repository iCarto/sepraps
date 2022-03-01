import {useFormContext} from "react-hook-form";
import {useAdministrativeDivisions} from "components/common/provider";
import {FormLocationSelect} from "components/common/form";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const ProjectFormLinkedLocalities = ({name, auxPropertyName}) => {
    const {getValues, reset} = useFormContext();
    const {departments, districts, localities} = useAdministrativeDivisions();

    const handleAdd = () => {
        const values = getValues();
        values[auxPropertyName].department_name = departments.find(
            department => department.value === values[auxPropertyName].department
        ).label;
        values[auxPropertyName].district_name = districts.find(
            district => district.value === values[auxPropertyName].district
        ).label;
        values[auxPropertyName].locality_name = localities.find(
            locality => locality.value === values[auxPropertyName].locality
        ).label;
        values[name] = [...values[name], values.linked_locality];
        reset({
            ...values,
        });
        console.log(getValues());
    };

    const handleRemove = locality => {
        const values = getValues();
        const listWithoutRemoved = values[name].filter(
            linked_locality => linked_locality.locality !== locality
        );
        values[name] = [...listWithoutRemoved];
        reset({
            ...values,
        });
        console.log(getValues());
    };

    return (
        <Paper sx={{mt: 3, p: 3}} elevation={3}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>Localidades vinculadas</Typography>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    spacing={2}
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={11}>
                        <FormLocationSelect
                            name={auxPropertyName}
                            orientation="horizontal"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            aria-label="add"
                            onClick={handleAdd}
                            color="primary"
                            size="large"
                        >
                            <AddCircleIcon fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Localidad</TableCell>
                                    <TableCell>Distrito</TableCell>
                                    <TableCell>Departamento</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {getValues()[name].map((row, index) => {
                                    return (
                                        <TableRow hover key={row.locality}>
                                            <TableCell>{row.locality}</TableCell>
                                            <TableCell>{row.locality_name}</TableCell>
                                            <TableCell>{row.district_name}</TableCell>
                                            <TableCell>{row.department_name}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => {
                                                        handleRemove(row.locality);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProjectFormLinkedLocalities;
