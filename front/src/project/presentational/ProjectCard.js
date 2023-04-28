import {useProjectCard} from "project/data";
import {EntityCard} from "base/entity/components";
import {MilestoneTimelineShort} from "milestone/presentational";
import {ProjectTypeIcon} from "project/presentational";
import {ImagePreview} from "base/image/components";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const projectTypeIconBoxStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    display: "flex",
    m: 1.5,
    mb: 2.5,
    p: 0.75,
    borderRadius: "50%",
    bgcolor: "white",
    opacity: 0.8,
};

const projectClassBoxStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    display: "flex",
    m: 1.5,
    mb: 2.5,
    px: 0.5,
    borderRadius: 1,
    bgcolor: "white",
    opacity: 0.8,
};

const closedProjectTagStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    display: {xs: "none", md: "flex"},
    m: 1.5,
    px: 0.5,
    borderRadius: "5%",
    bgcolor: "error.main",
    opacity: 0.8,
};

const ProjectCard = ({project, onClick = null}) => {
    const {cardFields} = useProjectCard();

    const projectCardHeader = (
        <>
            <div style={{position: "relative"}}>
                <ImagePreview
                    path={project.featured_image}
                    alt={project.name}
                    width="auto"
                    height="170px"
                    sx={project.closed === true ? {opacity: 0.4} : {opacity: 1}}
                />
                <Box sx={projectTypeIconBoxStyle}>
                    <ProjectTypeIcon
                        projectType={project.project_type}
                        projectTypeName={project.project_type_name}
                        size="medium"
                    />
                </Box>
                {project.closed && (
                    <Box sx={closedProjectTagStyle}>
                        <Typography
                            component="span"
                            variant="button"
                            sx={{fontWeight: 800, color: "#fff"}}
                        >
                            Archivado
                        </Typography>
                    </Box>
                )}
                <Tooltip title={`Clase: ${project.project_class_name}`}>
                    <Box sx={projectClassBoxStyle}>
                        <Typography variant="button">
                            {project.project_class_name}
                        </Typography>
                    </Box>
                </Tooltip>
            </div>
            <CardContent>
                <Typography variant="h5" color="primary">
                    {project.name}
                </Typography>
                <Typography variant="body1">{project.code}</Typography>
                <Box sx={{mt: 2}}>
                    <MilestoneTimelineShort milestones={project.milestones} />
                </Box>
            </CardContent>
        </>
    );

    return (
        <EntityCard
            entity={project}
            entityFields={cardFields}
            cardHeader={projectCardHeader}
            onClick={onClick}
        />
    );
};

export default ProjectCard;
