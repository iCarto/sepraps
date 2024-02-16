import {AuthApiService} from "base/api/service";
import {ServiceUtil} from "base/api/utilities";
import {
    contact_api_adapter,
    contacts_api_adapter,
    createContact,
    createContacts,
} from "contact/model";

const basePathProviders = "/api/app/providers";
const basePathProviderContacts = "/api/app/providercontacts";

const ProviderContactService = {
    getList(contractId, filter) {
        return AuthApiService.get(
            `${basePathProviders}/${contractId}/contacts?${ServiceUtil.getFilterQueryString(
                filter
            )}`
        ).then(response => {
            return createContacts(contacts_api_adapter(response));
        });
    },

    create(contractId, contact) {
        return AuthApiService.post(
            `${basePathProviders}/${contractId}/contacts`,
            contact
        ).then(response => createContact(contact_api_adapter(response)));
    },

    get(id) {
        return AuthApiService.get(`${basePathProviderContacts}/${id}`).then(
            response => {
                return createContact(contact_api_adapter(response));
            }
        );
    },

    update(contact) {
        return AuthApiService.put(
            `${basePathProviderContacts}/${contact.id}`,
            contact
        ).then(response => {
            return createContact(contact_api_adapter(response));
        });
    },

    delete(id) {
        return AuthApiService.delete(`${basePathProviderContacts}/${id}`);
    },
};

export default ProviderContactService;
