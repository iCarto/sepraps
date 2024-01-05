import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/components/container";
import {useEffect, useState} from "react";
import {ContractServiceService} from "contract/service";
import {ViewOrUpdateContractContent, ViewOrUpdateSupervisionServiceContent} from ".";

const ViewContractExecutionSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const [services, setServices] = useState([]);

    useEffect(() => {
        ContractServiceService.getServices(contract.id).then(services => {
            console.log({services});
            setServices(services);
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
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractExecutionSubPage;
