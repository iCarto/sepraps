import {DateUtil} from "base/format/utilities";
import {ProjectTypeClassChips} from "project/presentational";
import {SectionBox} from "base/ui/section/components";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import Tooltip from "@mui/material/Tooltip";

const ProjectBasicDataFields = ({project}) => {
    return (
        <Stack spacing={1}>
            <Stack direction="row" alignItems="flex-start" spacing={1}>
                <Tooltip title="Fecha de inicio">
                    <EventOutlinedIcon fontSize="small" />
                </Tooltip>
                <Typography variant="body2" fontWeight="normal">
                    {DateUtil.formatDate(project?.init_date)}
                </Typography>
            </Stack>
            <Stack direction="row" alignItems="flex-start" spacing={1}>
                <Tooltip title="Descripción">
                    <DescriptionOutlinedIcon fontSize="small" />
                </Tooltip>
                <Typography variant="body2" fontWeight="normal">
                    {project?.description}
                </Typography>
            </Stack>
            <SectionBox label="Trabajos">
                <ProjectTypeClassChips projectWorks={project?.project_works} />
            </SectionBox>
        </Stack>
    );
};

export default ProjectBasicDataFields;
