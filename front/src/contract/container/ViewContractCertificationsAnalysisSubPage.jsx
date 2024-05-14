import {Outlet, useLocation, useOutletContext} from "react-router-dom";

import {TabContainer} from "base/ui/tab/components";
import {RouterUtil} from "base/navigation/utilities";
import Box from "@mui/material/Box";

const ViewContractCertificationsAnalysisSubPage = () => {
    const location = useLocation();
    const basePath = RouterUtil.getPathForSegment(location, "certifications");

    const [contract] = useOutletContext();
    const contextForOutlet = {contract: contract};

    const tabs = [
        {
            label: "Análisis",
            path: "analysis",
            content: <Outlet context={contextForOutlet} />,
        },
    ];

    return (
        <Box>
            <TabContainer tabs={tabs} basePath={basePath} />
        </Box>
    );
};

export default ViewContractCertificationsAnalysisSubPage;
