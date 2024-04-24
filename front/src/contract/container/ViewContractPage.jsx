import {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";

import {ContractService} from "contract/service";
import {NotificationService} from "notification/service";
import {useConfigModule} from "base/ui/module/provider";

import {PageLayout} from "base/ui/main";
import {ContractSubPageMenu} from "contract/menu";

const ViewContractPage = () => {
    const {id} = useParams();

    const [contract, setContract] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const location = useLocation();

    const {addToModuleFilter, setModuleBasePath} = useConfigModule();

    useEffect(() => {
        setContract(null);
        setModuleBasePath(`/contracts/list/${id}`);
        ContractService.get(id)
            .then(data => {
                addToModuleFilter({contract: data.id});
                setContract(data);
            })
            .catch(error => console.log(error));
        NotificationService.get({construction_contract: id})
            .then(data => {
                setNotifications(data);
            })
            .catch(error => console.log(error));
    }, [id, location.state?.lastRefreshDate]);

    return (
        contract && (
            <PageLayout
                menu={<ContractSubPageMenu contract={contract} />}
                context={[contract, notifications]}
                subPage={true}
            />
        )
    );
};

export default ViewContractPage;
