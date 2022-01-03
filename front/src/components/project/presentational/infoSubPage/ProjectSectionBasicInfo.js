import {useOutletContext} from "react-router-dom";

import {Icon} from "../../../common/presentational";
import {ProjectSectionTitle, ProjectSectionKey} from "../subPageElements";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProjectSectionBasicInfo = () => {
    const project = useOutletContext();

    return (
        <>
            <ProjectSectionTitle>Datos generales</ProjectSectionTitle>
            <Grid container columnSpacing={2}>
                <Grid item sm={3} md={4}>
                    <div style={{position: "relative"}}>
                        <CardMedia
                            component="img"
                            image={project[0].featured_image}
                            alt={project[0].name}
                            sx={{
                                display: {xs: "none", sm: "block"},
                                borderRadius: 1,
                            }}
                        />

                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                display: {xs: "none", md: "flex"},
                                m: 1.5,
                                p: 0.75,
                                borderRadius: "50%",
                                bgcolor: "white",
                                opacity: 0.8,
                            }}
                        >
                            <Icon icon={project[0].project_type_name} size="medium" />
                        </Box>
                    </div>
                </Grid>
                <Grid item sm={9} md={8}>
                    <Typography
                        component="h2"
                        variant="h6"
                        sx={{
                            my: {xs: 1, md: "none"},
                        }}
                    >
                        {project[0].name}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <ProjectSectionKey>Código:</ProjectSectionKey>
                            <ProjectSectionKey>Tipo:</ProjectSectionKey>
                            <ProjectSectionKey>Clase:</ProjectSectionKey>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1">
                                {project[0].code}
                            </Typography>
                            <Typography variant="subtitle1">
                                {project[0].project_type_name}
                            </Typography>
                            <Typography variant="subtitle1">
                                {project[0].project_class_name}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default ProjectSectionBasicInfo;
