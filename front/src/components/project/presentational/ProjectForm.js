import {useOutletContext} from "react-router-dom";
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
    ProjectFormGeneralDataFields,
    ProjectFormLocationFields,
    ProjectFormStepper,
} from "./form";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProjectForm = ({onSubmit, section = null}) => {
    let project;
    const outletContext = useOutletContext();
    if (outletContext) {
        project = outletContext[0];
    }

    console.log({project});

    const defaultFormValues = {
        id: project?.id || null,
        name: project?.name || "",
        code: project?.code || null,
        project_type: project?.project_type || "",
        project_class: project?.project_class || "",
        init_date: project?.init_date || null,
        provider_id: project?.provider?.id || null,
        provider_name: project?.provider?.name || "",
        provider_area: project?.provider?.area || "",
        provider_location: {
            department: project?.provider?.locality.department || "",
            district: project?.provider?.locality.district || "",
            locality: project?.provider?.locality.code || "",
        },
        main_infrastructure_location: {
            department: project?.main_infrastructure.locality.department || "",
            district: project?.main_infrastructure.locality.district || "",
            locality: project?.main_infrastructure.locality.code || "",
        },
        main_infrastructure_latitude: project?.main_infrastructure.latitude || "",
        main_infrastructure_longitude: project?.main_infrastructure.longitude || "",
        main_infrastructure_altitude: project?.main_infrastructure.altitude || "",
        linked_locality: {
            locality: "",
            district: "",
            department: "",
        },
        linked_localities: project
            ? project.linked_localities.map(linked_locality => {
                  return {
                      locality: linked_locality.code,
                      district: linked_locality.district,
                      department: linked_locality.department,
                  };
              })
            : [],
        financing: {
            financing_fund: project?.financing_fund || "",
            financing_program: project?.financing_program || "",
        },
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        console.log("submit", {data});
        const updatedProject = createProject({
            id: data.id,
            name: data.name,
            code: data.code,
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
                locality: createLocality({
                    code: data.main_infrastructure_location.locality,
                    district: data.main_infrastructure_location.district,
                    department: data.main_infrastructure_location.department,
                }),
                latitude: data.main_infrastructure_latitude,
                longitude: data.main_infrastructure_longitude,
                altitude: data.main_infrastructure_altitude,
            }),
            linked_localities: data.linked_localities.map(linked_locality => {
                return createLocality({
                    code: linked_locality.locality,
                    district: linked_locality.district,
                    department: linked_locality.department,
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
                        {!section && <ProjectFormStepper onSubmit={onFormSubmit} />}
                        {section === "generaldata" && <ProjectFormGeneralDataFields />}
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
