import {contacts_api_adapter, createContacts} from "./Contact";

class Contractors extends Array {}

const contractor_api_adapter = contractor => {
    if (contractor["contacts"]) {
        contractor["contacts"] = createContacts(
            contacts_api_adapter(contractor["contacts"])
        );
    }
    return contractor;
};

const contractors_api_adapter = contractors => contractors.map(contractor_api_adapter);

const createContractors = (data = []) => {
    const contractors = Contractors.from(data, contractor =>
        createContractor(contractor)
    );
    return contractors;
};

const createContractor = ({
    id = null,
    name = "",
    contractor_type = "",
    contractor_type_name = "",
    phone = "",
    email = "",
    contract = -1, // contract id
    contacts = null,
} = {}) => {
    const publicApi = {
        id,
        name,
        contractor_type,
        contractor_type_name,
        phone,
        email,
        contract,
        contacts,
    };

    return Object.freeze(publicApi);
};

export {
    createContractor as default,
    createContractors,
    contractor_api_adapter,
    contractors_api_adapter,
};
