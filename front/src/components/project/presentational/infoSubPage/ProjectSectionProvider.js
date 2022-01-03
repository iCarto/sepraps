import {useOutletContext} from "react-router-dom";

import {ProjectSectionTitle, ProjectSectionKey} from "../subPageElements";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ProjectSectionProvider = () => {
    const project = useOutletContext();

    return (
        <>
            <ProjectSectionTitle>Prestador</ProjectSectionTitle>
            <Typography
                component="h2"
                variant="h6"
                sx={{
                    my: {xs: 1, md: "none"},
                }}
            >
                {project[0].provider.name}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <LocationOnIcon
                        fontSize="small"
                        sx={{mr: 1, mt: 0.2, color: "text.secondary"}}
                    />
                    <ProjectSectionKey>Ubicación:</ProjectSectionKey>
                </Box>
                <Box>
                    <Typography>{project[0].provider.department_name}</Typography>
                    <Typography>{project[0].provider.district_name}</Typography>
                    <Typography>{project[0].provider.locality_name}</Typography>
                </Box>
            </Box>
        </>
    );
};

export default ProjectSectionProvider;
