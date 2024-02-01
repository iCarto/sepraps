import {Outlet, useLocation, useOutletContext} from "react-router-dom";

import {TabContainer} from "base/ui/tab/components";
import {RouterUtil} from "base/navigation/utilities";
import Box from "@mui/material/Box";

const ViewContractSocialAnalysisSubPage = () => {
    const location = useLocation();
    const basePath = RouterUtil.getPathForSegment(location, "project_social_analysis");

    const [contract] = useOutletContext();
    const contextForOutlet = {contract: contract};

    const tabs = [
        {
            label: "Tabla servicios",
            path: "overview",
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: "Gráfico servicios",
            path: "components_chart",
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: "Tabla conexiones",
            path: "connections_table",
            content: <Outlet context={contextForOutlet} />,
        },
    ];

    return (
        <Box>
            <TabContainer tabs={tabs} basePath={basePath} />
        </Box>
    );
};

export default ViewContractSocialAnalysisSubPage;
