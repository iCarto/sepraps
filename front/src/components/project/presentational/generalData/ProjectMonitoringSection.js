import {useOutletContext} from "react-router-dom";
import {DateUtil} from "utilities";

import {ProgressBar, DetailCard, SectionField} from "components/common/presentational";
import Box from "@mui/material/Box";
import DateRangeIcon from "@mui/icons-material/DateRange";

const ProjectMonitoringSection = () => {
    const project = useOutletContext();

    return (
        <DetailCard title="Seguimiento">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <SectionField
                    label="Fecha inicio:"
                    value={DateUtil.formatDate(project[0].init_date)}
                    labelIcon={DateRangeIcon}
                    containerWidth="short"
                />
            </Box>
            <SectionField
                label="Fase:"
                value={project[0].phase_name}
                containerWidth="short"
            />
            <ProgressBar barPhase={project[0].phase_name} />
        </DetailCard>
    );
};

export default ProjectMonitoringSection;
