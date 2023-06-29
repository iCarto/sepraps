import {
    FieldReportFormGeneralDataFields,
    FieldReportFormCommentsStartFields,
    FieldReportFormCommentsEndFields,
} from ".";

const FieldReportModificationForm = ({section}) => {
    if (section === "generaldata") {
        return <FieldReportFormGeneralDataFields />;
    }
    if (section === "start") {
        return <FieldReportFormCommentsStartFields />;
    }
    if (section === "end") {
        return <FieldReportFormCommentsEndFields />;
    }
    return null;
};

export default FieldReportModificationForm;
