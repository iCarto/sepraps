import {
    FieldReportFormGeneralDataFields,
    FieldReportFormCommentsStartFields,
    FieldReportFormCommentsEndFields,
    FieldReportFormGoalsFields,
} from ".";

const FieldReportModificationForm = ({section}) => {
    if (section === "generaldata") {
        return <FieldReportFormGeneralDataFields />;
    }
    if (section === "start") {
        return <FieldReportFormCommentsStartFields />;
    }
    if (section === "goals") {
        return <FieldReportFormGoalsFields />;
    }
    if (section === "end") {
        return <FieldReportFormCommentsEndFields />;
    }
    return null;
};

export default FieldReportModificationForm;
