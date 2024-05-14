import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {ViewOrUpdateContractContent} from ".";

const ViewContractPostExecutionSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const sections = [
        <ViewOrUpdateContractContent
            contract={contract}
            section="postconstruction"
            label="Post-construcción"
        />,
    ];

    return contract && <EntityViewSubPage sections={sections} />;
};

export default ViewContractPostExecutionSubPage;
