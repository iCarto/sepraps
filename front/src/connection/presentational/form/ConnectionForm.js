import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";
import {NumberUtil} from "base/format/utilities";
import {DomainProvider} from "sepraps/domain/provider";

import {ConnectionFormDataFields} from ".";
import {FormContainer} from "base/form/components";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";

const ConnectionForm = ({
    projectId,
    connection = null,
    projectClass,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(connection?.id),
        number_of_households: FormUtil.getFormValue(connection?.number_of_households),
        population: connection?.population
            ? NumberUtil.formatInteger(connection.population)
            : "",
        number_of_existing_connections: connection?.number_of_existing_connections
            ? NumberUtil.formatInteger(connection.number_of_existing_connections)
            : "",
        number_of_planned_connections: connection?.number_of_planned_connections
            ? NumberUtil.formatInteger(connection.number_of_planned_connections)
            : "",
        number_of_actual_connections: connection?.number_of_actual_connections
            ? NumberUtil.formatInteger(connection.number_of_actual_connections)
            : "",
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            number_of_households: FormUtil.getDataValue(data.number_of_households),
            number_of_existing_connections: FormUtil.getDataValue(
                data.number_of_existing_connections
            ),
            number_of_planned_connections: FormUtil.getDataValue(
                data.number_of_planned_connections
            ),
            number_of_actual_connections: FormUtil.getDataValue(
                data.number_of_actual_connections
            ),
            project: projectId,
        });
    };

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <AlertError error={error} />
                <FormContainer>
                    <EntityForm
                        onSubmit={formMethods.handleSubmit(onFormSubmit)}
                        onCancel={onCancel}
                    >
                        <ConnectionFormDataFields projectClass={projectClass} />
                    </EntityForm>
                </FormContainer>
            </FormProvider>
        </DomainProvider>
    );
};

export default ConnectionForm;
