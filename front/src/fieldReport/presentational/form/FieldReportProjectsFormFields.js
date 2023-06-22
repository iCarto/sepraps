import {FormTextArea} from "base/form/components";
import {ContractSearchAutocomplete} from "contract/presentational";
import {ProjectSearchAutocomplete} from "project/presentational/form";

const FieldReportProjectsFormFields = () => {
    const handleSelectExistingContract = contract => {
        console.log("contract", contract);
    };

    const handleSelectExistingProject = contract => {
        console.log("contract", contract);
    };

    return (
        <>
            <ContractSearchAutocomplete handleSelect={handleSelectExistingContract} />
            <ProjectSearchAutocomplete handleSelect={handleSelectExistingProject} />
            <FormTextArea name="history" label="Antecedentes" rows={8} />
        </>
    );
};

export default FieldReportProjectsFormFields;
