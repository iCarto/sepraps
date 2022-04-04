class Contacts extends Array {}

const contact_api_adapter = contact => {
    return contact;
};

const contacts_api_adapter = contacts => contacts.map(contact_api_adapter);

const createContacts = (data = []) => {
    const contacts = Contacts.from(data, contact => createContact(contact));
    return contacts;
};

const createContact = ({
    id = null,
    name = "",
    post = "",
    post_name = "",
    gender = "",
    phone = "",
    email = "",
    is_staff = "",
    comments = "",
} = {}) => {
    const publicApi = {
        id,
        name,
        post,
        post_name,
        gender,
        phone,
        email,
        is_staff,
        comments,
    };

    return Object.freeze(publicApi);
};

export {
    createContact as default,
    createContacts,
    contact_api_adapter,
    contacts_api_adapter,
};
