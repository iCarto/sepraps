import {Fragment} from "react";
import {FormDatePicker, FormInputText} from "components/common/form";

const MilestoneFormFields = () => {
    return (
        <Fragment>
            <FormDatePicker name="compliance_date" label="Fecha de cumplimiento" />
        </Fragment>
    );
};

export default MilestoneFormFields;
