import {useFieldArray, useFormContext, useWatch} from "react-hook-form";
import {AddNewFullWidthButton} from "base/shared/components";
import {FormCheckbox, FormSelect} from "base/form/components";
import {useDomain} from "sepraps/domain/provider";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import AddIcon from "@mui/icons-material/Add";
import {SectionBox} from "base/ui/section/components";

const ProjectFormProjectWorks = ({name: propsName, showCreateComponents = false}) => {
    const {control, reset, getValues} = useFormContext();
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
            create_components: false,
        });
    };

    const onChangeWorkClass = (value, index) => {
        console.log({value}, {index});
        // TODO (egago): Remove this constant dependency
        if (value === "nueva_construccion") {
            const values = getValues();
            console.log({values});
            values[propsName][index].create_components = true;
            reset({
                ...values,
            });
        }
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
                            alignItems="center"
                        >
                            <Grid item xs={showCreateComponents ? 4 : 6}>
                                <FormSelect
                                    name={`${propsName}.${index}.work_type`}
                                    label="Tipo de trabajo"
                                    rules={{required: "El campo es obligatorio"}}
                                    options={projectTypes}
                                />
                            </Grid>
                            <Grid item xs={showCreateComponents ? 4 : 6}>
                                <FormSelect
                                    name={`${propsName}.${index}.work_class`}
                                    label="Clase de trabajo"
                                    rules={{required: "El campo es obligatorio"}}
                                    options={projectClasses}
                                    onChangeHandler={value =>
                                        onChangeWorkClass(value, index)
                                    }
                                />
                            </Grid>
                            {showCreateComponents && (
                                <Grid item xs={4}>
                                    <FormCheckbox
                                        name={`${propsName}.${index}.create_components`}
                                        label="Crear componentes"
                                    />
                                </Grid>
                            )}
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
