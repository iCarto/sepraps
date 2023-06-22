import {FormTextArea} from "base/form/components";

const FieldReportGoalsFormFields = () => {
    return (
        <FormTextArea
            name="visit_goal.text"
            label="Descripción del objetivo"
            rows={8}
        />
    );
};

export default FieldReportGoalsFormFields;
