import {useOutletContext} from "react-router-dom";
import {DateUtil} from "utilities";

import {ProgressBar, SectionCard, SectionField} from "components/common/presentational";
import DateRangeIcon from "@mui/icons-material/DateRange";

const ProjectMonitoringSection = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Seguimiento">
            <SectionField
                label="Fecha inicio:"
                value={DateUtil.formatDate(project.init_date)}
                labelIcon={DateRangeIcon}
                containerWidth="short"
            />
            <SectionField
                label="Fase:"
                value={project.phase_name}
                containerWidth="short"
            />
            <ProgressBar barPhase={project.phase_name} />
        </SectionCard>
    );
};

export default ProjectMonitoringSection;
