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
import Stack from "@mui/material/Stack";

const projectTypeIconBoxStyle = {
    position: "absolute",
    bottom: 5,
    left: 5,
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
                <Stack sx={projectTypeIconBoxStyle} spacing={1}>
                    {project?.project_works.map(project_work => (
                        <Stack direction="row" spacing={1}>
                            <Box
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: "50%",
                                    bgcolor: "white",
                                    opacity: 0.8,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ProjectTypeIcon
                                    projectType={project_work.work_type}
                                    projectTypeName={project_work.work_type_label}
                                    size="small"
                                />
                            </Box>
                            <Tooltip title={`Clase: ${project_work.work_class_label}`}>
                                <Box
                                    sx={{
                                        borderRadius: 1,
                                        bgcolor: "white",
                                        opacity: 0.8,
                                        px: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="caption">
                                        {project_work.work_class_label}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        </Stack>
                    ))}
                </Stack>
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
