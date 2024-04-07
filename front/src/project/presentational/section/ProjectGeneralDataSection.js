import {ClosedProjectTag} from "project/presentational";
import {ImagePreview} from "base/image/components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Stack from "@mui/material/Stack";

const closedProjectTagStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    display: {xs: "none", md: "flex"},
    m: 1.5,
    p: 0.75,
};

const ProjectGeneralDataSection = ({project, basicDataComponent}) => {
    return (
        <Grid container columnSpacing={4}>
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
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{mt: 1}}
                >
                    <LocationOnOutlinedIcon fontSize="small" sx={{color: "grey.500"}} />
                    <Typography variant="body2" fontWeight="normal" color="grey.500">
                        {project?.location}
                    </Typography>
                </Stack>
            </Grid>

            <Grid item sm={9} md={8}>
                <Typography variant="h4" sx={{fontWeight: 500}} mb={1}>
                    {project?.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2} sx={{mb: 2}}>
                    <Typography variant="h5" fontWeight="normal">
                        {project?.code}
                    </Typography>
                </Stack>
                {basicDataComponent}
            </Grid>
        </Grid>
    );
};

export default ProjectGeneralDataSection;
