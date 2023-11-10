import {useOutletContext} from "react-router-dom";
import {EntityViewSubPage} from "base/entity/components/container";
import {useEffect, useState} from "react";
import {ContractService} from "contract/service";
import {ViewOrUpdateSupervisionAreaContent} from ".";

const ViewContractSupervisionAreaSubPage = ({area}) => {
    let contract;
    [contract] = useOutletContext();

    const [supervisionArea, setSupervisionArea] = useState(null);

    useEffect(() => {
        ContractService.getSupervisionArea(contract.id, area).then(response => {
            setSupervisionArea(response);
        });
    }, [area]);

    const sections = [
        <ViewOrUpdateSupervisionAreaContent supervisionArea={supervisionArea} />,
    ];

    return supervisionArea && <EntityViewSubPage sections={sections} />;
};

export default ViewContractSupervisionAreaSubPage;
