import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {ContractService, ContractServiceService} from "contract/service";

import {EntityViewSubPage} from "base/entity/components/container";
import {
    ViewContractAmendmentsContent,
    ViewOrUpdateContractContent,
    ViewOrUpdateSupervisionServiceContent,
} from ".";
import {NotificationsSection} from "notification/presentational";

const ViewContractExecutionSubPage = () => {
    let contract;
    let notifications;
    [contract, notifications] = useOutletContext();

    const [services, setServices] = useState([]);
    const [amendments, setAmendments] = useState([]);
    const [executionNotifications, setExecutionNotifications] = useState([]);

    useEffect(() => {
        if (notifications)
            setExecutionNotifications(
                notifications.filter(item => item.context.section.includes("execution"))
            );
    }, [notifications]);

    useEffect(() => {
        Promise.all([
            ContractServiceService.getServices(contract.id),
            ContractService.getAmendmentsList(contract.id),
        ]).then(([services, amendments]) => {
            setServices(services);
            setAmendments(amendments);
        });
    }, [contract]);

    let sections = [
        <ViewOrUpdateContractContent
            contract={contract}
            services={services}
            section="execution"
            label="Ejecución"
        />,
        ...services.map(contractService => (
            <ViewOrUpdateSupervisionServiceContent
                key={contractService.id}
                contractService={contractService}
            />
        )),
        <ViewContractAmendmentsContent amendments={amendments} contract={contract} />,
    ];

    if (notifications.length) {
        sections = [
            <NotificationsSection notifications={executionNotifications} />,
            ...sections,
        ];
    }

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractExecutionSubPage;
