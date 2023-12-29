import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {ContractService, ContractServiceService} from "contract/service";

import {EntityViewSubPage} from "base/entity/components/container";
import {
    ViewContractAmendmentsContent,
    ViewOrUpdateContractContent,
    ViewOrUpdateSupervisionServiceContent,
} from ".";

const ViewContractExecutionSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const [services, setServices] = useState([]);
    const [amendments, setAmendments] = useState([]);

    useEffect(() => {
        Promise.all([
            ContractServiceService.getServices(contract.id),
            ContractService.getAmendmentsList(contract.id),
        ]).then(([services, amendments]) => {
            setServices(services);
            setAmendments(amendments);
        });
    }, [contract]);

    const sections = [
        <ViewOrUpdateContractContent
            contract={contract}
            section="execution"
            label="Ejecución"
        />,
        ...services.map(contractService => (
            <ViewOrUpdateSupervisionServiceContent
                key={contractService.id}
                contractService={contractService}
            />
        )),
        <ViewOrUpdateContractContent
            contract={contract}
            section="postconstruction"
            label="Post-construcción"
        />,
        <ViewContractAmendmentsContent amendments={amendments} contract={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractExecutionSubPage;
