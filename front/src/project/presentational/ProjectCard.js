import {useProjectCard} from "project/data";
import {NumberUtil} from "base/format/utilities";
import {EntityCard} from "base/entity/components/presentational";
import {ClosedProjectTag, ProjectTypeIcon} from "project/presentational";
import {ProgressBarSmall} from "base/progress/components";
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

const NO_BCM_DATA_MESSAGE = "No hay datos suficientes para mostrar el avance";

const ProjectCard = ({entity: project, onClick = null}) => {
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
                        projectTypeName={project.project_type_label}
                        size="medium"
                    />
                </Box>
                {project.closed && (
                    <ClosedProjectTag
                        tagCustomStyle={{
                            display: {xs: "none", md: "flex"},
                            position: "absolute",
                            top: 0,
                            left: 0,
                            m: 1.5,
                        }}
                    />
                )}
                <Tooltip title={`Clase: ${project.project_class_label}`}>
                    <Box sx={projectClassBoxStyle}>
                        <Typography variant="button">
                            {project.project_class_label}
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
                    <ProgressBarSmall
                        progressValue={NumberUtil.formatDecimalWithoutZeros(
                            project.financial_progress_percentage
                        )}
                        tooltipLabel={
                            project.financial_progress_percentage
                                ? `Avance financiero: ${NumberUtil.formatDecimalWithoutZeros(
                                      project.financial_progress_percentage
                                  )}%`
                                : NO_BCM_DATA_MESSAGE
                        }
                        progressStyle={{mb: 1}}
                    />
                    <ProgressBarSmall
                        progressValue={NumberUtil.formatDecimalWithoutZeros(
                            project.physical_progress_percentage
                        )}
                        tooltipLabel={
                            project.physical_progress_percentage
                                ? `Avance físico: ${NumberUtil.formatDecimalWithoutZeros(
                                      project.physical_progress_percentage
                                  )}%`
                                : NO_BCM_DATA_MESSAGE
                        }
                    />
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
