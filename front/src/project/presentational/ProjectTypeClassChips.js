import Grid from "@mui/material/Grid";
import {ProjectTypeClassChip} from ".";

const ProjectTypeClassChips = ({projectWorks}) => {
    return projectWorks.length ? (
        <Grid container>
            {projectWorks.map((project_work, index) => (
                <Grid key={index} item sx={{pr: 1, pb: 1}}>
                    <ProjectTypeClassChip projectWorkData={project_work} />
                </Grid>
            ))}
        </Grid>
    ) : null;
};

export default ProjectTypeClassChips;
