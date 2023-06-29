import {FormTextArea} from "base/form/components";

const FieldReportFormCommentsEndFields = () => {
    return (
        <>
            <FormTextArea
                name="report_comments_end"
                label="Explicación del informe"
                rows={8}
            />
        </>
    );
};

export default FieldReportFormCommentsEndFields;
