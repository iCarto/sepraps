import {FormProvider, useForm} from "react-hook-form";
import {DateUtil, DATE_FORMATS, NumberUtil} from "utilities";

import {ProjectFormStepper} from "./form";

import Box from "@mui/material/Box";

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
        const project = {
            name: data.name,
            init_date: DateUtil.formatDate(
                data.init_date,
                DATE_FORMATS.SERVER_DATEFORMAT
            ),
            project_type: data.project_type,
            project_class: data.project_class,
            provider: {
                id: data.provider_id,
                name: data.provider_name,
                area: data.provider_area,
                locality: data.provider_location.locality,
            },
            main_infrastructure: {
                locality: data.main_infrastructure_location.locality,
                latitude: NumberUtil.parseFloatOrNull(
                    data.main_infrastructure_latitude
                ),
                longitude: NumberUtil.parseFloatOrNull(
                    data.main_infrastructure_longitude
                ),
                altitude: NumberUtil.parseIntOrNull(data.main_infrastructure_altitude),
            },
            linked_localities: data.linked_localities.map(linked_locality => {
                return linked_locality.locality;
            }),
            contacts: data.contacts.map(contact => {
                return {
                    id: contact.id,
                    name: contact.name,
                    post: contact.post,
                    gender: contact.gender,
                    phone: contact.phone,
                    email: contact.email,
                    comments: contact.comments,
                };
            }),
            financing_fund: data.financing.financing_fund,
            financing_program: data.financing.financing_program,
        };
        console.log({project});
        handleFormSubmit(project);
    };

    return (
        <FormProvider {...formMethods}>
            <Box component="form">
                <ProjectFormStepper onSubmit={onSubmit} />
            </Box>
        </FormProvider>
    );
};

export default ProjectForm;
