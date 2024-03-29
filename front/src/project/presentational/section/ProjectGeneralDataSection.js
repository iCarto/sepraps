import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {DateUtil} from "base/format/utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import {ViewMilestoneTimeline} from "milestone/container";
import {ClosedProjectTag, ProjectTypeIcon} from "project/presentational";
import {ImagePreview} from "base/image/components";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
};

const ProjectGeneralDataSection = ({project, handleGeneratePDF = null}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const isProjectClosed = project?.closed;

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate(`generaldata/edit`);
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    return (
        <SectionCard
            secondaryActions={!isProjectClosed && secondaryActions}
            headingLabel={false}
        >
            <Grid
                container
                columnSpacing={2}
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
                        <Box sx={imgBoxStyle}>
                            <ProjectTypeIcon
                                projectType={project?.project_type}
                                projectTypeName={project?.project_type_label}
                                size="medium"
                            />
                        </Box>
                        {project?.closed && (
                            <ClosedProjectTag tagCustomStyle={closedProjectTagStyle} />
                        )}
                    </div>
                </Grid>
                <Grid item sm={9} md={8}>
                    <Typography variant="h4" color="grey.700" sx={{fontWeight: "bold"}}>
                        {project?.name}
                    </Typography>
                    <Typography
                        variant="h5"
                        color="grey.700"
                        sx={{fontWeight: "bold", mb: 3}}
                    >
                        {project?.location}
                    </Typography>
                    <SectionField label="Código" value={project?.code} />
                    <SectionField
                        label="Tipo de proyecto"
                        value={project?.project_type_label}
                    />
                    <SectionField
                        label="Clase de proyecto"
                        value={project?.project_class_label}
                    />
                    <SectionField label="Descripción" value={project?.description} />
                    <SectionField
                        label="Fecha de inicio"
                        value={DateUtil.formatDate(project?.init_date)}
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
