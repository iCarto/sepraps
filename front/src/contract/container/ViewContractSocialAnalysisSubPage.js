import {useParams} from "react-router-dom";

import {
    ViewSocialComponentsTrainingsChart,
    ViewSocialComponentsTrainingsTotalsTable,
} from "../../socialComponent/container";
import {ViewConnectionsTotalsTable} from "connection/container";
import {TabContainerWithoutNavigation} from "base/ui/tab/components";
import {PaperContainer} from "base/shared/components";

const ViewContractSocialAnalysisSubPage = () => {
    const {id: contractId} = useParams();

    const tabs = [
        {
            label: "Tabla servicios",
            content: (
                <ViewSocialComponentsTrainingsTotalsTable
                    filter={{contract: contractId}}
                />
            ),
        },
        {
            label: "Gráfico servicios",
            content: (
                <ViewSocialComponentsTrainingsChart filter={{contract: contractId}} />
            ),
        },
        {
            label: "Tabla conexiones",
            content: <ViewConnectionsTotalsTable filter={{contract: contractId}} />,
        },
    ];

    return (
        <PaperContainer>
            <TabContainerWithoutNavigation
                label="contract-social-analysis"
                tabs={tabs}
            />
        </PaperContainer>
    );
};

export default ViewContractSocialAnalysisSubPage;
