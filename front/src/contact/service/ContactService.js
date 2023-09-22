import {
    contact_api_adapter,
    contacts_api_adapter,
    createContact,
    createContacts,
} from "contact/model";
import {AuthApiService} from "base/api/service";

const basePath = "/api/app/contacts";

const ContactService = {
    get(id) {
        return AuthApiService.get(basePath + "/" + id).then(response => {
            return createContact(contact_api_adapter(response));
        });
    },

    getList() {
        return AuthApiService.get(basePath).then(response => {
            return createContacts(contacts_api_adapter(response));
        });
    },
    findContacts(searchText, allowedPosts) {
        let searchString = `?search=${searchText}`;
        if (allowedPosts && allowedPosts.length) {
            searchString = searchString + "&posts=" + allowedPosts.join(",");
        }
        return AuthApiService.get(basePath + searchString).then(response => {
            return createContacts(contacts_api_adapter(response));
        });
    },
    delete(contactId) {
        return AuthApiService.delete(basePath + "/" + contactId).then(response => {
            console.log({deleted: response});
        });
    },
};

export default ContactService;
