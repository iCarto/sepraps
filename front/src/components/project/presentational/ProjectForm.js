import {useNavigate, useOutletContext} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";

import {DomainProvider, LocationProvider} from "components/common/provider";
import {
    createInfrastructure,
    createLocality,
    createProject,
    createProvider,
} from "model";

import {FormFinancingSelect} from "components/common/form";
import {
    ProjectCreationForm,
    ProjectFormGeneralDataFields,
    ProjectFormLocationFields,
} from "./form";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProjectForm = ({onSubmit, section = null}) => {
    const navigate = useNavigate();

    let project;
    const outletContext = useOutletContext();
    if (outletContext) {
        project = outletContext[0];
    }

    console.log({project});

    const defaultFormValues = {
        id: project?.id || null,
        code: project?.code || null,
        project_type: project?.project_type || "",
        project_class: project?.project_class || "",
        description: project?.description || "",
        init_date: project?.init_date || null,
        provider_id: project?.provider?.id || null,
        provider_name: project?.provider?.name || "",
        provider_area: project?.provider?.area || "",
        provider_location: {
            department: project?.provider?.locality.department || "",
            district: project?.provider?.locality.district || "",
            locality: project?.provider?.locality.code || "",
        },
        main_infrastructure_position: {
            latitude: project?.main_infrastructure.latitude || "",
            longitude: project?.main_infrastructure.longitude || "",
            altitude: project?.main_infrastructure.altitude || "",
        },
        linked_localities: project
            ? project.linked_localities.map(linked_locality => {
                  return {
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
                      code: "",
                      name: "",
                      district: "",
                      district_name: "",
                      department: "",
                      department_name: "",
                  },
              ],
        financing: {
            financing_fund: project?.financing_fund || "",
            financing_program: project?.financing_program || "",
        },
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
            provider: data.provider_name
                ? createProvider({
                      id: data.provider_id,
                      name: data.provider_name,
                      area: data.provider_area,
                      locality: createLocality({
                          code: data.provider_location.locality,
                          district: data.provider_location.district,
                          department: data.provider_location.department,
                      }),
                  })
                : null,
            main_infrastructure: createInfrastructure({
                latitude: data.main_infrastructure_position.latitude,
                longitude: data.main_infrastructure_position.longitude,
                altitude: data.main_infrastructure_position.altitude,
            }),
            linked_localities: data.linked_localities.map(linked_locality => {
                return createLocality({
                    code: linked_locality.code,
                    name: linked_locality.name,
                    district: linked_locality.district,
                    district_name: linked_locality.district_name,
                    department: linked_locality.department,
                    department_name: linked_locality.department_name,
                });
            }),
            financing_fund: data.financing.financing_fund,
            financing_program: data.financing.financing_program,
        });
        console.log({updatedProject});
        onSubmit(updatedProject);
    };

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Box component="form" width="100%">
                        {!section && (
                            <ProjectCreationForm
                                onCancel={handleCancel}
                                onSubmit={formMethods.handleSubmit(onFormSubmit)}
                            />
                        )}
                        {section === "generaldata" && (
                            <ProjectFormGeneralDataFields layout="column" />
                        )}
                        {section === "main_infrastructure" && (
                            <ProjectFormLocationFields isMapDisplayed={false} />
                        )}
                        {section === "financing" && (
                            <FormFinancingSelect name="financing" />
                        )}
                        {section && (
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
                        )}
                    </Box>
                </FormProvider>
            </DomainProvider>
        </LocationProvider>
    );
};

export default ProjectForm;
