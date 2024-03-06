import {FormProvider, useForm} from "react-hook-form";
import {CommentFormDataFields} from ".";

import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";

const CommentForm = ({comment = null, onSubmit, onCancel = null, error = null}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(comment?.id),
        text: FormUtil.getFormValue(comment?.text),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            text: FormUtil.getDataValue(data.text),
        });
    };

    return (
        <FormProvider {...formMethods}>
            <AlertError error={error} />
            <EntityForm
                onSubmit={formMethods.handleSubmit(onFormSubmit)}
                onCancel={onCancel}
            >
                <CommentFormDataFields />
            </EntityForm>
        </FormProvider>
    );
};

export default CommentForm;
