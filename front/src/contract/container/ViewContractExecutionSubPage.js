import {useOutletContext} from "react-router-dom";
import {
    ContractExecutionSection,
    ContractPostConstructionSection,
} from "contract/presentational/section";
import {EntityViewSubPage} from "base/entity/components/container";
import {useEffect, useState} from "react";
import {ContractServiceService} from "contract/service";
import {ViewOrUpdateSupervisionServiceContent} from ".";

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
        <ContractExecutionSection contract={contract} />,
        ...[
            services.map(contractService => (
                <ViewOrUpdateSupervisionServiceContent
                    key={contractService.id}
                    contractService={contractService}
                />
            )),
        ],
        <ContractPostConstructionSection contract={contract} />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractExecutionSubPage;
