import {PaperComponent} from "base/shared/components";
import {useOutletContext} from "react-router-dom";

import {ViewSocialComponentsTrainingsTotalsTable} from "socialComponent/container";

const ViewContractSocialComponentsTrainingsTableContent = () => {
    const {contract} = useOutletContext();

    return (
        <PaperComponent>
            <ViewSocialComponentsTrainingsTotalsTable
                filter={{contract: contract.id}}
            />
        </PaperComponent>
    );
};

export default ViewContractSocialComponentsTrainingsTableContent;
