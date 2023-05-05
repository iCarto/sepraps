import {FormProvider, useForm} from "react-hook-form";

import {LocationProvider} from "sepraps/location/provider";
import {DomainProvider} from "sepraps/domain/provider";
import {createInfrastructure, createLocality} from "location/model";
import {createProject} from "project/model";

import {EntityForm} from "base/entity/form";
import {
    ProjectCreationForm,
    ProjectModificationForm,
} from "project/presentational/form";

const ProjectForm = ({
    project = null,
    contractId = null,
    onSubmit,
    onCancel = null,
    updatedSection = null,
}) => {
    const defaultFormValues = {
        id: project?.id || null,
        code: project?.code || null,
        project_type: project?.project_type || "",
        project_class: project?.project_class || "",
        description: project?.description || "",
        init_date: project?.init_date || null,
        main_infrastructure_position: {
            latitude: project?.main_infrastructure?.latitude || "",
            longitude: project?.main_infrastructure?.longitude || "",
            altitude: project?.main_infrastructure?.altitude || "",
        },
        linked_localities: project
            ? project.linked_localities?.map(linked_locality => {
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
        construction_contract: project?.construction_contract || contractId || "",
        closed: project?.closed || false,
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
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
            construction_contract: data.construction_contract,
            closed: data.closed,
        });
        onSubmit(updatedProject);
    };

    const onFormCancel = () => {
        onCancel();
    };

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    {updatedSection ? (
                        <EntityForm onSubmit={formMethods.handleSubmit(onFormSubmit)}>
                            <ProjectModificationForm section={updatedSection} />
                        </EntityForm>
                    ) : (
                        <ProjectCreationForm
                            onSubmit={formMethods.handleSubmit(onFormSubmit)}
                            onCancel={onFormCancel}
                        />
                    )}
                </FormProvider>
            </DomainProvider>
        </LocationProvider>
    );
};

export default ProjectForm;
