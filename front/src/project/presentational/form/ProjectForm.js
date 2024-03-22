import {FormProvider, useForm} from "react-hook-form";

import {LocationProvider} from "sepraps/location/provider";
import {DomainProvider} from "sepraps/domain/provider";
import {createInfrastructure, createLocality} from "location/model";
import {createProject} from "project/model";

import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";

const ProjectForm = ({
    project = null,
    contractId = null,
    onSubmit,
    onCancel = null,
    error = null,
    children,
}) => {
    const defaultFormValues = {
        id: project?.id || null,
        code: project?.code || null,
        project_works: project
            ? project.project_works?.map(project_work => {
                  return {
                      work_type: project_work.work_type,
                      work_class: project_work.work_class,
                  };
              })
            : [
                  {
                      work_type: "",
                      work_class: "",
                  },
              ],
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

    const handleFormSubmit = data => {
        const updatedProject = createProject({
            id: data.id,
            code: data.code,
            description: data.description,
            init_date: data.init_date,
            project_works: data.project_works,
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

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <AlertError error={error} />
                    <EntityForm
                        onSubmit={formMethods.handleSubmit(handleFormSubmit)}
                        onCancel={onCancel}
                    >
                        {children}
                    </EntityForm>
                </FormProvider>
            </DomainProvider>
        </LocationProvider>
    );
};

export default ProjectForm;
