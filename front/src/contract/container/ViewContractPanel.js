import {useParams} from "react-router-dom";

import {ContractService} from "contract/service";
import {useNavigateWithReload} from "base/navigation/hooks";
import {EntitySummaryPanel} from "base/entity/components/presentational";
import {ContractSummaryFields} from "contract/presentational";

const ViewContractPanel = () => {
    const {id} = useParams();
    const navigate = useNavigateWithReload();

    const getSectionData = contract => {
        return <ContractSummaryFields contract={contract} />;
    };

    const handleClickDetail = () => {
        navigate(`/contracts/${id}/summary`);
    };

    return (
        <EntitySummaryPanel
            service={ContractService}
            id={id}
            title="Contrato"
            getSectionTitle={contract => contract?.number}
            getSectionData={getSectionData}
            onClickDetailButton={handleClickDetail}
        />
    );
};

export default ViewContractPanel;
