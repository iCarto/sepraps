import {ProviderFormGeneralDataFields, ProviderFormLegalDataFields} from ".";

const ProviderModificationForm = ({section}) => {
    if (section === "generaldata") {
        return <ProviderFormGeneralDataFields />;
    }
    if (section === "legaldata") {
        return <ProviderFormLegalDataFields />;
    }
    return null;
};

export default ProviderModificationForm;
