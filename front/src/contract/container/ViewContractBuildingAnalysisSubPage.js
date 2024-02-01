import {Outlet, useLocation, useOutletContext} from "react-router-dom";

import {TabContainer} from "base/ui/tab/components";
import {RouterUtil} from "base/navigation/utilities";
import Box from "@mui/material/Box";

const ViewContractBuildingAnalysisSubPage = () => {
    const location = useLocation();
    const basePath = RouterUtil.getPathForSegment(location, "project_analysis");

    const [contract] = useOutletContext();
    const contextForOutlet = {contract: contract};

    const tabs = [
        {
            label: "Vista general",
            path: "overview",
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: "Gráfico",
            path: "chart",
            content: <Outlet context={contextForOutlet} />,
        },
    ];

    return (
        <Box>
            <TabContainer tabs={tabs} basePath={basePath} />
        </Box>
    );
};

export default ViewContractBuildingAnalysisSubPage;
