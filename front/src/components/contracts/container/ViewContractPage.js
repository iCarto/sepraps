import {useState, useEffect} from "react";
import {Outlet, useLocation, useParams} from "react-router-dom";
import {ContractService} from "service/api";

import {PageWithMenuLayout} from "layout";
import {ContractMenu} from "../presentational";

const ViewContractPage = () => {
    const {contractId} = useParams();
    const [contract, setContract] = useState(null);
    const location = useLocation();

    useEffect(() => {
        ContractService.getContract(contractId).then(data => {
            setContract(data);
        });
    }, [contractId, location.state?.lastRefreshDate]);

    return (
        <PageWithMenuLayout menu={<ContractMenu contract={contract} />}>
            {contract && <Outlet context={[contract]} />}
        </PageWithMenuLayout>
    );
};

export default ViewContractPage;
