import {useOutletContext} from "react-router-dom";
import {ViewConnectionsAnalysisContent} from "connection/container";

const ViewContractConnectionsTableContent = () => {
    const {contract} = useOutletContext();

    return (
        <ViewConnectionsAnalysisContent
            filter={{contract: contract.id}}
            showProject={true}
        />
    );
};

export default ViewContractConnectionsTableContent;
