import {useNavigate, useOutletContext} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";

import {DomainProvider, LocationProvider} from "components/common/provider";
import {createInfrastructure, createLocality, createProject} from "model";

import {
    ProjectCreationForm,
    ProjectFormGeneralDataFields,
    ProjectFormLocationFields,
} from "./form";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProjectForm = ({onSubmit, updatedSection = null}) => {
    const navigate = useNavigate();

    let project;
    const outletContext = useOutletContext();
    if (outletContext) {
        project = outletContext[0];
    }

    const defaultFormValues = {
        id: project?.id || null,
        code: project?.code || null,
        project_type: project?.project_type || "",
        project_class: project?.project_class || "",
        description: project?.description || "",
        init_date: project?.init_date || null,
        main_infrastructure_position: {
            latitude: project?.main_infrastructure.latitude || "",
            longitude: project?.main_infrastructure.longitude || "",
            altitude: project?.main_infrastructure.altitude || "",
        },
        linked_localities: project
            ? project.linked_localities.map(linked_locality => {
                  return {
                      non_existent: false,
                      code: linked_locality.code,
                      name: linked_locality.name,
                      district: linked_locality.district,
                      district_name: linked_locality.district_name,
                      department: linked_locality.department,
                      department_name: linked_locality.department_name,
                  };
              })
            : [
                  {
                      non_existent: false,
                      code: "",
                      name: "",
                      district: "",
                      district_name: "",
                      department: "",
                      department_name: "",
                  },
              ],
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const handleCancel = () => {
        navigate("/projects");
    };

    const onFormSubmit = data => {
        console.log("submit", {data});
        const updatedProject = createProject({
            id: data.id,
            code: data.code,
            description: data.description,
            init_date: data.init_date,
            project_type: data.project_type,
            project_class: data.project_class,
            provider: project?.provider || null,
            main_infrastructure: createInfrastructure({
                latitude: data.main_infrastructure_position.latitude,
                longitude: data.main_infrastructure_position.longitude,
                altitude: data.main_infrastructure_position.altitude,
            }),
            linked_localities: data.linked_localities.map(linked_locality => {
                return createLocality({
                    code:
                        linked_locality.code && linked_locality.code !== ""
                            ? linked_locality.code
                            : null,
                    name: linked_locality.name,
                    district: linked_locality.district,
                    district_name: linked_locality.district_name,
                    department: linked_locality.department,
                    department_name: linked_locality.department_name,
                });
            }),
            construction_contract: project?.construction_contract,
        });
        onSubmit(updatedProject);
    };

    const getFormBySection = section => {
        if (section === "generaldata") {
            return <ProjectFormGeneralDataFields layout="column" />;
        }
        if (section === "main_infrastructure") {
            return <ProjectFormLocationFields isMapDisplayed={false} />;
        }
        return null;
    };

    console.log({updatedSection});

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Box component="form" width="100%">
                        {updatedSection ? (
                            <>
                                {getFormBySection(updatedSection)}
                                <Grid container justifyContent="center" sx={{mt: 2}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ml: 2}}
                                        onClick={formMethods.handleSubmit(onFormSubmit)}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <ProjectCreationForm
                                onCancel={handleCancel}
                                onSubmit={formMethods.handleSubmit(onFormSubmit)}
                            />
                        )}
                    </Box>
                </FormProvider>
            </DomainProvider>
        </LocationProvider>
    );
};

export default ProjectForm;
