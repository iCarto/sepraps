import {useState, useEffect} from "react";
import {Outlet, useParams} from "react-router-dom";
import {ContractService} from "service/api";

import {PageWithMenuLayout} from "layout";
import {ContractMenu} from "../presentational";

const ViewContractPage = () => {
    const {id} = useParams();
    const [contract, setContract] = useState(null);

    useEffect(() => {
        ContractService.getContract(id).then(data => {
            console.log({data});
            setContract(data);
        });
    }, [id]);

    return (
        <PageWithMenuLayout menu={<ContractMenu contractId={id} />}>
            {contract && <Outlet context={[contract]} />}
        </PageWithMenuLayout>
    );
};

export default ViewContractPage;
