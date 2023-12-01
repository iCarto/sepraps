import {FormProvider, useForm} from "react-hook-form";
import {TrainingFormDataFields} from ".";

import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";
import {DomainProvider} from "sepraps/domain/provider";

const TrainingForm = ({
    socialComponentId,
    training = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(training?.id),
        start_date: FormUtil.getFormValue(training?.start_date),
        end_date: FormUtil.getFormValue(training?.end_date),
        target_population: FormUtil.getFormValue(training?.target_population, []),
        method: FormUtil.getFormValue(training?.method),
        number_of_women: FormUtil.getFormValue(training?.number_of_women),
        number_of_men: FormUtil.getFormValue(training?.number_of_men),
        number_of_hours: FormUtil.getFormValue(training?.number_of_hours),
        number_of_digital_materials: FormUtil.getFormValue(
            training?.number_of_digital_materials
        ),
        number_of_printed_materials: FormUtil.getFormValue(
            training?.number_of_printed_materials
        ),
        social_component_monitoring: FormUtil.getFormValue(
            training?.social_component_monitoring
        ),
        contract: FormUtil.getFormValue(training?.contract?.id),
        contractor: FormUtil.getFormValue(training?.contractor?.id),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            start_date: FormUtil.getDataValue(data.start_date),
            end_date: FormUtil.getDataValue(data.end_date),
            target_population: FormUtil.getDataValue(data.target_population),
            method: FormUtil.getDataValue(data.method),
            number_of_women: FormUtil.getDataValue(parseInt(data.number_of_women)),
            number_of_men: FormUtil.getDataValue(parseInt(data.number_of_men)),
            number_of_hours: FormUtil.getDataValue(parseInt(data.number_of_hours)),
            number_of_digital_materials: FormUtil.getDataValue(
                parseInt(data.number_of_digital_materials)
            ),
            number_of_printed_materials: FormUtil.getDataValue(
                parseInt(data.number_of_printed_materials)
            ),
            social_component_monitoring: FormUtil.getDataValue(
                data.social_component_monitoring
            ),
            contract: FormUtil.getDataValue(data.contract),
            contractor: FormUtil.getDataValue(data.contractor),
        });
    };

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <AlertError error={error} />
                <EntityForm
                    onSubmit={formMethods.handleSubmit(onFormSubmit)}
                    onCancel={onCancel}
                >
                    <TrainingFormDataFields
                        contract={training?.contract}
                        contractor={training?.contractor}
                    />
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default TrainingForm;
