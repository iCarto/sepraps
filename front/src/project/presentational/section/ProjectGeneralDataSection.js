import {useLocation, useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {DateUtil, NumberUtil} from "base/format/utilities";

import {
    SectionBox,
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import {ClosedProjectTag, ProjectTypeChip} from "project/presentational";
import {ImagePreview} from "base/image/components";
import {ProgressBarSmall} from "base/progress/components";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

const closedProjectTagStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    display: {xs: "none", md: "flex"},
    m: 1.5,
    p: 0.75,
};

const ProjectGeneralDataSection = ({project}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();
    const location = useLocation();
    const basePath = location.pathname.split("/summary")[0];

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

    const handleClickOnProgressBox = second => {
        navigate(`${basePath}/buildingcomponents/overview`);
    };

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
                        label="Tipo y clase"
                        value={project?.project_works.map((project_work, index) => (
                            <ProjectTypeChip
                                projectTypeData={project_work}
                                index={index}
                            />
                        ))}
                    />
                    <SectionField label="Descripción" value={project?.description} />
                    <SectionField
                        label="Fecha de inicio"
                        value={DateUtil.formatDate(project?.init_date)}
                    />
                    <SectionBox label="Avance">
                        <Box
                            sx={{
                                border: 1,
                                borderRadius: 1,
                                borderStyle: "solid",
                                borderColor: "grey.300",
                                backgroundColor: "grey.100",
                                p: 2,
                                pt: 1,
                            }}
                            onClick={handleClickOnProgressBox}
                        >
                            <ProgressBarSmall
                                label="Financiero"
                                progressValue={NumberUtil.formatDecimalWithoutZeros(
                                    project.financial_progress_percentage
                                )}
                                progressStyle={{mb: 1}}
                            />
                            <ProgressBarSmall
                                label="Físico"
                                progressValue={NumberUtil.formatDecimalWithoutZeros(
                                    project.physical_progress_percentage
                                )}
                            />
                        </Box>
                    </SectionBox>
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ProjectGeneralDataSection;
