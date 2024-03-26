import {useOutletContext} from "react-router-dom";

import Box from "@mui/material/Box";
import {ViewBuildingComponentsAnalysisContent} from "buildingComponent/container";

const ViewFinancingProgramBuildingComponentsSubPage = () => {
    const [financingProgram] = useOutletContext();

    return (
        <Box>
            <ViewBuildingComponentsAnalysisContent
                filter={{financing_program: financingProgram.id}}
                showContract={true}
                showProject={true}
            />
        </Box>
    );
};

export default ViewFinancingProgramBuildingComponentsSubPage;
