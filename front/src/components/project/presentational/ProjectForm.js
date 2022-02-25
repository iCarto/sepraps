import {FormProvider, useForm} from "react-hook-form";

import {DomainProvider, LocationProvider} from "components/common/provider";
import {ProjectFormStepper} from "./form";

import Box from "@mui/material/Box";
import {
    createInfrastructure,
    createLocality,
    createProject,
    createProvider,
} from "model";

const ProjectForm = ({handleFormSubmit}) => {
    const formMethods = useForm({
        defaultValues: {
            name: "",
            project_type: "",
            project_class: "",
            init_date: null,
            provider_id: null,
            provider_name: "",
            provider_area: "",
            provider_location: {
                department: "",
                district: "",
                locality: "",
            },
            main_infrastructure_location: {
                department: "",
                district: "",
                locality: "",
            },
            main_infrastructure_latitude: "",
            main_infrastructure_longitude: "",
            main_infrastructure_altitude: "",
            linked_locality: {
                department: "",
                district: "",
                locality: "",
            },
            linked_localities: [],
            financing: {
                financing_fund: "",
                financing_program: "",
            },
            contacts: [],
            // Aux contact fields necessary to insert
            // contacts in the list
            contact_id: null,
            contact_name: "",
            contact_post: "",
            contact_gender: "",
            contact_phone: "",
            contact_email: "",
            contact_comments: "",
        },
        reValidateMode: "onSubmit",
    });

    const onSubmit = data => {
        console.log({data});
        const project = createProject({
            name: data.name,
            init_date: data.init_date,
            project_type: data.project_type,
            project_class: data.project_class,
            provider: createProvider({
                id: data.provider_id,
                name: data.provider_name,
                area: data.provider_area,
                locality: createLocality({
                    code: data.provider_location.locality,
                    district: data.provider_location.locality,
                    department: data.provider_location.department,
                }),
            }),
            main_infrastructure: createInfrastructure({
                locality: createLocality({
                    code: data.main_infrastructure_location.locality,
                    district: data.main_infrastructure_location.locality,
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
        console.log({project});
        handleFormSubmit(project);
    };

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Box component="form">
                        <ProjectFormStepper onSubmit={onSubmit} />
                    </Box>
                </FormProvider>
            </DomainProvider>
        </LocationProvider>
    );
};

export default ProjectForm;
