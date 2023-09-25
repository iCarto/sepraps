import {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";

import {ContractService} from "contract/service";
import {useConfigModule} from "base/ui/module/provider";

import {PageLayout} from "base/ui/main";
import {ContractSubPageMenu} from "contract/menu";

const ViewContractPage = () => {
    const {id} = useParams();
    const [contract, setContract] = useState(null);
    const location = useLocation();

    const {addToModuleFilter, setModuleBasePath} = useConfigModule();

    useEffect(() => {
        setContract(null);
        setModuleBasePath(`/contracts/list/${id}`);
        ContractService.get(id).then(data => {
            addToModuleFilter({contract: data.id});
            setContract(data);
        });
    }, [id, location.state?.lastRefreshDate]);

    return (
        contract && (
            <PageLayout
                menu={<ContractSubPageMenu contract={contract} />}
                context={[contract]}
                subPage={true}
            />
        )
    );
};

export default ViewContractPage;
