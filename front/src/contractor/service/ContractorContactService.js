import {AuthApiService} from "base/api/service";
import {ServiceUtil} from "base/api/utilities";
import {
    contact_api_adapter,
    contacts_api_adapter,
    createContact,
    createContacts,
} from "contact/model";

const basePathContractors = "/api/app/contractors";
const basePathContractorsContacts = "/api/app/contractorcontacts";

const ContractorContactService = {
    getList(contractId, filter) {
        return AuthApiService.get(
            `${basePathContractors}/${contractId}/contacts?${ServiceUtil.getFilterQueryString(
                filter
            )}`
        ).then(response => {
            return createContacts(contacts_api_adapter(response));
        });
    },

    create(contractId, contact) {
        return AuthApiService.post(
            `${basePathContractors}/${contractId}/contacts`,
            contact
        ).then(response => createContact(contact_api_adapter(response)));
    },

    get(id) {
        return AuthApiService.get(`${basePathContractorsContacts}/${id}`).then(
            response => {
                return createContact(contact_api_adapter(response));
            }
        );
    },

    update(contact) {
        return AuthApiService.put(
            `${basePathContractorsContacts}/${contact.id}`,
            contact
        ).then(response => {
            return createContact(contact_api_adapter(response));
        });
    },

    delete(id) {
        return AuthApiService.delete(`${basePathContractorsContacts}/${id}`);
    },
};

export default ContractorContactService;
