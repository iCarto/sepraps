import {Fragment} from "react";
import {FormDatePicker, FormInputText} from "components/common/form";

const QuestionnaireInstanceFormFields = ({questionnaireFields}) => {
    return (
        <Fragment>
            <FormDatePicker
                name="year_month"
                label="Mes y año"
                views={["month", "year"]}
            />
            <FormInputText name="comments" label="Observaciones" />
            {questionnaireFields.map(field => {
                return (
                    <FormInputText
                        key={field.code}
                        name={field.code}
                        label={field.label}
                    />
                );
            })}
        </Fragment>
    );
};

export default QuestionnaireInstanceFormFields;
