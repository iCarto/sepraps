import {contacts_api_adapter, createContacts} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/contacts";

const ContactService = {
    getContacts() {
        return AuthApiService.get(basePath).then(response => {
            return createContacts(contacts_api_adapter(response));
        });
    },
    getContactsBySearchText(searchText) {
        return AuthApiService.get(basePath + `?search=${searchText}`).then(response => {
            return createContacts(contacts_api_adapter(response));
        });
    },
    deleteContact(contactId) {
        return AuthApiService.delete(basePath + "/" + contactId).then(response => {
            console.log(response);
        });
    },
};

export default ContactService;