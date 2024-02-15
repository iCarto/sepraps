import {AuthApiService} from "base/api/service";
import {
    contact_api_adapter,
    contacts_api_adapter,
    createContact,
    createContacts,
} from "contact/model";

const basePathContracts = "/api/app/constructioncontracts";
const basePathContractsContacts = "/api/app/contractcontacts";

const ContractContactService = {
    getList(contractId, area = null) {
        return AuthApiService.get(
            `${basePathContracts}/${contractId}/contacts${area ? `?area=${area}` : ""}`
        ).then(response => {
            return createContacts(contacts_api_adapter(response));
        });
    },

    create(contractId, contact) {
        return AuthApiService.post(
            `${basePathContracts}/${contractId}/contacts`,
            contact
        ).then(response => createContact(contact_api_adapter(response)));
    },

    get(id) {
        return AuthApiService.get(`${basePathContractsContacts}/${id}`).then(
            response => {
                return createContact(contact_api_adapter(response));
            }
        );
    },

    update(contact) {
        return AuthApiService.put(
            `${basePathContractsContacts}/${contact.id}`,
            contact
        ).then(response => {
            return createContact(contact_api_adapter(response));
        });
    },

    delete(id) {
        return AuthApiService.delete(`${basePathContractsContacts}/${id}`);
    },
};

export default ContractContactService;
