import {useOutletContext} from "react-router-dom";
import {ViewConnectionsTotalsTable} from "connection/container";
import {PaperComponent} from "base/shared/components";

const ViewContractSocialComponentsConnectionsTableContent = () => {
    const {contract} = useOutletContext();

    return (
        <PaperComponent>
            <ViewConnectionsTotalsTable filter={{contract: contract.id}} />
        </PaperComponent>
    );
};

export default ViewContractSocialComponentsConnectionsTableContent;
