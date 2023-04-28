import {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";
import {ContractService} from "contract/service";

import {PageLayout} from "base/ui/main";
import {ContractSubPageMenu} from "contract/menu";

const ViewContractPage = () => {
    const {id} = useParams();
    const [contract, setContract] = useState(null);
    const location = useLocation();

    useEffect(() => {
        ContractService.get(id).then(data => {
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
