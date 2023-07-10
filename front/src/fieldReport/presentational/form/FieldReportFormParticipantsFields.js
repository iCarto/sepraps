import {FormInputTextList} from "base/form/components";

const FieldReportFormParticipantsFields = () => {
    //TO-DO: Rethink once we know how we'll be handling name/role
    return (
        <FormInputTextList
            name="other_reporting_persons"
            itemName="Participante en la intervención"
        />
    );
};

export default FieldReportFormParticipantsFields;
