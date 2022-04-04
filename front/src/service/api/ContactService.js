import {contacts_api_adapter, createContacts} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/contacts";

const ContactService = {
    getContacts() {
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
    deleteContact(contactId) {
        return AuthApiService.delete(basePath + "/" + contactId).then(response => {
            console.log(response);
        });
    },
};

export default ContactService;
