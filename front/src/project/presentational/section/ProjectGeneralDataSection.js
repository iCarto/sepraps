import {ClosedProjectTag} from "project/presentational";
import {ImagePreview} from "base/image/components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const closedProjectTagStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    display: {xs: "none", md: "flex"},
    m: 1.5,
    p: 0.75,
};

const ProjectGeneralDataSection = ({project, basicDataComponent}) => {
    const isProjectClosed = project?.closed;

    return (
        <Grid
            container
            columnSpacing={4}
            sx={{marginTop: isProjectClosed ? 0 : "-48px"}}
        >
            <Grid item sm={3} md={4}>
                <div style={{position: "relative"}}>
                    <ImagePreview
                        path={project?.featured_image}
                        alt={project?.name}
                        sx={{
                            display: {xs: "none", sm: "block"},
                            opacity: project?.closed === true ? 0.4 : 1,
                        }}
                    />
                    {project?.closed && (
                        <ClosedProjectTag tagCustomStyle={closedProjectTagStyle} />
                    )}
                </div>
            </Grid>

            <Grid item sm={9} md={8}>
                <Typography variant="h4" color="grey.800" sx={{fontWeight: 500}} mb={1}>
                    {project?.name}
                </Typography>
                <Typography variant="h6" color="grey.800" fontWeight="normal">
                    {project?.location}
                </Typography>

                {basicDataComponent}
            </Grid>
        </Grid>
    );
};

export default ProjectGeneralDataSection;
