import {FieldReportFormGeneralDataFields} from ".";

const FieldReportModificationForm = ({section}) => {
    if (section === "generaldata") {
        return <FieldReportFormGeneralDataFields />;
    }
    return null;
};

export default FieldReportModificationForm;
