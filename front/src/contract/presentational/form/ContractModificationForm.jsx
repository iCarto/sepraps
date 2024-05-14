import {
    ContractGeneralDataFormFields,
    ContractAwardingFormFields,
    ContractExecutionFormFields,
    ContractBidRequestFormFields,
    ContractFinancingFormFields,
    ContractPostConstructionFormFields,
} from ".";

const ContractModificationForm = ({section}) => {
    if (section === "generaldata") {
        return <ContractGeneralDataFormFields />;
    }
    if (section === "financing_program") {
        return <ContractFinancingFormFields />;
    }
    if (section === "bidrequest") {
        return <ContractBidRequestFormFields />;
    }
    if (section === "awarding") {
        return <ContractAwardingFormFields />;
    }
    if (section === "execution") {
        return <ContractExecutionFormFields />;
    }
    if (section === "postconstruction") {
        return <ContractPostConstructionFormFields />;
    }
    return null;
};

export default ContractModificationForm;
