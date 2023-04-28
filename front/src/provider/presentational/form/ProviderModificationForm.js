import {ProviderFormGeneralDataFields} from ".";

const ProviderModificationForm = ({section}) => {
    if (section === "generaldata") {
        return <ProviderFormGeneralDataFields />;
    }
    return null;
};

export default ProviderModificationForm;
