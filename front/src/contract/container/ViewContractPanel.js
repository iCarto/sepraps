import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractService} from "contract/service";

import {EntityViewPanel} from "base/entity/components/presentational";
import {ContractSummary} from "../presentational";

const ViewContractPanel = () => {
    const navigate = useNavigateWithReload();
    const [contract, setContract] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        ContractService.get(id).then(contract => {
            setContract(contract);
        });
    }, [id]);

    const handleClickDetail = () => {
        navigate(`/contracts/${contract.id}/summary`);
    };

    return (
        contract && (
            <EntityViewPanel
                onClickDetailButton={handleClickDetail}
                title="Resumen del contrato"
            >
                {<ContractSummary contract={contract} />}
            </EntityViewPanel>
        )
    );
};

export default ViewContractPanel;
