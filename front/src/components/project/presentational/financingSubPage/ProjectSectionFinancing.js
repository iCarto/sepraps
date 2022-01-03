import {useOutletContext} from "react-router-dom";

import {ProjectSectionTitle, ProjectSectionKey} from "../subPageElements";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProjectSectionFinancing = () => {
    const project = useOutletContext();

    return (
        <>
            <ProjectSectionTitle>Programa</ProjectSectionTitle>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box>
                    <ProjectSectionKey>Programa de financiación:</ProjectSectionKey>
                    <ProjectSectionKey>Financiador:</ProjectSectionKey>
                </Box>
                <Box>
                    <Typography variant="subtitle1">
                        {project[0].financing_program_name}
                    </Typography>
                    <Typography variant="subtitle1">
                        {project[0].financing_fund_name}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default ProjectSectionFinancing;
