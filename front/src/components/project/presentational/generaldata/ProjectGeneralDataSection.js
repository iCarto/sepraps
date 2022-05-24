import {useNavigate, useOutletContext} from "react-router-dom";

import {DateUtil} from "utilities";
import {
    ProjectTypeIcon,
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import {ViewMilestoneTimeline} from "components/milestone/container";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

const imgBoxStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    display: {xs: "none", md: "flex"},
    m: 1.5,
    p: 0.75,
    borderRadius: "50%",
    bgcolor: "white",
    opacity: 0.8,
};

const closedProjectTagStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    display: {xs: "none", md: "flex"},
    m: 1.5,
    p: 0.75,
    borderRadius: "5%",
    bgcolor: "error.main",
    opacity: 0.8,
};

const ProjectGeneralDataSection = () => {
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    return (
        <SectionCard
            secondaryActions={[
                <SectionCardHeaderAction
                    key="edit"
                    name="edit"
                    text="Modificar"
                    icon={<EditIcon />}
                    onClick={() => {
                        navigate("edit");
                    }}
                />,
            ]}
        >
            <Grid container columnSpacing={2} sx={{marginTop: "-48px"}}>
                <Grid item sm={3} md={4}>
                    <div style={{position: "relative"}}>
                        <CardMedia
                            component="img"
                            image={project.featured_image}
                            alt={project.name}
                            sx={{
                                display: {xs: "none", sm: "block"},
                                borderRadius: 1,
                                opacity: project.closed === true ? 0.4 : 1,
                            }}
                        />
                        <Box sx={imgBoxStyle}>
                            <ProjectTypeIcon
                                projectType={project.project_type}
                                projectTypeName={project.project_type_name}
                                size="medium"
                            />
                        </Box>
                        {project.closed && (
                            <Box sx={closedProjectTagStyle}>
                                <Typography
                                    component="span"
                                    variant="button"
                                    sx={{fontWeight: 800, color: "#fff"}}
                                >
                                    Archivado
                                </Typography>
                            </Box>
                        )}
                    </div>
                </Grid>
                <Grid item sm={9} md={8}>
                    <Typography variant="h4" color="grey.700" sx={{fontWeight: "bold"}}>
                        {project.name}
                    </Typography>
                    <Typography
                        variant="h5"
                        color="grey.700"
                        sx={{fontWeight: "bold", mb: 3}}
                    >
                        {project.location}
                    </Typography>
                    <SectionField label="Código:" value={project.code} />
                    <SectionField
                        label="Tipo de proyecto:"
                        value={project.project_type_name}
                    />
                    <SectionField
                        label="Clase de proyecto:"
                        value={project.project_class_name}
                    />
                    <SectionField label="Descripción:" value={project.description} />
                    <SectionField
                        label="Fecha de inicio:"
                        value={DateUtil.formatDate(project.init_date)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ViewMilestoneTimeline />
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ProjectGeneralDataSection;
