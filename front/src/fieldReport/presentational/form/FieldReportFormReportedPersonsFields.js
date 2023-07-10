import {FormInputTextList} from "base/form/components";

const FieldReportFormReportedPersonsFields = () => {
    //TO-DO: Rethink once we know how we'll be handling name/role
    return (
        <FormInputTextList
            name="reported_persons"
            itemName="Responsable de aprobación"
        />
    );
};

export default FieldReportFormReportedPersonsFields;
