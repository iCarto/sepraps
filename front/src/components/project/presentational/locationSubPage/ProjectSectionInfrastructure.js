import {useOutletContext} from "react-router-dom";

import {ProjectSectionTitle, ProjectSectionKey} from "../subPageElements";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProjectSectionInfrastructure = () => {
    const project = useOutletContext();

    return (
        <>
            <ProjectSectionTitle>Infraestructura principal</ProjectSectionTitle>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box>
                    <ProjectSectionKey>Departamento:</ProjectSectionKey>
                    <ProjectSectionKey>Distrito:</ProjectSectionKey>
                    <ProjectSectionKey>Localidad:</ProjectSectionKey>
                    <ProjectSectionKey>Ubicación:</ProjectSectionKey>
                </Box>
                <Box>
                    <Typography variant="subtitle1">
                        {project[0].main_infrastructure.department_name}
                    </Typography>
                    <Typography variant="subtitle1">
                        {project[0].main_infrastructure.district_name}
                    </Typography>
                    <Typography variant="subtitle1">
                        {project[0].main_infrastructure.locality_name}
                    </Typography>
                    <Typography variant="subtitle1">
                        {project[0].main_infrastructure.latitude},{" "}
                        {project[0].main_infrastructure.longitude} (
                        {project[0].main_infrastructure.altitude})
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default ProjectSectionInfrastructure;
