import {useOutletContext} from "react-router-dom";

import {Icon, SectionCard, SectionField} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

const ProjectGeneralDataSection = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Datos generales">
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
                            <Icon icon={project.project_type} size="medium" />
                        </Box>
                    </div>
                </Grid>
                <Grid item sm={9} md={8}>
                    <SectionField label="Nombre:" value={project.name} />
                    <SectionField label="Código:" value={project.code} />
                    <SectionField label="Tipo:" value={project.project_type_name} />
                    <SectionField label="Clase:" value={project.project_class_name} />
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ProjectGeneralDataSection;
