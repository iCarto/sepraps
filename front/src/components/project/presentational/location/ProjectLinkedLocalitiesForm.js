import {FormProvider, useForm} from "react-hook-form";
import {createLocality, createProject} from "model";
import {DomainProvider, LocationProvider} from "components/common/provider";
import {FormLocationSelect} from "components/common/form";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProjectLinkedLocalitiesForm = ({project = null, onSubmit = null}) => {
    const formMethods = useForm({
        defaultValues: {
            linked_locality: {
                non_existent: false,
                code: "",
                name: "",
                district: "",
                district_name: "",
                department: "",
                department_name: "",
            },
        },
        reValidateMode: "onSubmit",
    });

    const handleFormSubmit = data => {
        const updatedProject = createProject({
            ...project,
            linked_localities: project
                ? [
                      ...project.linked_localities,
                      createLocality({
                          code:
                              data.linked_locality.code &&
                              data.linked_locality.code !== ""
                                  ? data.linked_locality.code
                                  : null,
                          name: data.linked_locality.name,
                          district: data.linked_locality.district,
                          district_name: data.linked_locality.district_name,
                          department: data.linked_locality.department,
                          department_name: data.linked_locality.department_name,
                      }),
                  ]
                : [],
        });
        onSubmit(updatedProject);
    };

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Grid container component="form">
                        <FormLocationSelect name="linked_locality" />
                    </Grid>
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <Grid>
                            {onSubmit && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ml: 3}}
                                    onClick={formMethods.handleSubmit(handleFormSubmit)}
                                >
                                    Guardar
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </FormProvider>
            </DomainProvider>
        </LocationProvider>
    );
};

export default ProjectLinkedLocalitiesForm;
