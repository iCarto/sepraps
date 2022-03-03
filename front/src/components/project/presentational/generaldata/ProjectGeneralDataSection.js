import {useOutletContext} from "react-router-dom";

import {DateUtil} from "utilities";
import {Icon, SectionCard, SectionField} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProjectGeneralDataSection = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard>
            <Grid container columnSpacing={2}>
                <Grid item sm={3} md={4}>
                    <div style={{position: "relative"}}>
                        <CardMedia
                            component="img"
                            image={project.featured_image}
                            alt={project.name}
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
                            <Icon icon={project.project_type_name} size="medium" />
                        </Box>
                    </div>
                </Grid>
                <Grid item sm={9} md={8}>
                    <Typography variant="h4" color="grey.700" sx={{fontWeight: "bold"}}>
                        {project.name}
                    </Typography>
                    <Typography variant="h5" color="grey.700" mb={3}>
                        {project.code}
                    </Typography>
                    <SectionField
                        label="Tipo de proyecto:"
                        value={project.project_type_name}
                    />
                    <SectionField
                        label="Clase de proyecto:"
                        value={project.project_class_name}
                    />
                    <SectionField
                        label="Fecha de inicio:"
                        value={DateUtil.formatDate(project.init_date)}
                    />
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ProjectGeneralDataSection;
