import {useFieldArray, useFormContext} from "react-hook-form";
import {AddNewFullWidthButton} from "base/shared/components";
import {FormSelect} from "base/form/components";
import {useDomain} from "sepraps/domain/provider";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import AddIcon from "@mui/icons-material/Add";
import {SectionBox} from "base/ui/section/components";

const ProjectFormProjectWorks = ({name: propsName, itemName}) => {
    const {control} = useFormContext();
    const {fields, append, remove} = useFieldArray({
        control,
        name: propsName,
    });

    const {projectTypes, projectClasses} = useDomain();

    const moreThanOneField = fields.length > 1;

    const handleClickAppend = () => {
        append({
            work_type: "",
            work_class: "",
        });
    };

    return (
        <SectionBox label="Trabajos">
            <Grid container spacing={1} mt={1}>
                {fields.map((field, index) => (
                    <Grid item container alignItems="center" xs={12} key={field.id}>
                        <Grid
                            container
                            item
                            xs={moreThanOneField ? 11 : 12}
                            spacing={2}
                        >
                            <Grid item xs={6}>
                                <FormSelect
                                    name={`${propsName}.${index}.work_type`}
                                    label="Tipo de trabajo"
                                    rules={{required: "El campo es obligatorio"}}
                                    options={projectTypes}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormSelect
                                    name={`${propsName}.${index}.work_class`}
                                    label="Clase de trabajo"
                                    rules={{required: "El campo es obligatorio"}}
                                    options={projectClasses}
                                />
                            </Grid>
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
                        Añadir otro trabajo
                    </Button>
                </Grid>
            </Grid>
        </SectionBox>
    );
};

export default ProjectFormProjectWorks;
