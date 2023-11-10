import {contact_api_adapter, createContact} from "contact/model";
import {contract_api_adapter, createContract} from ".";

class ContractSupervisionAreas extends Array {}

const contract_supervision_area_api_adapter = contractSupervisionArea => {
    if (contractSupervisionArea.supervisor) {
        contractSupervisionArea["supervisor"] = createContact(
            contact_api_adapter(contractSupervisionArea.supervisor)
        );
    }
    if (contractSupervisionArea.supervision_contract) {
        contractSupervisionArea["supervision_contract"] = createContract(
            contract_api_adapter(contractSupervisionArea.supervision_contract)
        );
    }

    return contractSupervisionArea;
};

const contract_supervision_area_view_adapter = contractSupervisionArea => {
    console.log({contractSupervisionArea});
    contractSupervisionArea["supervisor"] = !!contractSupervisionArea["supervisor"]
        ? contractSupervisionArea["supervisor"].id
        : null;
    contractSupervisionArea["supervision_contract"] = !!contractSupervisionArea[
        "supervision_contract"
    ]
        ? contractSupervisionArea["supervision_contract"].id
        : null;

    return contractSupervisionArea;
};

const contract_supervision_areas_api_adapter = contractSupervisionAreas => {
    return contractSupervisionAreas.map(contract_supervision_area_api_adapter);
};

const createContractSupervisionAreas = (data = []) => {
    const contractSupervisionAreas = ContractSupervisionAreas.from(
        data,
        contractSupervisionArea =>
            createContractSupervisionArea(contractSupervisionArea)
    );
    return contractSupervisionAreas;
};

const createContractSupervisionArea = ({
    id = null,
    code = null,
    supervisor = null,
    supervision_contract = null,
} = {}) => {
    const publicApi = {
        id,
        code,
        supervisor,
        supervision_contract,
    };

    return Object.freeze(publicApi);
};

export {
    createContractSupervisionArea as default,
    createContractSupervisionAreas,
    contract_supervision_area_api_adapter,
    contract_supervision_areas_api_adapter,
    contract_supervision_area_view_adapter,
};
