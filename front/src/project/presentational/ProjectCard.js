import {useProjectCard} from "project/data";
import {NumberUtil} from "base/format/utilities";
import {EntityCard} from "base/entity/components/presentational";
import {ClosedProjectTag, ProjectTypeIcon} from "project/presentational";
import {ProgressBarSmall} from "base/progress/components";
import {ImagePreview} from "base/image/components";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

//TODO: avoid duplicated constant.
const NO_BCM_DATA_MESSAGE = "No hay datos suficientes para mostrar el avance";

const iconsContainerStyle = {
    position: "absolute",
    top: 5,
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
                    sx={{opacity: project.closed ? 0.4 : 1}}
                />
                <Stack sx={iconsContainerStyle} direction="row">
                    {project?.project_works.map((project_work, index) => (
                        <ProjectTypeIcon
                            key={index}
                            projectWorkData={project_work}
                            showProjectClass
                            style={{
                                ml: index !== 0 ? -1 : 0,
                                opacity: project.closed ? 0.4 : 0.85,
                            }}
                        />
                    ))}
                </Stack>
                {project.closed && (
                    <ClosedProjectTag
                        tagCustomStyle={{
                            display: {xs: "none", md: "flex"},
                            position: "absolute",
                            top: 0,
                            right: 0,
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
