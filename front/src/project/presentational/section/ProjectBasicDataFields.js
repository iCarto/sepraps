import {useLocation, useNavigate} from "react-router-dom";
import {DateUtil, NumberUtil} from "base/format/utilities";
import {ProjectTypeClassChip} from "project/presentational";
import {SectionBox} from "base/ui/section/components";
import {ProgressBarSmall} from "base/progress/components";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";

const ProjectBasicDataFields = ({project}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.split("/summary")[0];
    const handleClickOnProgressBox = second => {
        navigate(`${basePath}/buildingcomponents/overview`);
    };
    return (
        <>
            <Typography
                variant="subtitle1"
                color="grey.700"
                fontWeight="normal"
                sx={{mb: 3}}
            >
                {project?.code} - Inicio{" "}
                {project?.init_date
                    ? `el ${DateUtil.formatDate(project?.init_date)}`
                    : "pendiente"}
            </Typography>
            <Stack direction="row" mb={2} spacing={0.5}>
                {project?.project_works.map((project_work, index) => (
                    <ProjectTypeClassChip projectWorkData={project_work} />
                ))}
            </Stack>
            {project?.description ? (
                <Box mb={3}>
                    <Typography variant="body2">{project?.description}</Typography>
                </Box>
            ) : null}

            <SectionBox label="Avance">
                <Tooltip
                    title="Navegar a la supervisión técnica del proyecto"
                    onClick={handleClickOnProgressBox}
                >
                    <div style={{cursor: "pointer"}}>
                        <ProgressBarSmall
                            label="Financiero"
                            progressValue={NumberUtil.formatDecimalWithoutZeros(
                                project.financial_progress_percentage
                            )}
                            progressStyle={{mb: 1}}
                        />
                        <ProgressBarSmall
                            label="Físico"
                            progressValue={NumberUtil.formatDecimalWithoutZeros(
                                project.physical_progress_percentage
                            )}
                        />
                    </div>
                </Tooltip>
            </SectionBox>
        </>
    );
};

export default ProjectBasicDataFields;
