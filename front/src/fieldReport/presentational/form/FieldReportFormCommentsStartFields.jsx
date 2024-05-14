import {FormTextArea} from "base/form/components";

const FieldReportFormCommentsStartFields = () => {
    return (
        <>
            <FormTextArea
                name="report_comments_start"
                label="Introducción al informe"
                rows={8}
            />
        </>
    );
};

export default FieldReportFormCommentsStartFields;
