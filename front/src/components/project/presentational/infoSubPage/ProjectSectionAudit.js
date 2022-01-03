import {useOutletContext} from "react-router-dom";
import {DateUtil} from "utilities";

import {ProjectSectionTitle, ProjectSectionKey} from "../subPageElements";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProjectSectionAudit = () => {
    const project = useOutletContext();

    return (
        <>
            <ProjectSectionTitle>Datos de auditoría</ProjectSectionTitle>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box>
                    <ProjectSectionKey>Creado el:</ProjectSectionKey>
                    <ProjectSectionKey>Por usuario:</ProjectSectionKey>
                    <ProjectSectionKey>Última modificación:</ProjectSectionKey>
                </Box>
                <Box>
                    <Typography variant="subtitle1">
                        {DateUtil.formatDateMonth(project[0].created_at)}
                    </Typography>
                    <Typography variant="subtitle1">
                        {project[0].creation_user}
                    </Typography>
                    <Typography variant="subtitle1">
                        {DateUtil.formatDateMonth(project[0].updated_at)}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default ProjectSectionAudit;
