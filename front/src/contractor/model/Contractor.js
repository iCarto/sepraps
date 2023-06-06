import {contacts_api_adapter, createContacts} from "../../contact/model/Contact";

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

const contractor_view_adapter = contractor => {
    return contractor;
};

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
    contractor_type_label = "",
    address = "",
    phone = "",
    email = "",
    comments = "",
    contract = null, // contract id
    contacts = [],
} = {}) => {
    const publicApi = {
        id,
        name,
        contractor_type,
        contractor_type_label,
        address,
        phone,
        email,
        comments,
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
    contractor_view_adapter,
};
