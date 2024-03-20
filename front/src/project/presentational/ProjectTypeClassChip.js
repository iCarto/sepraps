import {theme} from "Theme";

import {ProjectTypeIcon} from ".";
import Chip from "@mui/material/Chip";

const ProjectTypeClassChip = ({projectWorkData}) => {
    return (
        <Chip
            icon={<ProjectTypeIcon projectWorkData={projectWorkData} />}
            label={projectWorkData.work_class_label}
            variant="outlined"
            sx={{
                color: "white",
                backgroundColor: theme.palette.primary.dark,
            }}
        />
    );
};

export default ProjectTypeClassChip;
