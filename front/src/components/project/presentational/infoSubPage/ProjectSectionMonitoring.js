import {useOutletContext} from "react-router-dom";
import {DateUtil} from "utilities";

import {ProgressBar} from "../../../common/presentational";
import {ProjectSectionTitle, ProjectSectionKey} from "../subPageElements";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DateRangeIcon from "@mui/icons-material/DateRange";

const ProjectSectionMonitoring = () => {
    const project = useOutletContext();

    return (
        <>
            <ProjectSectionTitle>Seguimiento</ProjectSectionTitle>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <DateRangeIcon
                        fontSize="small"
                        sx={{mr: 1, color: "text.secondary"}}
                    />
                    <ProjectSectionKey>Fecha inicio:</ProjectSectionKey>
                </Box>
                <Box>
                    <Typography variant="subtitle1" sx={{lineHeight: 1}}>
                        {DateUtil.formatDateMonth(project[0].init_date)}
                    </Typography>
                </Box>
            </Box>
            <Typography>{project[0].phase_name}</Typography>
            <ProgressBar barPhase={project[0].phase_name} />
        </>
    );
};

export default ProjectSectionMonitoring;
