import {useFieldArray, useFormContext} from "react-hook-form";
import {FormLocationSelect} from "base/form/components";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const ProjectFormLinkedLocalitiesList = ({name: propsName}) => {
    const {control, getValues} = useFormContext();
    const {fields, append, remove} = useFieldArray({
        control,
        name: propsName,
    });

    const moreThanOneField = fields.length > 1;

    const handleClickAppend = () => {
        const values = getValues();
        append(
            values[propsName][0]
                ? {
                      code: "",
                      name: "",
                      district: values[propsName][0].district,
                      district_name: values[propsName][0].district_name,
                      department: values[propsName][0].department,
                      department_name: values[propsName][0].department_name,
                  }
                : {
                      code: "",
                      name: "",
                      district: "",
                      district_name: "",
                      department: "",
                      department_name: "",
                  }
        );
    };

    return (
        <Grid container spacing={2}>
            {fields.map((field, index) => (
                <Grid item container alignItems="center" xs={12} key={field.id}>
                    <Grid item xs={moreThanOneField ? 11 : 12}>
                        <FormLocationSelect
                            name={`${propsName}.${index}`}
                            orientation="horizontal"
                            required
                        />
                    </Grid>
                    {moreThanOneField && (
                        <Grid item container justifyContent="center" xs={1}>
                            <IconButton
                                aria-label="delete"
                                onClick={() => remove(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    )}
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleClickAppend}
                >
                    Añadir otra localidad
                </Button>
            </Grid>
        </Grid>
    );
};

export default ProjectFormLinkedLocalitiesList;
