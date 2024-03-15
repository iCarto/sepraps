import {theme} from "Theme";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ProjectTypeChip = ({projectTypeData, index}) => {
    return (
        <Stack direction="row" spacing={0.5} mt={index !== 0 ? 0.5 : 0} flexWrap="wrap">
            <Chip
                size="small"
                label={projectTypeData.work_type_label}
                sx={{
                    color: "white",
                    backgroundColor: theme.palette.secondary.dark,
                    marginBottom: 0.5,
                }}
            />
            <Chip
                size="small"
                label={projectTypeData.work_class_label}
                sx={{
                    marginTop: 2,
                    color: "white",
                    backgroundColor: theme.palette.primary.dark,
                }}
            />
        </Stack>
    );
};

export default ProjectTypeChip;
