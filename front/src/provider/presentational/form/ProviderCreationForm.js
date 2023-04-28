import {FormStepper} from "base/form/components";
import {ProviderFormGeneralDataFields} from ".";
import Box from "@mui/material/Box";

const ProviderCreationForm = ({onSubmit, onCancel = null}) => {
    const steps = ["Datos generales"];

    const stepComponents = [<ProviderFormGeneralDataFields orientation="column" />];

    return (
        <Box component="form" width="100%" mt={4}>
            <FormStepper
                onSubmit={onSubmit}
                onCancel={onCancel}
                steps={steps}
                stepComponents={stepComponents}
            />
        </Box>
    );
};

export default ProviderCreationForm;
